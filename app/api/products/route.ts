import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
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
    
    return NextResponse.json({ data: products });
  // TODO: I am fine with this error handling for now, but we should improve it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
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