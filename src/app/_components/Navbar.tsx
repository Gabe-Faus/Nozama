"use client";

{/* Navbar Gabriel pessoa Faustino - 231006121 */}

import React, {useState} from "react";
import { useSession, signOut } from "next-auth/react";


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  console.log("Sessão no Navbar:", session);
  console.log("Usuário:", session?.user);
  console.log("isAdmin:", (session?.user as any)?.isAdmin);

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); 
    }
  };

  return (
    <nav>
      {/* Primeira navbar */}
      <div className="bg-navbar h-15 flex items-center justify-between px-4">
        {/* ZIP CODE */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/localPin.png"
            alt="Local Pin"
            className="max-h-5 hidden sm:block"
          />
          <h2 className="hidden md:block text-white font-amazon">
            Add your ZIP CODE
          </h2>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center items-center px-2 cursor-pointer">
          <div className="h-10 w-full max-w-[650px] bg-white text-black/70 flex items-center px-4">
            Search Nozama.com.br
          </div>
          <div className="h-10 w-10 bg-amber-500 hover:bg-amber-600 flex justify-center items-center">
            <img src="/magnifier.png" alt="Magnifier" className="h-8" />
          </div>
        </div>

        {/* Sign in/Log in, Orders and Returns, and Trolley */}
        <div className="flex items-center gap-4 cursor-pointer">
          {session?.user ? (
            <div className="flex items-center gap-1 md:gap-2">

              {/* Para todos os usuários */}
              <span className="hidden md:inline text-white">
                Hello, {session.user.name || session.user.email?.split('@')[0] || 'User'}
              </span>
              <span className="md:hidden text-white">
                Hello, {(session.user.name || session.user.email?.split('@')[0] || 'User')?.split(' ')[0]}
              </span>

              {/* Para ADMIN */}
              {(session.user as any).isAdmin && ( 
                <>
                  <span className="text-gray-400 hidden sm:inline">|</span>
                  <span className="text-red-400 font-bold text-sm sm:text-base"> ADMIN </span>
                </>
              )}

              <span className="text-gray-400 hidden sm:inline">|</span>

              <button onClick={() => signOut()}
                className="text-white hover:text-gray-300 text-sm flex items-center gap-1"
                aria-label="Sign Out">
                <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>

                <span className="hidden md:inline">(Sign Out)</span>
              </button>
            </div>
          ) : (
            <a href="/Login" className="text-white whitespace-nowrap">Sign in</a>
          )}

          <h2 className="hidden md:block text-white">Orders and returns</h2>
          <div className="hidden md:flex items-center gap-1">
            <img src="/trolley.png" alt="Trolley" className="h-10" />
            <h1 className="text-white">Trolley</h1>
          </div>

          {/* Botão sanduíche (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl focus:outline-none text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Segunda navbar (desktop) */}
      <div className="h-10 bg-scndnavbar hidden md:flex flex-row justify-center items-center text-center gap-30">
        <h1
          onClick={() => handleScrollToSection("about-section")}
          className="text-white font-amazon font-bold cursor-pointer hover:text-blue-400 transition"
        >
          About us
        </h1>

        <a
          href="https://maps.app.goo.gl/pJmBLXGfEdGpTwYL7"
          className="text-white font-amazon font-bold cursor-pointer hover:text-blue-400 transition"
        >
          Find us
        </a>

        <h1
          onClick={() => handleScrollToSection("contact-section")}
          className="text-white font-amazon font-bold cursor-pointer hover:text-blue-400 transition"
        >
          Talk to us
        </h1>

        <a
          className="text-blue-600 font-amazon font-bold cursor-pointer"
          href="https://www.amazon.com.br/"
        >
          Amazon
        </a>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-scndnavbar flex flex-col items-center py-4 space-y-2 animate-slideDown">
          <h1
            onClick={() => handleScrollToSection("about-section")}
            className="text-white font-amazon font-bold cursor-pointer"
          >
            About us
          </h1>
          <a
            href="https://maps.app.goo.gl/pJmBLXGfEdGpTwYL7"
            className="text-white font-amazon font-bold cursor-pointer"
          >
            Find us
          </a>
          <h1
            onClick={() => handleScrollToSection("contact-section")}
            className="text-white font-amazon font-bold cursor-pointer"
          >
            Talk to us
          </h1>
          <a
            className="text-blue-600 font-amazon font-bold cursor-pointer"
            href="https://www.amazon.com.br/"
          >
            Amazon
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;