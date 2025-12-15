
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  Listagem de Cards (para catalogo)
export async function getProductsForCatalog(id: number, userId?: string) {
    // Busca os dados necessários para exibir um card no catálogo
    try {
        const numericUserId = userId ? parseInt(userId) : undefined;

        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                evaluation_avg: true,
                photo: true,
                category: { // Inclui o nome da categoria para exibição
                    select: {
                        name: true,
                    }
                },

                // Verifica se está nos favoritos
                favoritos: numericUserId ? {
                    where: {
                     user_id: numericUserId, // Agora é number
                    },
                } : false,
            },
            // Ordena por avaliação média
            orderBy: {
                evaluation_avg: 'desc', 
            }
        });

        return products;

    } catch (error) {
        console.error("Erro ao buscar catálogo de produtos:", error);
        throw new Error("Falha na busca de produtos para o catálogo.");
    }
}

// Página Completa (para [id])
export async function getProductDetails(id_product: number, userId?: string) {  //userId?: string
    // Busca o produto e suas relações (Reviews, Atributos)
    try {
        const numericUserId = userId ? parseInt(userId) : undefined

        const productDetails = await prisma.product.findUnique({
            where: {
                id: id_product,
            },
            include: {
                category: {    // Inclui a categoria e os atributos definidos para ela
                    select: {
                        name: true,
                        attributes: true,
                    }
                },
                reviews: {      // Inclui todas as reviews
                    include: {
                        user: {   // Dados do usuário que fez a review
                            select: {
                                email: true,
                            }
                        },
                        attributes: {    // Os valores dos atributos fornecidos na review
                            include: {
                                attribute: true, // Detalhes do atributo (name, type)
                            }
                        }
                    }
                },
                // Verifica se está nos favoritos
                favoritos: numericUserId ? {
                    where: {
                        user_id: numericUserId,
                    },
                } : false, 
            },
        });

        return productDetails;
        
    } catch (error) {
        console.error(`Erro ao buscar detalhes do produto ${id_product}:`, error);
        throw new Error("Falha ao carregar os detalhes do produto.");
    }
}

