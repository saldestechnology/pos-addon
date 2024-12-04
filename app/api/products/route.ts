import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        modifications: {
          include: { options: true },
        },
        addonGroups: {
          include: { addons: true },
        },
      },
    });

    return NextResponse.json({ data: products });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Detailed error:", error);
    } else {
      return NextResponse.json({
        error: "Failed to fetch products",
      });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, basePrice, categoryId } = await req.json();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice,
        categoryId,
      },
    });

    return NextResponse.json({ data: product });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Detailed error:", error);
    } else {
      return NextResponse.json({
        error: "Failed to create product",
      });
    }
  }
}
