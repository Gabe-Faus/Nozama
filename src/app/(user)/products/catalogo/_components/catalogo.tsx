
"use client";
import React, {useState} from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

// Tipagem baseada na função getProductsForCatalog()
interface ProductItem {
  id: number;
  name: string;
  evaluation_avg: number | null;
  photo: string;
  category: {name: string;};
  isFavorite?: boolean;
}

interface ProductListProps {
  products: ProductItem[];
  userId?: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, userId }) => {

  const [favorites, setFavorites] = useState<number[]>(
    products.filter(p => p.isFavorite).map(p => p.id)
  );

  const toggleFavorite = async (productId: number) => {
    
    const isCurrentlyFavorite = favorites.includes(productId);
    try {
      //Remove dos favoritos
      if (isCurrentlyFavorite) {
        await fetch(`/api/favorites/${productId}`, { method: 'DELETE' });
        setFavorites(favorites.filter(id => id !== productId));

      // Adiciona nos favoritos  
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, userId }),
        });
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };


  return (
    <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="font-amazon text-3xl font-bold mb-8">
        Catálogo de Produtos
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white w-full shadow-2xl rounded-xl flex flex-col p-4 transition-transform transform hover:scale-105 hover:bg-white cursor-pointer"
            >
              <div className="relative w-full h-48 mb-4 **overflow-hidden**">
                {/* Imagem clicável que leva aos detalhes */}
                <Link href={`/products/${product.id}`} className="block w-full h-full">
                  <img
                    src={`/images_products/${product.photo}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Botão de Favorito */}
                 <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:shadow-lg z-10"
                >
                  <Heart 
                    className={
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }
                    size={20}
                  />
                </button>
              </div>

              <div className="flex flex-col **flex-grow** w-full">

                {/* Nome do produto */}
                <Link href={`/products/${product.id}`}>
                  <h2 className="font-semibold text-lg font-amazon line-clamp-2">
                    {product.name}
                  </h2>
                </Link>

                {/* Nome da categoria */}
                <p className="text-sm text-gray-600 font-amazon mt-1">
                  {product.category.name}
                </p>

                {/* icone de avaliação */}
                <div className="mt-3 flex items-center gap-2 **mt-auto**">
                  <span className="text-yellow-500 text-sm font-semibold font-amazon">
                    ★ {product.evaluation_avg?.toFixed(1) ?? 'N/A'}
                  </span>
                </div>
              </div>
            </div>  
          ))
        ) : (
          <p className="text-gray-700 font-amazon text-lg">
            Nenhum produto encontrado no momento.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductList;