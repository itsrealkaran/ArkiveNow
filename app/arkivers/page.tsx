"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/component/explore/header";

// Sample Arkivers data
const arkivers = [
  {
    id: 1,
    avatar: "/pengu-peep.png",
    displayName: "Pengu Peep",
    username: "@pengu",
    archived: 128,
  },
  {
    id: 2,
    avatar: "/tweet-1.png",
    displayName: "Jane Doe",
    username: "@janedoe",
    archived: 92,
  },
  {
    id: 3,
    avatar: "/tweet-2.jpg",
    displayName: "Alex Photo",
    username: "@alexphoto",
    archived: 75,
  },
  {
    id: 4,
    avatar: "/tweet-4.jpg",
    displayName: "Studio Cat",
    username: "@studio_cat",
    archived: 60,
  },
  {
    id: 5,
    avatar: "/tweet-6.png",
    displayName: "Test User",
    username: "@testuser",
    archived: 44,
  },
];

export default function ArkiversPage() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-[#eaf6fb] p-0"
      style={{
        backgroundImage: "url('/explore-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Comic Sans MS, cursive, sans-serif",
      }}
    >
      <div className="w-[95vw] sm:w-[90vw] md:w-[85vw] flex flex-col flex-1 min-h-[calc(100vh-4rem)]">
        <Header title="ArkiveNow">
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#ffe066] text-[#ffb347] font-bold border-2 border-[#ffb347] shadow-[2px_2px_0_#ffb347] hover:bg-[#ffb347] hover:text-white transition-all duration-150 text-xs sm:text-base"
            style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            onClick={() => router.push("/arkivers")}
          >
            Arkivers
          </button>
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#b4defc] text-[#71afd4] font-bold border-2 border-[#71afd4] shadow-[2px_2px_0_#71afd4] hover:bg-[#71afd4] hover:text-white transition-all duration-150 text-xs sm:text-base"
            style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            onClick={() => router.push("/verify")}
          >
            Verify
          </button>
        </Header>
        <main className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="w-full px-2 bg-[#fefdf9]/70 rounded-2xl border-2 sm:border-4 border-[#b4defc] shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto max-h-[calc(100vh-160px)] py-8 px-4">
              {arkivers.map((arkiver, idx) => (
                <div
                  key={arkiver.id}
                  className="bg-[#fffbe9]/90 border-2 border-[#ffe066] rounded-2xl px-6 py-6 shadow-[2px_4px_0_#ffe066,0_2px_16px_rgba(255,224,102,0.10)] flex flex-col items-center text-center cartoon-card hover:scale-105 hover:shadow-lg transition-transform duration-200 relative cursor-pointer group"
                  style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                  onClick={() =>
                    router.push(`/${arkiver.username.replace(/^@/, "")}`)
                  }
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      router.push(`/${arkiver.username.replace(/^@/, "")}`);
                  }}
                  aria-label={`View profile of ${arkiver.displayName}`}
                >
                  {/* Top 3 badge */}
                  {idx < 3 && (
                    <div
                      className={`absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-black shadow-lg border-2 border-white z-10 select-none ${
                        idx === 0
                          ? "bg-[#ffe066] text-[#ffb347]"
                          : idx === 1
                          ? "bg-[#b4defc] text-[#71afd4]"
                          : "bg-[#ffb347] text-white"
                      }`}
                      style={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                        transform: "rotate(-6deg) scale(1.1)",
                      }}
                    >
                      {idx === 0
                        ? "🥇 Top 1"
                        : idx === 1
                        ? "🥈 Top 2"
                        : "🥉 Top 3"}
                    </div>
                  )}
                  <img
                    src={arkiver.avatar}
                    alt={arkiver.displayName}
                    className="w-20 h-20 rounded-full border-4 border-[#b4defc] shadow-md mb-3 object-cover bg-white group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="text-lg font-bold text-[#71afd4] mb-1">
                    {arkiver.displayName}
                  </div>
                  <div className="text-sm text-[#ffb347] mb-2 font-mono">
                    {arkiver.username}
                  </div>
                  <div className="text-xs text-[#b4defc] mb-4 font-semibold">
                    Tweets Archived:{" "}
                    <span className="font-black text-[#ffb347]">
                      {arkiver.archived}
                    </span>
                  </div>
                  <div className="text-xs text-[#b4defc] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
                    View Profile →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
