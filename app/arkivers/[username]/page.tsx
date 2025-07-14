"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/component/explore/Header";

// Sample Arkivers data
const arkivers = [
  {
    id: 1,
    avatar: "/pengu-peep.png",
    displayName: "Pengu Peep",
    username: "pengu",
    archived: 128,
  },
  {
    id: 2,
    avatar: "/tweet-1.png",
    displayName: "Jane Doe",
    username: "janedoe",
    archived: 92,
  },
  {
    id: 3,
    avatar: "/tweet-2.jpg",
    displayName: "Alex Photo",
    username: "alexphoto",
    archived: 75,
  },
  {
    id: 4,
    avatar: "/tweet-4.jpg",
    displayName: "Studio Cat",
    username: "studio_cat",
    archived: 60,
  },
  {
    id: 5,
    avatar: "/tweet-6.png",
    displayName: "Test User",
    username: "testuser",
    archived: 44,
  },
];

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const user = arkivers.find((a) => a.username.replace(/^@/, "") === username);

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
          <button
            className="mb-6 px-4 py-1.5 rounded-full bg-[#b4defc] text-white font-bold border-2 border-[#71afd4] shadow-[2px_2px_0_#71afd4] hover:bg-[#71afd4] hover:scale-105 transition-all duration-150 text-xs sm:text-base"
            style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            onClick={() => router.push("/arkivers")}
          >
            ← Back to Arkivers
          </button>
          {user ? (
            <div className="bg-[#fffbe9]/90 border-2 border-[#ffe066] rounded-2xl px-8 py-10 shadow-[2px_4px_0_#ffe066,0_2px_16px_rgba(255,224,102,0.10)] flex flex-col items-center text-center max-w-md w-full">
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-24 h-24 rounded-full border-4 border-[#b4defc] shadow-md mb-4 object-cover bg-white"
              />
              <div className="text-2xl font-bold text-[#71afd4] mb-1">
                {user.displayName}
              </div>
              <div className="text-base text-[#ffb347] mb-2 font-mono">
                @{user.username}
              </div>
              <div className="text-sm text-[#b4defc] mb-4 font-semibold">
                Tweets Archived:{" "}
                <span className="font-black text-[#ffb347]">
                  {user.archived}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#fffbe9]/90 border-2 border-[#ffe066] rounded-2xl px-8 py-10 shadow-[2px_4px_0_#ffe066,0_2px_16px_rgba(255,224,102,0.10)] text-center max-w-md w-full">
              <div className="text-xl font-bold text-[#ffb347] mb-2">
                User Not Found
              </div>
              <div className="text-[#71afd4] text-base">
                This Arkiver does not exist.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
