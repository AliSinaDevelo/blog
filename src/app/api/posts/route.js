import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/posts - Get all posts with optional filtering
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const author = searchParams.get('author');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const skip = (page - 1) * pageSize;

  try {
    // Build query filters
    const where = {
      published: true, // Only return published posts
      ...(tag && { tags: { has: tag } }),
      ...(author && { authorId: author }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      }),
    };

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit || pageSize,
      skip: limit ? 0 : skip,
    });

    // Get total count for pagination
    const totalPosts = await prisma.post.count({ where });
    const totalPages = Math.ceil(totalPosts / pageSize);

    return NextResponse.json({
      posts: posts.map(post => ({
        ...post,
        comments: post._count.comments,
        _count: undefined,
      })),
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post (authenticated users only)
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Check authentication
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, content, coverImage, slug, tags, published } = body;

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        coverImage,
        slug,
        tags: tags || [],
        published: published !== undefined ? published : false,
        author: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 