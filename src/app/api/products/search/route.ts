import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    const products = await prisma.product.findMany({
        where: query
            ? {
                OR: [
                {
                    name: {
                    contains: query,
                    },
                },
                {
                    category: {
                    is: {
                        name: {
                        contains: query,
                        },
                    },
                    },
                },
                ],
            }
            : undefined,
        select: {
            id: true,
            name: true,
            photo: true,
            category: {
            select: {
                name: true,
            },
            },
        },
        orderBy: {
            name: "asc",
        },
        });

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Erro na search:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
