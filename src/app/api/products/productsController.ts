
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  Listagem de Cards (para catalogo)
export async function getProductsForCatalog() {
    // Busca os dados necessários para exibir um card no catálogo
    try {
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
                }
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
export async function getProductDetails(id_product: number) {
    // Busca o produto e suas relações (Reviews, Atributos)
    try {
        const productDetails = await prisma.product.findUnique({
            where: {
                id: id_product,
            },
            include: {
                // Inclui a categoria e os atributos definidos para ela
                category: { 
                    select: {
                        name: true,
                        attributes: true,
                    }
                },
                // Inclui todas as reviews
                reviews: {
                    include: {
                        user: { // Dados do usuário que fez a review
                            select: {
                                email: true,
                            }
                        },
                        // Os valores dos atributos fornecidos na review
                        attributes: { 
                            include: {
                                attribute: true, // Detalhes do atributo (name, type)
                            }
                        }
                    }
                },
                // Verifica se está nos favoritos
                favoritos: true, 
            }
        });
        return productDetails;
    } catch (error) {
        console.error(`Erro ao buscar detalhes do produto ${id_product}:`, error);
        throw new Error("Falha ao carregar os detalhes do produto.");
    }
}