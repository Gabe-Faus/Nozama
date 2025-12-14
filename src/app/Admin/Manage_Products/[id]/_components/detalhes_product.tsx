"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, ArrowLeft, ShoppingCart, Trash } from "lucide-react";

/* ===================== TIPAGENS ===================== */

interface ReviewAttribute {
  attribute: { name: string };
  value: string;
}

interface Review {
  user_id: number;
  product_id: number;
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
  isAdmin?: boolean;
}

/* ===================== COMPONENTE ===================== */

const ProductDetailsDisplay: React.FC<ProductDetailsProps> = (product) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // ADMIN – edição do produto
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedDescription, setEditedDescription] = useState(
    product.description || ""
  );

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
      <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
    </div>
  );

  /* ===================== API ===================== */

  const saveProduct = async () => {
    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editedName,
        description: editedDescription,
      }),
    });

    window.location.reload();
  };

  const deleteReview = async (user_id: number, product_id: number) => {
    if (!confirm("Excluir esta avaliação?")) return;

    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, product_id }),
    });

    window.location.reload();
  };

  /* ===================== RENDER ===================== */

  return (
    <main className="min-h-screen bg-gray-50 font-amazon">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/Admin/Manage_Products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar à Administração
          </Link>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8">
          Controle Administrativo
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ESQUERDA */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
              <img
                src={`/images_products/${product.photo}`}
                alt={product.name}
                className="w-full max-h-[500px] object-contain rounded-lg"
              />

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg cursor-pointer"
              >
                <Heart
                  size={28}
                  className={
                    isFavorite
                      ? "fill-red-500 text-red-500 "
                      : "text-gray-400"
                  }
                />
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
                {product.category.name}
              </span>

              {/* NOME */}
              {editing ? (
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border p-2 rounded mb-2"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              )}

              <div className="flex items-center gap-4 mb-4">
                {renderStars(product.evaluation_avg)}
                <span className="text-gray-600">
                  ({product.reviews.length} avaliações)
                </span>
              </div>

              {/* DESCRIÇÃO */}
              {editing ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                />
              ) : (
                <p className="mb-4">{product.description}</p>
              )}

              {/* BOTÕES ADMIN */}
              {product.isAdmin && (
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setEditing(!editing)}
                    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                  >
                    {editing ? "Cancelar" : "Editar produto"}
                  </button>

                  {editing && (
                    <button
                      onClick={saveProduct}
                      className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                    >
                      Salvar
                    </button>
                  )}
                </div>
              )}

              <button className="w-full bg-yellow-400 py-3 rounded-lg font-bold flex justify-center gap-2 cursor-pointer">
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* DIREITA – REVIEWS */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Avaliações</h2>

              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {product.reviews.map((review) => (
                  <div
                    key={`${review.user_id}-${review.product_id}`}
                    className="border rounded-lg p-5"
                  >
                    <p className="font-semibold">{review.user.email}</p>
                    {renderStars(review.evaluation)}
                    <p className="mt-2">
                      {review.comment || "Sem comentário."}
                    </p>

                    {review.attributes.map((attr, i) => (
                      <p key={i} className="text-sm">
                        {attr.attribute.name}: {attr.value}
                      </p>
                    ))}

                    {product.isAdmin && (
                      <button
                        onClick={() =>
                          deleteReview(
                            review.user_id,
                            review.product_id
                          )
                        }
                        className="mt-3 text-red-600 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Trash size={16} />
                        Excluir avaliação
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsDisplay;
