"use client"


import Link from "next/link";
import React from 'react';

const Manage_Product: React.FC = () => {
return(


<section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">

  {/* Título */}
  <h1 className="text-4xl font-bold font-amazon mb-10">
    Manage Products
  </h1>

  {/* Container principal */}
  <div className="w-[800px] h-[600px] bg-scndnavbar/80 flex flex-col items-center justify-between py-10 px-6 ">

    {/* Parte superior */}
    <div className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Search Products in Nozama.com.br"
        className="bg-white w-[500px] h-10 px-4  shadow-md"
      />

      <p className="text-white mt-2 text-lg">
        Search products by name or category
      </p>
    </div>

    {/* Parte inferior (botões) */}
    <div className="flex gap-6 mb-4">
      <button
        type="button"
        className="bg-white shadow-xl px-6 py-2 font-bold hover:bg-navbar hover:text-white cursor-pointer text-black rounded-lg"
      >
        <Link href="/Admin/Manage_Products/Add_Category">
          Add Category +
        </Link>
      </button>


      <button
        type="button"
        className="bg-white shadow-xl px-6 py-2 font-bold hover:bg-navbar hover:text-white cursor-pointer text-black rounded-lg"
      >
        <Link href="/Admin/Manage_Products/Add_Product">
          Add Product +
        </Link>
      </button>
    </div>

  </div>

</section>



);
};

export default Manage_Product;