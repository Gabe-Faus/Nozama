"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

const Add_Product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Buscar categorias
  useEffect(() => {
    fetch("/api/categories/list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Preview da imagem
  const handlePhotoChange = (file: File | null) => {
    setPhoto(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !categoryId || !photo) {
      setMessage("Preencha todos os campos");
      setSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", String(categoryId));
    formData.append("photo", photo);

    const res = await fetch("/api/products/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Produto inserido com sucesso!");
      setName("");
      setDescription("");
      setCategoryId("");
      setPhoto(null);
      setPreview(null);
    } else {
      setSuccess(false);
      setMessage(data.message || "Erro ao inserir produto");
    }

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
        className="bg-scndnavbar/80 w-[900px] p-10 shadow-xl flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Add New Product
        </h1>

        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Product Name</label>
          <input
            className="bg-white px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Description</label>
          <textarea
            className="bg-white px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Foto */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="bg-white px-4 py-2"
            onChange={(e) =>
              handlePhotoChange(e.target.files?.[0] || null)
            }
            required
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-contain bg-white rounded"
            />
          )}
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Category</label>
          <select
            className="bg-white px-4 py-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botões */}
        <div className="flex gap-10 justify-center">
          <Link
            href="/Admin/Manage_Products"
            className="bg-white px-6 py-3 font-semibold hover:bg-navbar hover:text-white transition"
          >
            Back
          </Link>

          <button
            type="submit"
            className="bg-white px-6 py-3 font-semibold hover:bg-navbar hover:text-white transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default Add_Product;
