import { auth } from "@/server/auth";
import { PrismaClient } from "@prisma/client";
import Favorites from "./_components/Favorites";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function FavoritesPage() {
  // 🔐 Sessão do usuário
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/Login"); // ou a rota que você usa
  }

  // 🔍 Buscar usuário + favoritos
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      favoritos: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/Login");
  }

  // 📦 Formatar para o componente
  const favoritos = user.favoritos.map((fav) => ({
    product: {
      id: fav.product.id,
      name: fav.product.name,
      description: fav.product.description ?? "",
      evaluation_avg: fav.product.evaluation_avg,
      photo: fav.product.photo,
    },
  }));

  return (
    <main>
      <Favorites favoritos={favoritos} />
    </main>
  );
}
