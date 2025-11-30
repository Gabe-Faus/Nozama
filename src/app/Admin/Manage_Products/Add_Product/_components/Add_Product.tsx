"use client"

import Link from "next/link";

import React from 'react';

const Add_Product: React.FC = () => {
return(
    <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">
  <form className="bg-scndnavbar/80 w-[900px] min-h-[500px] p-10 shadow-xl flex flex-col gap-6">

    {/* Título */}
    <h1 className="text-3xl font-bold text-white mb-4">Add New Product</h1>

    {/* Nome */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Product Name:</label>
      <input
        type="text"
        placeholder="Type product name"
        className="bg-white px-4 py-2 outline-none"
        name="name"
        required
      />
    </div>

    {/* Foto */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Product Photo (URL or upload):</label>
      <input
        type="text"
        placeholder="Type image URL"
        className="bg-white px-4 py-2 outline-none"
        name="photo"
        required
      />
      {/* Se quiser depois transformar em upload, você muda aqui */}
    </div>

    {/* Evaluation Average */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Evaluation Average:</label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        defaultValue={0}
        className="bg-white px-4 py-2 outline-none"
        name="evaluation_avg"
        required
      />
    </div>

    {/* Descrição */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Description:</label>
      <textarea
        placeholder="Type product description"
        rows={4}
        className="bg-white px-4 py-2 outline-none"
        name="description"
      />
    </div>

    {/* Categoria */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Category:</label>
      <select
        className="bg-white px-4 py-2 outline-none"
        name="category_id"
        required
      >
        <option value="">Select a Category</option>

        {/* Aqui você vai preencher dinamicamente quando integrar */}
        {/* Exemplo estático temporário: */}
        <option value="1">Electronics</option>
        <option value="2">Books</option>
        <option value="3">Toys</option>
        <option value="4">Beauty</option>
      </select>
    </div>

    {/* Botões */}
    <div className="flex gap-10 items-center justify-center">

      <button
        type="button"
        className="bg-white px-6 py-3 mt-4 font-semibold hover:bg-navbar hover:text-white transition"
      >
        <Link href="/Admin/Manage_Products">
          Back
        </Link>
      </button>

      <button
        type="submit"
        className="bg-white px-6 py-3 mt-4 font-semibold hover:bg-navbar hover:text-white transition"
      >
        Save Product
      </button>

    </div>

  </form>
</section>

);
};

export default Add_Product;