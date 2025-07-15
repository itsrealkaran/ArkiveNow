"use client";

import React from "react";

export default function VerifyPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#eaf6fb]"
      style={{
        backgroundImage: "url('/explore-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Comic Sans MS, cursive, sans-serif",
      }}
    >
      <div className="bg-white/80 border-2 border-[#b4defc] rounded-2xl px-8 py-12 shadow-lg flex flex-col items-center">
        <div className="text-6xl mb-4">🔎</div>
        <h1 className="text-2xl font-bold text-[#71afd4] mb-2">Verify Page</h1>
        <p className="text-lg text-[#ffb347] mb-4">This is a dummy page for verification.</p>
        <span className="text-gray-500 text-sm">Coming soon...</span>
      </div>
    </div>
  );
}
