import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { user_id, product_id } = await req.json();

    await prisma.reviews.delete({
      where: {
        user_id_product_id: {
          user_id,
          product_id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir review:", error);
    return NextResponse.json(
      { error: "Erro ao excluir review" },
      { status: 500 }
    );
  }
}
