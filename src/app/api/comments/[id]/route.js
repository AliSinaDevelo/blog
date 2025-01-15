import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Delete a comment
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the comment to check ownership
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
        postId: true,
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    // Check if user is the comment author, post author, or an admin
    const isCommentAuthor = comment.authorId === session.user.id;
    const isPostAuthor = comment.post.authorId === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isCommentAuthor && !isPostAuthor && !isAdmin) {
      return NextResponse.json(
        { message: "Not authorized to delete this comment" },
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 