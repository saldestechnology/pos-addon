import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
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