import Link from "next/link";


import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Add_Product from "../Add_Product/_components/Add_Product";
import Add_Category from "@/app/Admin/Manage_Products/Add_Category/_components/Add_Category";



export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <main>
        <Add_Category/>
    </main>
  )
}