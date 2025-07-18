"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/component/explore/header";
import { ShowcaseCard } from "@/component/explore/tweet";
import { fetchUser, fetchUserTweets } from "@/lib/api";
import type { PublicMetrics } from "@/types/tweet";

const TABS = ["Latest", "Oldest", "Popular"];
const FILTER_TO_SORT: Record<string, string> = {
  Latest: "latest",
  Oldest: "oldest",
  Popular: "popular",
};

function useColumnCount() {
  const [width, setWidth] = React.useState(1200);
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (width < 640) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
}

// Define types for user and tweet
interface UserProfile {
  userId: string;
  name: string;
  username: string;
  profileImageUrl: string;
  count: number;
}

interface Tweet {
  id: string;
  tweet: {
    id: string;
    text: string;
    public_metrics: PublicMetrics;
  };
  transactionId: string;
  time: string;
  imageUrl: string;
  username: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const routeParams = useParams<{ username: string | string[] }>();
  const username = Array.isArray(routeParams.username)
    ? routeParams.username[0]
    : routeParams.username;
  const safeUsername = username || "";
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [selectedTab, setSelectedTab] = useState("Latest");
  const [userLoading, setUserLoading] = useState(false);
  const columnCount = useColumnCount();

  useEffect(() => {
    let ignore = false;
    async function loadUser() {
      setUserLoading(true);
      try {
        const data = await fetchUser(safeUsername);
        if (!ignore) setUser(data && data.userId ? data : null);
      } catch {
        // ignore
      } finally {
        if (!ignore) setUserLoading(false);
      }
    }
    if (safeUsername) loadUser();
    return () => {
      ignore = true;
    };
  }, [safeUsername]);

  useEffect(() => {
    let ignore = false;
    async function loadTweets() {
      try {
        const data = await fetchUserTweets(safeUsername, {
          sort: FILTER_TO_SORT[selectedTab],
        });
        if (!ignore) setTweets(data.data || []);
      } catch {
        // ignore
      } finally {
      }
    }
    if (safeUsername) loadTweets();
    return () => {
      ignore = true;
    };
  }, [safeUsername, selectedTab]);

  // Split into columns
  const columns: Tweet[][] = Array.from({ length: columnCount }, () => []);
  tweets.forEach((item: Tweet, i: number) => {
    columns[i % columnCount].push(item);
  });

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-[#eaf6fb] p-0"
      style={{
        backgroundImage: "url('/profile-bg.png')",
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
        <main className="flex flex-col items-center flex-1 w-full pt-4">
          {user ? (
            <div className="w-full mx-auto bg-[#fefdf9]/80 rounded-2xl border-2 sm:border-4 border-[#b4defc] shadow-inner relative">
              {/* Profile Header with superimposed Tabs */}
              <div className="relative">
                <div className="flex flex-row items-center justify-between bg-[#fefdf9] border-2 border-[#b4defc] rounded-2xl rounded-bl-none shadow-[2px_4px_0_#b4defc,0_2px_16px_rgba(180,222,252,0.10)] px-3 sm:px-6 py-4 sm:py-6 relative z-0">
                  {userLoading ? (
                    <div className="flex items-center gap-2 sm:gap-4 animate-pulse">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-[#b4defc] bg-[#eaf6fb] shadow-md" />
                      <div className="flex flex-col items-start gap-2 w-40 sm:w-64">
                        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                          <div className="h-7 sm:h-10 w-24 sm:w-40 bg-[#eaf6fb] rounded-md" />
                          <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#eaf6fb] border-2 border-[#b4defc] w-14 sm:w-20 h-5 sm:h-7" />
                        </div>
                        <div className="h-4 sm:h-5 w-20 sm:w-32 bg-[#eaf6fb] rounded" />
                        <div className="h-4 w-32 sm:w-40 bg-[#eaf6fb] rounded mt-1" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-4">
                      <img
                        src={user.profileImageUrl}
                        alt={user.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-[#b4defc] shadow-md object-cover bg-white"
                      />
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                          <span
                            className="text-xl sm:text-3xl font-extrabold text-[#171717]"
                            style={{
                              fontFamily: "Comic Sans MS, cursive, sans-serif",
                            }}
                          >
                            {user.name}
                          </span>
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#eaf6fb] border-2 border-[#b4defc] text-[#71afd4] font-bold text-xs ml-1">
                            Arkiver
                          </span>
                        </div>
                        <span className="text-xs sm:text-base text-[#71afd4] font-mono">
                          @{user.username}
                        </span>
                        <span className="text-xs text-[#b4defd] mt-0.5 sm:mt-1">
                          Tweets Archived:{" "}
                          <span className="font-black text-[#ffb347]">
                            {user.count}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                  <img
                    src="/profile-peep.png"
                    alt="Penguin Mascot"
                    className="absolute right-0 bottom-0 rounded-br-2xl w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 select-none pointer-events-none"
                    style={{ zIndex: 1 }}
                  />
                </div>
                {/* Tabs - superimposed over profile header */}
                <div
                  className="flex gap-2 sm:gap-4 pb-2 px-6 sm:px-10 bg-[#fefdf9] border-2 border-t-0 border-[#b4defc] rounded-b-2xl shadow-[2px_4px_0_#b4defc] absolute -bottom-6 z-10"
                  style={{
                    minWidth: "max-content",
                  }}
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`transition-all font-semibold rounded-full px-4 sm:px-6 py-1.5 sm:py-2 shadow-md border-2 text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center
                        ${
                          selectedTab === tab
                            ? "bg-[#b4defc] border-[#71afd4] text-white scale-105 drop-shadow-lg"
                            : "bg-white border-[#b4defc] text-[#71afd4] hover:bg-[#e3f0fc] hover:scale-105"
                        }
                      `}
                      style={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Add bottom padding to make space for tabs */}
                <div className="h-3.5 sm:h-6" />
              </div>
              {/* Tweets Grid - match main page column logic */}
              <div className="px-6 py-8 mt-2 w-full flex-1 flex gap-6 overflow-y-auto max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-320px)]">
                {columns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-6 flex-1 min-w-0"
                  >
                    {col.map((item) => (
                      <ShowcaseCard
                        key={item.id}
                        tweet={item.tweet}
                        transactionId={item.transactionId}
                        timestamp={item.time}
                        image={item.imageUrl}
                        username={item.username}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#fffbe9]/90 border-2 border-[#ffe066] rounded-2xl px-8 py-10 shadow-[2px_4px_0_#ffe066,0_2px_16px_rgba(255,224,102,0.10)] text-center max-w-md w-full mt-10">
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
