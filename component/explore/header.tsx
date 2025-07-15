"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  onBack,
  children,
}) => {
  const router = useRouter();
  return (
  <header
    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full px-3 sm:px-6 py-2 sm:py-3 mb-2 mt-2 bg-[#fefdf9]/90 border-2 border-[#b4defc] rounded-2xl shadow-[2px_4px_0_#b4defc,0_2px_16px_rgba(180,222,252,0.10)]"
    style={{
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      boxShadow: "2px 4px 0 #b4defc, 0 2px 16px rgba(180,222,252,0.10)",
    }}
  >
    <div className="flex items-center gap-2">
      {showBack && (
        <button
          className="px-3 py-1 rounded-full bg-[#b4defc] text-white font-bold border-2 border-[#71afd4] shadow-[2px_2px_0_#71afd4] hover:bg-[#71afd4] hover:scale-105 transition-all duration-150 text-xs sm:text-base"
          style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
          onClick={onBack}
        >
          ← Back
        </button>
      )}
      <span
        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#71afd4] drop-shadow-[2px_2px_0_#b4defc] select-none tracking-tight mb-1 sm:mb-0"
        style={{
          fontFamily: "Comic Sans MS, cursive, sans-serif",
          letterSpacing: "-0.03em",
          textShadow: "2px 2px 0 #b4defc",
        }}
        onClick={() => router.push("/")}
      >
        {title}
      </span>
    </div>
    <nav className="flex gap-2 sm:gap-4 ml-2">{children}</nav>
  </header>
  );
};

export default Header;
