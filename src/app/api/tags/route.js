import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/tags - Get all unique tags from posts
export async function GET() {
  try {
    // Find all published posts
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { tags: true },
    });

    // Extract and deduplicate tags
    const allTags = Array.from(
      new Set(posts.flatMap(post => post.tags))
    ).sort();

    return NextResponse.json({ tags: allTags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
} 