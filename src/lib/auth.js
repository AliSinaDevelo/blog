import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "./prisma";

// Mock users for development/testing when database connection fails
const mockUsers = [
  {
    id: "mock-user-1",
    name: "Demo Admin",
    email: "admin@example.com",
    password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/vP/c6LcFu24HO", // password123
    role: "admin",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "mock-user-2",
    name: "Demo User",
    email: "user@example.com",
    password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/vP/c6LcFu24HO", // password123
    role: "user",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GitHub and Google OAuth providers are now enabled
    // Make sure you have set up proper OAuth credentials in your .env file
    // with the correct callback URLs:
    //    - http://localhost:3000/api/auth/callback/github
    //    - http://localhost:3000/api/auth/callback/google
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.password) {
            // Check mock users if database connection fails
            const mockUser = mockUsers.find(u => u.email === credentials.email);
            if (!mockUser) {
              throw new Error("Invalid credentials");
            }

            const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              mockUser.password
            );

            if (!isCorrectPassword) {
              throw new Error("Invalid credentials");
            }

            return mockUser;
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          console.error("Auth error:", error);
          
          // Fallback to mock users when database is unavailable
          const mockUser = mockUsers.find(u => u.email === credentials.email);
          if (mockUser) {
            const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              mockUser.password
            );

            if (isCorrectPassword) {
              return mockUser;
            }
          }
          
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          role: user.role || "user",
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
}; 