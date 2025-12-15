"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NavbarPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  // 🔑 SE isAdmin === true → é admin
  const isAdmin = session?.user?.isAdmin === true;
  const isLoggedIn = status === "authenticated";

  const handleMenuClick = () => {
    setMenuOpen(false);

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (isAdmin) {
      router.push("/Admin/Manage_Products");
    } else {
      router.push("/Favorites");
    }
  };

  return (
    <nav className="w-full">
      <div className="bg-navbar h-16 flex items-center justify-between px-4 relative">

        {/* ZIP CODE */}
        <div className="flex items-center gap-2">
          <img
            src="/localPin.png"
            alt="Local Pin"
            className="max-h-5 hidden sm:block"
          />
          <h2 className="hidden md:block text-white font-amazon">
            Add your ZIP CODE
          </h2>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center items-center px-2">
          <div className="h-10 w-full max-w-[650px] bg-white text-black/70 flex items-center px-4">
            Search Nozama.com.br
          </div>
          <div className="h-10 w-10 bg-amber-500 flex justify-center items-center">
            <img src="/magnifier.png" alt="Magnifier" className="h-8" />
          </div>
        </div>

        {/* Menu */}
        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-white hover:text-blue-400 transition"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white rounded shadow-lg z-50">

              <button
                onClick={handleMenuClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                {isAdmin ? "Manage Products" : "My Favorites"}
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/products/catalogo");
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Home
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;
