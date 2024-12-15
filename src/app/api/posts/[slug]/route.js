import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get a single post by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            bio: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update a post
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, tags, coverImage, published } = body;

    // Get the post to check ownership
    const existingPost = await prisma.post.findUnique({
      where: {
        slug,
      },
      select: {
        authorId: true,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user is the author or an admin
    if (existingPost.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Not authorized to update this post" },
        { status: 403 }
      );
    }

    // Update the post
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        title,
        content,
        tags,
        coverImage,
        published,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a post
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the post to check ownership
    const existingPost = await prisma.post.findUnique({
      where: {
        slug,
      },
      select: {
        authorId: true,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user is the author or an admin
    if (existingPost.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Not authorized to delete this post" },
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: {
        slug,
      },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 