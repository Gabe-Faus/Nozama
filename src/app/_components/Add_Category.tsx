"use client"

import Link from "next/link";

import React from 'react';

const Add_Category: React.FC = () => {
return(
     <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">
  <form className="bg-scndnavbar/80 w-[900px] min-h-[300px] p-10 shadow-xl flex flex-col gap-6">

    {/* Título */}
    <h1 className="text-3xl font-bold text-white mb-4">Add New Category</h1>

    {/* Nome da Categoria */}
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">Category Name:</label>
      <input
        type="text"
        placeholder="Type category name"
        className="bg-white px-4 py-2 outline-none"
        name="name"
        required
      />
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
        Save Category
      </button>

    </div>

  </form>
</section>


);
};

export default Add_Category;