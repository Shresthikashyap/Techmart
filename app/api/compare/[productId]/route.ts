// app/api/compare/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/lib/auth';

const prisma = new PrismaClient();

// POST - Add item to compare
export async function POST(
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

    console.log('Authenticated user:', user);
    
    // Get productId from URL params, not request body
    const productId = parseInt(params.productId);
    console.log('Product ID from params:', productId);

    if (!productId || isNaN(productId)) {
      return NextResponse.json({
        error: 'Valid Product ID is required'
      }, { status: 400 });
    }

    // Find the compareitem by productId and userId using findFirst
    const existingcompareItem = await prisma.compareItem.findFirst({
      where: {
        userId: user.userId,
        productId: productId
      },
      include: {
        product: true
      }
    });

    console.log('Existing compareitem:', existingcompareItem);

    if (existingcompareItem) {
      return NextResponse.json({
        message: 'Item is already in compare',
        name: existingcompareItem.product?.name || 'Item',
        status: 200
      }, { status: 200 });
    } else {
      // If not exists, create new item
      const newItem = await prisma.compareItem.create({
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
        message: 'Item added to compare successfully',
        compareItem: newItem,
        name: newItem.product?.name || 'Item'
      }, { status: 201 });
    }
   
  } catch (error) {
    console.error('Error updating compare item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong updating compare item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Remove item from compare
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

    if (!productId || isNaN(productId)) {
      return NextResponse.json({
        error: 'Valid Product ID is required'
      }, { status: 400 });
    }

    // Find the compare item first
    const existingcompareItem = await prisma.compareItem.findFirst({
      where: {
        productId,
        userId: user.userId
      }
    });

    if (!existingcompareItem) {
      return NextResponse.json({
        error: 'compare item not found'
      }, { status: 404 });
    }

    console.log('Existing compare item to delete:', existingcompareItem);
    // Delete the compare item
    await prisma.compareItem.delete({
      where: {
        compareItemId: existingcompareItem.compareItemId
      }
    });

    return NextResponse.json({
      message: 'compare item removed successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error removing compare item:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong removing compare item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}