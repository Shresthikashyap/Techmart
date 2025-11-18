import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {

    // const user = await authenticate(request);
    // console.log(user);
    // if(!user){
    //   return NextResponse.json({
    //     error: 'user not authenticated'
    //   },{ status: 401 })
    // }
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    });

    //console.log(categories);

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong fetching categories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// If you want to fetch products by category, you can also handle query parameters
export async function POST(request: NextRequest) {
  try {
    const { categoryId } = await request.json();

    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
      include: {
        category: true,
      }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching categorized products:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong fetching products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}