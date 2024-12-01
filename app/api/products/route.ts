import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      }
    });
    
    return NextResponse.json({ data: products });
  } catch (error: any) { // Type assertion here
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch/create products', 
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        basePrice: body.basePrice,
        description: body.description,
        categoryId: body.categoryId,
        imageUrl: body.imageUrl,
      },
      include: {
        category: true,
      },
    });
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}