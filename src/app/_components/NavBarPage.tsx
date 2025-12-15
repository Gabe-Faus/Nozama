"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * ⚠️ Ajuste este hook conforme seu auth real
 * Exemplo:
 * const { user } = useSession();
 * const isAdmin = user?.role === "ADMIN";
 */
const useAuthMock = () => {
  return {
    isAdmin: false, // 🔴 TROQUE isso pelo valor real
  };
};

const NavbarPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { isAdmin } = useAuthMock();

  const handleMenuClick = () => {
    setMenuOpen(false);

    if (isAdmin) {
      router.push("/Admin/Manage_Products");
    } else {
      router.push("/Favorites");
    }
  };

  return (
    <nav className="w-full">
      {/* Navbar principal */}
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

        {/* Trolley + Menu */}
        <div className="relative flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <img src="/trolley.png" alt="Trolley" className="h-10" />
            <span className="text-white">Trolley</span>
          </div>

          {/* Menu sanduíche */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-white hover:text-blue-400 transition"
          >
            ☰
          </button>

          {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded shadow-lg z-50">
                
                {/* Admin ou User */}
                <button
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  {isAdmin ? "Manage Products" : "My Favorites"}
                </button>

                {/* Home */}
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
