import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
//import { auth } from '@/server/auth';

const prisma = new PrismaClient();
const userIdFixo = 1;

// Buscar favoritos do usuário
export async function getFavoritos(request: NextRequest) {
  try {
    //const session = await auth();
    
    //if (!session?.user?.id) {
      //return NextResponse.json(
        //{ error: 'Não autorizado' },
      //);
    //}

    // Converte string para number
    const userId = userIdFixo;
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
      );
    }

    const favoritos = await prisma.favoritos.findMany({
      where: {
        user_id: userIdFixo,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(favoritos);
    
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
    );
  }
}

// Adicionar favorito
export async function POST(request: NextRequest) {
  try {
    //const session = await auth();
    //if (!session?.user?.id) {
      //return NextResponse.json(
        //{ error: 'Não autorizado' },
      //);
   // }

    // converte de string para number
    const userId = userIdFixo;
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
      );
    }

    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório' },
      );
    }

    // Verificar se já é favorito
    const existingFavorite = await prisma.favoritos.findUnique({
      where: {
        user_id_product_id: {
          user_id: userIdFixo,
          product_id: productId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: 'Produto já está nos favoritos' },
      );
    }

    // Adicionar aos favoritos
    const favorito = await prisma.favoritos.create({
      data: {
        user_id: userIdFixo,
        product_id: productId,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(
      { message: 'Produto adicionado aos favoritos', favorito },
    );
    
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
    );
  }
}
