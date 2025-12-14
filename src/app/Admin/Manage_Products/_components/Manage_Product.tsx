"use client";

import Link from "next/link";
import { useState } from "react";

const Manage_Product: React.FC = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      setProducts([]);
      return;
    }

    const res = await fetch(`/api/products/search?q=${value}`);
    const data = await res.json();

    setProducts(Array.isArray(data) ? data : []);
  };


  return (
    <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">

      <h1 className="text-4xl font-bold font-amazon mb-10">
        Manage Products
      </h1>

      <div className="w-[800px] h-[600px] bg-scndnavbar/80 flex flex-col items-center justify-between py-10 px-6 ">

        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            placeholder="Search Products in Nozama.com.br"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-white w-[500px] h-10 px-4 shadow-md"
          />

          <div className="mt-6 w-full max-h-[300px] overflow-y-auto">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/Admin/Manage_Products/${product.id}`}
                className="flex items-center gap-4 bg-white p-3 mb-2 rounded shadow hover:bg-gray-300"
              >
                <img
                  src={`/images_products/${product.photo}`}
                  alt={product.name}
                  className="w-12 h-12 object-contain"
                />

                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-white mt-2 text-lg">
            Search products by name or category
          </p>
        </div>

        <div className="flex gap-6 mb-4">
          <Link
            href="/Admin/Manage_Products/Add_Category"
            className="bg-white shadow-xl px-6 py-2 font-bold hover:bg-navbar hover:text-white text-black rounded-lg"
          >
            Add Category +
          </Link>

          <Link
            href="/Admin/Manage_Products/Add_Product"
            className="bg-white shadow-xl px-6 py-2 font-bold hover:bg-navbar hover:text-white text-black rounded-lg"
          >
            Add Product +
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Manage_Product;
