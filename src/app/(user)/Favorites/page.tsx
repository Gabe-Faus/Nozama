import { auth } from "@/server/auth";
import { PrismaClient } from "@prisma/client";
import Favorites from "./_components/Favorites";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user?.id || typeof session.user.id !== "number") {
    redirect("/Login");
  }

  
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id, 
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
