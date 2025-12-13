"use client";

{/* Navbar Gabriel pessoa Faustino - 231006121 */}

import React, {useState} from "react";


const NavbarPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Orders and Returns and Trolley */}
        <div className="flex items-center gap-4 cursor-pointer">
          <h2 className="hidden md:block text-white">Orders and returns</h2>
          <div className="hidden md:flex items-center gap-1">
            <img src="/trolley.png" alt="Trolley" className="h-10" />
            <h1 className="text-white">Trolley</h1>
          </div>

          {/* Botão sanduíche (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl focus:outline-none text-white hover:text-blue-400 transition"
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
          Home Page
        </h1>


        <a
          className="text-blue-600 font-amazon font-bold cursor-pointer hover:text-blue-200 transition"
          href="https://www.amazon.com.br/"
        >
          Amazon
        </a>
      </div>

      {/* Menu mobile (mostrado quando menuOpen = true) */}
      {menuOpen && (
        <div className="md:hidden bg-scndnavbar flex flex-col items-center py-4 space-y-2 animate-slideDown">
          <h1
            onClick={() => handleScrollToSection("about-section")}
            className="text-white font-amazon font-bold cursor-pointer"
          >
            Home Page
          </h1>
          
          <a
            className="text-blue-600 font-amazon font-bold cursor-pointer hover:text-blue-200 transition"
            href="https://www.amazon.com.br/"
          >
            Amazon
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;