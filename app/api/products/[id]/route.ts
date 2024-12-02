import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProductWithAddons } from '@/components/types/product';

type Params = Promise<{ id: string }>

export async function GET(
  request: Request,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const product: ProductWithAddons | null = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        modifications: {
          include: { options: true }
        },
        addonGroups: {
          include: { addons: true }
        },
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
