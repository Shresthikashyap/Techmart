import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        "User does not exist",
        { status: 404 }
      );
    }

    // Check password
    if (!user.password) {
      return NextResponse.json(
        "User not authorized",
        { status: 400 }
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        "User not authorized",
        { status: 400 }
      );
    }

    // Generate JWT token
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const accessToken = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);

    return NextResponse.json(
      {
        message: "Successfully logged in",
        token: accessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      {
        error: "Something went wrong logging in",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}