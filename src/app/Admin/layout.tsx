import Link from "next/link";


import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import NavbarPage from "../_components/NavBarPage";
import Footer from "../_components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <NavbarPage />
        {children}
        <Footer />
      </body>
    </html>
  );
}