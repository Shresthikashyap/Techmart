// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - Fetch user's cart
export async function GET(request: NextRequest) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true,
      },
    });

    const totalItems = wishlistItems.length;
    return NextResponse.json({
      wishlistItems,
      totalItems
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong fetching wishlist',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Clear entire cart
export async function DELETE(request: NextRequest) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        userId: user.userId
      }
    });

    return NextResponse.json({
      message: 'Wishlist cleared successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error clearing wishlist:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong clearing wishlist',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}