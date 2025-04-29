import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  // Check authentication
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized to delete the comment
    if (comment.authorId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete this comment' },
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
} 