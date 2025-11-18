// app/api/cart/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/lib/auth';

const prisma = new PrismaClient();

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    console.log('Authenticated user:', user);
    const { productId, quantity } = await request.json();
    console.log('Request body:', { productId, quantity });
    
    if (!productId || quantity === undefined) {
      return NextResponse.json({
        error: 'Product ID and quantity value are required'
      }, { status: 400 });
    }

    // Find the cart item by productId and userId using findFirst
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.userId,
        productId: parseInt(productId)
      }
    });

    console.log('Existing cart item:', existingCartItem);

    if (existingCartItem) {
      // If exists, update quantity
      const updatedItem = await prisma.cartItem.update({
        where: {
          cartItemId: existingCartItem.cartItemId
        },
        data: {
          quantity: existingCartItem.quantity + parseInt(quantity)
        },
        include: {
          product: true,
          user: {
            select: {
              userId: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      return NextResponse.json({
        message: 'Cart item updated successfully',
        cartItem: updatedItem
      }, { status: 200 });
    } else {
      // If not exists, create new item
      const newItem = await prisma.cartItem.create({
        data: {
          userId: user.userId,
          productId: parseInt(productId),
          quantity: parseInt(quantity)
        },
        include: {
          product: true,
          user: {
            select: {
              userId: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      return NextResponse.json({
        message: 'Item added to cart successfully',
        cartItem: newItem
      }, { status: 201 });
    }

  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong updating cart item quantity',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update cart item quantity
export async function PUT(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    const productId = parseInt(params.productId);
    const { quantity } = await request.json();

    // Find the cart item first
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        userId: user.userId
      }
    });
    
    if (!existingCartItem) {
      return NextResponse.json({
        error: 'Cart item not found'
      }, { status: 404 });
    }
    
    // If quantity is less than 1, remove the item
    if (!quantity || quantity < 1) {
      await prisma.cartItem.delete({
        where: {
          cartItemId: existingCartItem.cartItemId
        }
      });
      
      return NextResponse.json({
        message: 'Item removed from cart as quantity is less than 1',
        removed: true
      }, { status: 200 });
    }

    // Update using the cartItemId, not productId
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        cartItemId: existingCartItem.cartItemId
      },
      data: {
        quantity
      },
      include: {
        product: true,
        user: {
          select: {
            userId: true,
            name: true,
            email: true
          }
        }
      }
    });

    console.log('Updated cart item:', updatedCartItem);

    return NextResponse.json({
      message: 'Cart item updated successfully',
      cartItem: updatedCartItem
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong updating cart item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    const productId = parseInt(params.productId);

    // Find the cart item first
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        userId: user.userId
      }
    });

    if (!existingCartItem) {
      return NextResponse.json({
        error: 'Cart item not found'
      }, { status: 404 });
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: {
        cartItemId: existingCartItem.cartItemId
      }
    });

    return NextResponse.json({
      message: 'Cart item removed successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong removing cart item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}