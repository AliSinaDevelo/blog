import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    try {
      // Store the contact message in the database if connected
      const contactMessage = await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject,
          message,
        },
      });
      
      // TODO: Send email notification (in a real implementation)

      return NextResponse.json(
        { message: 'Contact message sent successfully', id: contactMessage.id },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Fallback for when database is unavailable - just log the message
      console.log('Contact message received (DB unavailable):', {
        name,
        email,
        subject,
        message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json(
        { message: 'Contact message received (offline mode)' },
        { status: 202 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 