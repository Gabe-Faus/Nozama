import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
//import { auth } from '@/server/auth';

const prisma = new PrismaClient();
const UserIdFixo = 1;

// Remover favorito
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    //const session = await auth();
    //if (!session?.user?.id) {
      //return NextResponse.json(
        //{ error: 'Não autorizado' },
      //);
    //}

     // Converte string para number
    const userId = UserIdFixo;
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
      );
    }

    const productId = parseInt(params.productId);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID do produto inválido' },
      );
    }

    // Verificar se é favorito
    const existingFavorite = await prisma.favoritos.findUnique({
      where: {
        user_id_product_id: {
          user_id: UserIdFixo,
          product_id: productId,
        },
      },
    });

    if (!existingFavorite) {
      return NextResponse.json(
        { message: 'Produto não está nos favoritos' },
      );
    }

    // Remover dos favoritos
    await prisma.favoritos.delete({
      where: {
        user_id_product_id: {
          user_id: UserIdFixo,
          product_id: productId,
        },
      },
    });

    return NextResponse.json(
      { message: 'Produto removido dos favoritos' },
    );
    
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
    );
  }
}

// Verificar se produto é favorito
export async function getIsFavorito(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    //const session = await auth();
    //if (!session?.user?.id) {
      //return NextResponse.json(
        //{ error: 'Não autorizado' },
      //);
    //}

    const userId = UserIdFixo;
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
      );
    }

    const productId = parseInt(params.productId);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID do produto inválido' },
      );
    }

    const favorite = await prisma.favoritos.findUnique({
      where: {
        user_id_product_id: {
          user_id: UserIdFixo,
          product_id: productId,
        },
      },
    });

    return NextResponse.json({ isFavorite: !!favorite });
    
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
    );
  }
}