"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { sampleTweets } from "@/types/tweet";
import { ShowcaseCard } from "@/component/explore/tweet";
import { useRouter } from "next/navigation";

const FILTERS = ["Latest", "Oldest", "Popular"];

// Sample showcase data with transaction IDs
const showcaseImages = [
  "/tweet-1.png",
  "/tweet-2.jpg",
  "/tweet-4.jpg",
  "/tweet-6.png",
];
const showcaseData = sampleTweets.map((tweet, index) => ({
  id: tweet.id,
  tweet: tweet,
  image: showcaseImages[index % showcaseImages.length],
  transactionId: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random()
    .toString(16)
    .substr(2, 4)}`,
  timestamp: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toISOString(),
}));

// const DUMMY_CARDS: ArkiveCardProps[] = [
//   {
//     image: "/tweet-1.png",
//     txId: "TxID_1234567890abcdef",
//     link: "https://arweave.org/tx/1234567890abcdef",
//   },
//   {
//     image: "/tweet-2.jpg",
//     txId: "TxID_abcdef1234567890",
//     link: "https://arweave.org/tx/abcdef1234567890",
//   },
//   {
//     image: "/tweet-4.jpg",
//     txId: "TxID_9876543210fedcba",
//     link: "https://arweave.org/tx/9876543210fedcba",
//   },
//   {
//     image: "/tweet-6.png",
//     txId: "TxID_1122334455667788",
//     link: "https://arweave.org/tx/1122334455667788",
//   },
// ];

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

export default function Home() {
  const [selected, setSelected] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const columnCount = useColumnCount();
  const router = useRouter();
  // Filtered data
  const filteredData = showcaseData.filter(
    (item) =>
      searchQuery === "" ||
      item.tweet.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tweet.user?.displayName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Split into columns
  type ShowcaseItem = (typeof showcaseData)[number];
  const columns: ShowcaseItem[][] = Array.from(
    { length: columnCount },
    () => []
  );
  filteredData.forEach((item, i) => {
    columns[i % columnCount].push(item);
  });

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
        <header
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full px-3 sm:px-6 py-2 sm:py-3 mb-2 mt-2 bg-[#fefdf9]/90 border-2 border-[#b4defc] rounded-2xl shadow-[2px_4px_0_#b4defc,0_2px_16px_rgba(180,222,252,0.10)]"
          style={{
            fontFamily: "Comic Sans MS, cursive, sans-serif",
            boxShadow: "2px 4px 0 #b4defc, 0 2px 16px rgba(180,222,252,0.10)",
          }}
        >
          <span
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#71afd4] drop-shadow-[2px_2px_0_#b4defc] select-none tracking-tight mb-1 sm:mb-0"
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              letterSpacing: "-0.03em",
              textShadow: "2px 2px 0 #b4defc",
            }}
          >
            ArkiveNow
          </span>
          <nav className="flex gap-2 sm:gap-4">
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
          </nav>
        </header>
        <div className="flex justify-end sm:mr-32 md:mr-52 mr-0 w-[calc(100%-52px)] z-10">
          <div className="flex items-center bg-white bg-opacity-90 border-2 sm:border-4 border-r-0 border-[#b4defc] rounded-l-full px-2 md:px-4 sm:px-3 py-1 md:py-2 sm:py-1.5 w-[60vw] sm:w-[320px] md:w-[380px]">
            <Search className="size-4 sm:size-5 md:size-6 text-[#b4defc] mr-1.5 sm:mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm sm:text-base md:text-lg w-full placeholder:text-[#b4defc] text-[#71afd4]"
            />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 pb-2 sm:pb-3 md:pb-4 px-4 sm:px-6 pt-2 min-h-8 sm:min-h-12 md:min-h-14 rounded-t-3xl sm:rounded-t-4xl z-60 border-2 sm:border-4 border-b-0 sm:border-b-0 border-[#B9E3F8] bg-[#FEFDF9] flex items-center relative w-[calc(100%-65px)] sm:w-[calc(100%-80px)] md:w-[calc(100%-110px)] mr-[65px] sm:mr-[80px] md:mr-[110px] gap-2 sm:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelected(filter)}
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
          <div className="px-6 py-6 w-full flex-1 flex gap-6 overflow-y-auto max-h-[calc(100vh-220px)] sm:max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-260px)]">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6 flex-1 min-w-0">
                {col.map((item) => (
                  <ShowcaseCard
                    key={item.id}
                    tweet={item.tweet}
                    transactionId={item.transactionId}
                    timestamp={item.timestamp}
                    image={item.image}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Empty State */}
          {filteredData.length === 0 && (
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
