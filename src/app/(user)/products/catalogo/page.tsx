
import React from 'react';
import { getProductsForCatalog } from '../../../api/products/productsController'; 
import ProductList from './_components/catalogo'; 

export default async function ProductCatalogPage() {
  
  let products = [];
  try {
    // Acessa o banco de dados através da função
    products = await getProductsForCatalog();

  } catch (error) {
    // Em caso de falha na busca
    console.error("Erro no fetch do catálogo:", error);
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Produtos</h1>
        <p className="text-red-500">Erro interno ao carregar o catálogo. Verifique o servidor.</p>
      </main>
    );
  }

  // Passa os dados buscados para o componente
  return (
    <main>
        <ProductList products={products} />
    </main>
  );
}