"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ShowcaseCard } from "@/component/explore/tweet";
import Header from "@/component/explore/header";
import { useRouter } from "next/navigation";
import { fetchTweets, searchTweets } from "@/lib/api";
import type { PublicMetrics } from "@/types/tweet";

const FILTERS = ["Latest", "Oldest", "Popular"];

// Responsive column count hook
function useColumnCount() {
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (width < 640) return 1; // mobile
  if (width < 1024) return 2; // tablet
  if (width < 1280) return 3; // laptop
  return 4; // desktop
}

const FILTER_TO_SORT: Record<string, string> = {
  Latest: "latest",
  Oldest: "oldest",
  Popular: "popular",
};

// Define the Tweet type based on expected data structure
interface Tweet {
  tweetId: string;
  tweetContent: string;
  username: string;
  transactionId: string;
  time: string | Date;
  imageUrl: string | null;
  publicMetrics: PublicMetrics;
}

export default function Home() {
  const [selected, setSelected] = useState("Latest");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const columnCount = useColumnCount();
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreTweets();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasMore, loadingMore, loading]
  );

  const loadMoreTweets = async () => {
    if (!hasMore || loadingMore || loading) return;

    setLoadingMore(true);
    try {
      let data;
      if (searchActive && search.trim()) {
        data = await searchTweets(search.trim(), { cursor: nextCursor });
      } else {
        data = await fetchTweets({
          sort: FILTER_TO_SORT[selected],
          cursor: nextCursor,
        });
      }

      if (data.data && data.data.length > 0) {
        setTweets((prev) => [...prev, ...data.data]);
        setNextCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load more tweets");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadTweets() {
      setLoading(true);
      setError(null);
      setHasMore(true);
      setNextCursor(null);
      try {
        let data;
        if (searchActive && search.trim()) {
          data = await searchTweets(search.trim());
        } else {
          data = await fetchTweets({ sort: FILTER_TO_SORT[selected] });
        }
        if (!ignore) {
          setTweets(data.data || []);
          setNextCursor(data.nextCursor);
          setHasMore(!!data.nextCursor);
        }
      } catch (e) {
        if (!ignore)
          setError(e instanceof Error ? e.message : "Failed to load tweets");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadTweets();
    return () => {
      ignore = true;
    };
  }, [selected, searchActive, search]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Split into columns
  const columns: Tweet[][] = Array.from({ length: columnCount }, () => []);
  tweets.forEach((item: Tweet, i: number) => {
    columns[i % columnCount].push(item);
  });

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearchActive(false);
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setSearchActive(!!search.trim());
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative p-0"
      style={{
        backgroundImage: "url('/explore-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[95vw] sm:w-[90vw] md:w-[85vw] flex flex-col flex-1 min-h-[calc(100vh-4rem)]">
        {/* Header, Search, Filter */}
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
        <div className="flex justify-end sm:mr-32 md:mr-52 mr-0 w-[calc(100%-52px)] z-10">
          <div className="flex items-center bg-white bg-opacity-90 border-2 sm:border-4 border-r-0 border-[#b4defc] rounded-l-full px-2 md:px-4 sm:px-3 py-1 md:py-2 sm:py-1.5 w-[60vw] sm:w-[320px] md:w-[380px]">
            <Search className="size-4 sm:size-5 md:size-6 text-[#b4defc] mr-1.5 sm:mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm sm:text-base md:text-lg w-full placeholder:text-[#b4defc] text-[#71afd4]"
              value={search}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 pb-2 sm:pb-3 md:pb-4 px-4 sm:px-6 pt-2 min-h-8 sm:min-h-12 md:min-h-14 rounded-t-3xl sm:rounded-t-4xl z-60 border-2 sm:border-4 border-b-0 sm:border-b-0 border-[#B9E3F8] bg-[#FEFDF9] flex items-center relative w-[calc(100%-65px)] sm:w-[calc(100%-80px)] md:w-[calc(100%-110px)] mr-[65px] sm:mr-[80px] md:mr-[110px] gap-2 sm:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelected(filter);
                setSearch("");
                setSearchActive(false);
              }}
              className={`transition-all font-semibold rounded-full px-4 sm:px-6 py-1.5 sm:py-2 shadow-md border-2 text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center
                ${
                  selected === filter
                    ? "bg-[#b4defc] border-[#71afd4] text-white scale-105 drop-shadow-lg"
                    : "bg-white border-[#b4defc] text-[#71afd4] hover:bg-[#e3f0fc] hover:scale-105"
                }
              `}
              style={{ fontFamily: "cursive, Comic Sans MS, sans-serif" }}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* Main Card */}
        <div
          className="mb-4 sm:mb-6 w-full flex-1 min-h-0 rounded-b-3xl sm:rounded-b-4xl elevation-4 border-2 sm:border-4 border-t-0 sm:border-t-0 border-[#B9E3F8] flex flex-col items-center justify-start relative"
          style={{
            background: "linear-gradient(180deg, #FEFDF9 0%, #DCECF1 40%)",
          }}
        >
          {/* Main Card Logo */}
          <div className="absolute -right-6 -top-24 sm:-right-10 sm:-top-34 md:-right-15.5 md:-top-45 z-50">
            <Image
              src="/pengu-peep.png"
              alt="ArkiveNow Logo"
              width={100}
              height={100}
              className="sm:w-[180px] sm:h-[180px] md:w-[250px] md:h-[250px] w-[130px] h-[130px]"
              priority
            />
          </div>
          {/* Content Grid: Masonry/Bento Columns */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center w-full text-xl text-[#71afd4] font-bold">
              Loading...
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center w-full text-red-500 font-bold">
              {error}
            </div>
          ) : (
            <div className="px-6 py-6 w-full flex-1 flex gap-6 overflow-y-auto max-h-[calc(100vh-220px)] sm:max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-260px)]">
              {columns.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className="flex flex-col gap-6 flex-1 min-w-0"
                >
                  {col.map((item, i) => (
                    <ShowcaseCard
                      key={item.tweetId || i}
                      tweet={{
                        id: item.tweetId,
                        text: item.tweetContent,
                        user: {
                          id: item.username || String(i),
                          displayName: item.username,
                        },
                        public_metrics: item.publicMetrics,
                      }}
                      transactionId={item.transactionId}
                      timestamp={
                        typeof item.time === "string"
                          ? item.time
                          : item.time.toISOString()
                      }
                      image={item.imageUrl || ""}
                      username={item.username}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* Loading more indicator */}
          {loadingMore && (
            <div className="flex items-center justify-center py-4 text-[#71afd4] font-bold">
              Loading more tweets...
            </div>
          )}
          {/* Intersection observer target */}
          {hasMore && !loading && (
            <div ref={lastElementRef} className="h-4 w-full" />
          )}
          {/* Empty State */}
          {!loading && !error && tweets.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
