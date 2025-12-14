"use client"

{/* Footer Gabriel Pessoa Faustibo - 231006121 */}

import { Heart } from "lucide-react";

import type React from "react";

interface FavoriteItem {
  product: {
    id: number;
    name: string;
    description: string;
    evaluation_avg: number;
    photo: string;
  };
}

interface FavoritesProps {
  favoritos?: FavoriteItem[]; // <-- deixado como opcional
}

const Favorites: React.FC<FavoritesProps> = ({ favoritos = [] }) => {  // <-- valor padrão
  return (
    <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">
        <h1 className="font-amazon text-3xl font-bold mb-8">
            Your Favorites
        </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">

        {favoritos.length > 0 ? (
          favoritos.map((item) => (
            <div
              key={item.product.id}
              className="bg-white shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition font-amazon"
            >
              <div className="relative w-full h-48 mb-4">
                <img
                  src={item.product.photo}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />

                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                  <Heart className="text-red-500 fill-red-500" size={20} />
                </button>
              </div>

              <h2 className="font-semibold text-lg font-amazon line-clamp-2">
                {item.product.name}
              </h2>

              <p className="text-sm text-gray-600 font-amazon mt-1 line-clamp-2">
                {item.product.description}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-yellow-500 text-sm font-semibold font-amazon">
                  ★ {item.product.evaluation_avg}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blak  font-amazon text-lg">You don't have any favorite products yet.</p>
        )}

      </div>

    </section>
  );
};

export default Favorites;

