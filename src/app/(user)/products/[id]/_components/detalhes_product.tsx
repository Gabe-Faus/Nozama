"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ArrowLeft } from 'lucide-react';

// Tipagem
interface ReviewAttribute {
  attribute: { name: string };
  value: string;
}

interface Review {
  user: { email: string };
  evaluation: number;
  comment: string | null;
  attributes: ReviewAttribute[];
}

interface ProductDetailsProps {
  id: number;
  name: string;
  description: string | null;
  evaluation_avg: number;
  photo: string;
  category: { name: string };
  reviews: Review[];
  isFavorite?: boolean;
  userId?: number;
}

const ProductDetailsDisplay: React.FC<ProductDetailsProps> = (product) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remover dos favoritos - método HTTP correto é DELETE
        const response = await fetch(`/api/favorites/${product.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Adicionar aos favoritos - método HTTP correto é POST
        const response = await fetch('/api/favorites', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.id }),
        });
        
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 font-amazon">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link 
            href="/products/catalogo"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao Catálogo
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Coluna da Esquerda - Imagem e Info */}
          <div className="lg:w-1/2">
            {/* Imagem do Produto */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="relative">
                <img
                  src={`/images_products/${product.photo}`}
                  alt={product.name}
                  className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images_products/placeholder.png';
                  }}
                />
                <button
                  onClick={toggleFavorite}
                  disabled={isLoading}
                  className={`absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  {isLoading ? (
                    <div className="w-7 h-7 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart 
                      size={28} 
                      className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500 transition-colors'}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {product.category.name}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                {renderStars(product.evaluation_avg)}
                <span className="text-gray-600">({product.reviews.length} avaliações)</span>
              </div>

              <div className="prose max-w-none text-gray-700 mb-6">
                <p className="text-lg leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Avaliações */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                Avaliações dos Clientes ({product.reviews.length})
              </h2>
              
              {product.reviews.length > 0 ? (
                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      {/* Header da Review */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">{review.user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.evaluation)}
                          </div>
                        </div>
                      </div>

                      {/* Comentário */}
                      <p className="text-gray-700 mb-4">
                        {review.comment || 'Sem comentário.'}
                      </p>

                      {/* Atributos da Review */}
                      {review.attributes.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
                          <p className="font-medium text-gray-800 mb-2 text-sm">
                            📋 Detalhes da Compra:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {review.attributes.map((attr, attrIndex) => (
                              <div key={attrIndex} className="text-sm">
                                <span className="text-gray-600">{attr.attribute.name}:</span>
                                <span className="font-medium ml-2">{attr.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-gray-400 mb-4">📝</div>
                  <p className="text-gray-600">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                    Escrever uma avaliação
                  </button>
                </div>
              )}

              {/* Botão para adicionar review */}
              <div className="mt-8 pt-6 border-t">
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                  + Adicionar Minha Avaliação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsDisplay;