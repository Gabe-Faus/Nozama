
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userIdFixo = 1;  //user fixo para testes

//  Listagem de Cards (para catalogo)
export async function getProductsForCatalog() {
    // Busca os dados necessários para exibir um card no catálogo
    try {
        //const numericUserId = userId ? parseInt(userId) : undefined;
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
                //favoritos: numericUserId ? {
                    //where: {
                     //user_id: numericUserId, // Agora é number
                    //},
                //} : false,
            },
            // Ordena por avaliação média
            orderBy: {
                evaluation_avg: 'desc', 
            }
        });

        // Busca favoritos REAIS do usuário fixo
        const favorites = await prisma.favoritos.findMany({
        where: {
            user_id: userIdFixo,
        },
        select: {
            product_id: true,
        },
        });
        //return products;

        const favoriteIds = new Set(favorites.map(fav => fav.product_id));
        return products.map(product => ({
        ...product,
        isFavorite: favoriteIds.has(product.id),
        }));
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
                        user_id: userIdFixo,
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