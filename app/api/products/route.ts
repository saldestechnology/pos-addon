import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true,
        modifications: {
          include: {
            options: true,
          },
        },
        addonGroups: {
          include: {
            addonGroup: {
              include: {
                addons: true,
              },
            },
          },
        },
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
      },
      include: {
        category: true,
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}