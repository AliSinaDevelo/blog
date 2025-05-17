import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// In-memory store for mock users when database is unavailable
let mockUsers = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json(
        {
          user: userWithoutPassword,
          message: "Registration successful",
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      
      // Check if email exists in mock users
      const existingMockUser = mockUsers.find(user => user.email === email);
      if (existingMockUser) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }
      
      // Create a mock user if database is unavailable
      const hashedPassword = await bcrypt.hash(password, 10);
      const mockUser = {
        id: `mock-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockUsers.push(mockUser);
      
      // Return success
      const { password: _, ...userWithoutPassword } = mockUser;
      return NextResponse.json(
        {
          user: userWithoutPassword,
          message: "Registration successful (Mock Mode)",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 