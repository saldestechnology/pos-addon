import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> },
) {
  try {
    const query = (await params).query;
    
    if (!query) {
      return NextResponse.json([], { status: 400 });
    }

    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    if (!product) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error searching for product:", error);
    return NextResponse.json(
      { error: "Failed to search for product" },
      { status: 500 },
    );
  }
}
