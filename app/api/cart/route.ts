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

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true,
      },
    });

    // Calculate total price and items
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return NextResponse.json({
      cartItems,
      totalPrice,
      totalItems
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong fetching cart',
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

    await prisma.cartItem.deleteMany({
      where: {
        userId: user.userId
      }
    });

    return NextResponse.json({
      message: 'Cart cleared successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong clearing cart',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}