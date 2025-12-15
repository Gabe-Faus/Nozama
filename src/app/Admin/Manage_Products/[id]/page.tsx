import React from "react";
import { notFound } from "next/navigation";
import ProductDetailsDisplay from "./_components/detalhes_product";
import { getProductDetails } from "../../../api/products/productsController";

/* ===================== TIPAGEM ===================== */

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/* ===================== PAGE ===================== */

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  // Resolver params (App Router)
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  // Validar ID
  if (isNaN(productId)) {
    notFound();
  }

  // Buscar produto
  const product = await getProductDetails(productId);

  if (!product) {
    notFound();
  }

  /* ===================== FORMATAR DADOS ===================== */
  const formattedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    evaluation_avg: product.evaluation_avg || 0,
    photo: product.photo,
    category: product.category,

    // 🔒 depois isso vem da sessão (auth)
    isAdmin: true,

    reviews:
      product.reviews?.map((review) => ({
        user_id: review.user_id,
        product_id: review.product_id,
        user: review.user,
        evaluation: review.evaluation,
        comment: review.comment,
        attributes:
          review.attributes?.map((attr) => ({
            attribute: {
              name: attr.attribute?.name || "Atributo",
            },
            value: attr.value,
          })) || [],
      })) || [],
  };

  /* ===================== RENDER ===================== */
  return <ProductDetailsDisplay {...formattedProduct} />;
}
