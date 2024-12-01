import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(
  { params }: { params: { query: string } }
) {
  try {
    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: params.query,
        },
      },
    });

    if (!product) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error searching for product:', error);
    return NextResponse.json(
      { error: 'Failed to search for product' },
      { status: 500 }
    );
  }
}
