import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString() || null;
    const category_id = Number(formData.get("category_id"));
    const file = formData.get("photo") as File | null;

    // 🔒 Validações básicas
    if (!name || !category_id || !file) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos" },
        { status: 400 }
      );
    }

    // 🔒 Garante que a pasta existe
    const uploadDir = path.join(
      process.cwd(),
      "public/images_products"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    // 📸 Salvar imagem
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    // 📦 Criar produto
    const product = await prisma.product.create({
      data: {
        name,
        description,
        photo: filename,
        category_id,
        evaluation_avg: 0, // default inicial
      },
    });

    return NextResponse.json({ success: true, product });

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
