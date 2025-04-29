import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get a single post by slug
export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // Find the post by slug
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// Update a post
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  const { slug } = params;

  // Check authentication
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    // Check if the post exists and user is the author or admin
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true, authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized to edit the post
    if (post.authorId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to update this post' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, coverImage, tags, published, newSlug } = body;

    // Check slug uniqueness if changing it
    if (newSlug && newSlug !== slug) {
      const existingPostWithSlug = await prisma.post.findUnique({
        where: { slug: newSlug },
      });

      if (existingPostWithSlug) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(coverImage && { coverImage }),
        ...(tags && { tags }),
        ...(published !== undefined && { published }),
        ...(newSlug && { slug: newSlug }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// Delete a post
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const { slug } = params;

  // Check authentication
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    // Check if the post exists and user is the author or admin
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true, authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized to delete the post
    if (post.authorId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete this post' },
        { status: 403 }
      );
    }

    // Delete the post and its comments (cascade delete will handle comments)
    await prisma.post.delete({
      where: { id: post.id },
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
} 