"use client";

import Link from "next/link";
import { useState } from "react";

const Add_Category = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Categoria inserida com sucesso!");
      setName("");
    } else {
      setSuccess(false);
      setMessage("Erro ao inserir categoria");
    }

    // Fecha o popup após 3s
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <section className="bg-bodyamazon min-h-screen flex flex-col items-center py-12 px-4">
      
      {/* POP-UP */}
      {message && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded text-white shadow-lg
            ${success ? "bg-green-500" : "bg-red-500"}`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-scndnavbar/80 w-[900px] min-h-[300px] p-10 shadow-xl flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Add New Category
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">
            Category Name:
          </label>
          <input
            type="text"
            placeholder="Type category name"
            className="bg-white px-4 py-2 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-10 items-center justify-center">
          <Link
            href="/Admin/Manage_Products"
            className="bg-white px-6 py-3 mt-4 font-semibold hover:bg-navbar hover:text-white transition"
          >
            Back
          </Link>

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
