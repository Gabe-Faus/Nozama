import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetailsDisplay from './_components/detalhes_product';
import { getProductDetails } from '../../../api/products/productsController';



// Interface para os params
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  try {
    // params é uma Promise
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Validação do ID
    const productId = parseInt(id);
    if (isNaN(productId)) {
      notFound();
    }

    // Buscar dados do produto através da função
    const product = await getProductDetails(productId);
    
    if (!product) {
      notFound();
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      evaluation_avg: product.evaluation_avg || 0,
      photo: product.photo,
      category: product.category,
      reviews: product.reviews?.map(review => ({
        user: review.user,
        evaluation: review.evaluation,
        comment: review.comment,
        attributes: review.attributes?.map(attr => ({
          attribute: {
            name: attr.attribute?.name || 'Atributo'
          },
          value: attr.value
        })) || [] // array vazio se não houver atributos
      })) || [] // array vazio se não houver reviews
    };

    // Renderizar componente de detalhes
    return <ProductDetailsDisplay {...formattedProduct} />;
    
  } catch (error) {
    console.error('Erro ao carregar detalhes do produto:', error);
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">
          Erro ao carregar o produto. Tente novamente.
        </h1>
      </main>
    );
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const productId = parseInt(id);
  
  const product = await getProductDetails(productId);


  return {
    title: `Produto ${product?.name} | Amazonia`,
    description: 'Detalhes do produto',
  };
}