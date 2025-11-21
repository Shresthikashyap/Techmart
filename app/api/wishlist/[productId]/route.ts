// app/api/wishlist/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/lib/auth';

const prisma = new PrismaClient();

// POST - Add item to wishlist
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    console.log('Authenticated user:', user);
    
    // Await params and get productId from URL params
    const { productId: productIdStr } = await params;
    const productId = parseInt(productIdStr);
    console.log('Product ID from params:', productId);

    if (!productId || isNaN(productId)) {
      return NextResponse.json({
        error: 'Valid Product ID is required'
      }, { status: 400 });
    }

    // Find the wishlist item by productId and userId using findFirst
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        userId: user.userId,
        productId: productId
      },
      include: {
        product: true
      }
    });

    console.log('Existing wishlist item:', existingWishlistItem);

    if (existingWishlistItem) {
      return NextResponse.json({
        message: 'Item is already in wishlist',
        name: existingWishlistItem.product?.name || 'Item',
        status: 200
      }, { status: 200 });
    } else {
      // If not exists, create new item
      const newItem = await prisma.wishlistItem.create({
        data: {
          userId: user.userId,
          productId: productId,
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
        message: 'Item added to wishlist successfully',
        wishlistItem: newItem,
        name: newItem.product?.name || 'Item'
      }, { status: 201 });
    }
   
  } catch (error) {
    console.error('Error updating wishlist item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong updating wishlist item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Remove item from wishlist
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({
        error: 'User not authenticated'
      }, { status: 401 });
    }

    const { productId: productIdStr } = await params;
    const productId = parseInt(productIdStr);

    if (!productId || isNaN(productId)) {
      return NextResponse.json({
        error: 'Valid Product ID is required'
      }, { status: 400 });
    }

    // Find the wishlist item first
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        productId,
        userId: user.userId
      }
    });

    if (!existingWishlistItem) {
      return NextResponse.json({
        error: 'Wishlist item not found'
      }, { status: 404 });
    }

    console.log('Existing wishlist item to delete:', existingWishlistItem);
    // Delete the wishlist item
    await prisma.wishlistItem.delete({
      where: {
        wishlistItemId: existingWishlistItem.wishlistItemId
      }
    });

    return NextResponse.json({
      message: 'Wishlist item removed successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error removing wishlist item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong removing wishlist item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}