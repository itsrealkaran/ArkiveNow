"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import { sampleTweets } from "@/types/tweet";
import { ShowcaseCard } from "@/component/explore/tweet";

const FILTERS = ["Latest", "Oldest", "Top Arkiver"];

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

export default function Home() {
  const [selected, setSelected] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

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
        {/* Header */}
        <header
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black z-10 select-none mt-10"
          style={{
            fontFamily: "cursive, Comic Sans MS, sans-serif",
          }}
        >
          ArkiveNow
        </header>
        {/* Search Bar */}
        <div className="flex justify-end sm:mr-32 md:mr-52 mr-0 w-[calc(100%-52px)] z-10">
          <div className="flex items-center bg-white bg-opacity-90 border-2 sm:border-4 border-r-0 border-[#b4defc] rounded-l-full px-2 md:px-4 sm:px-3 py-1 md:py-2 sm:py-1.5 w-[60vw] sm:w-[320px] md:w-[380px]">
            <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#b4defc] mr-1.5 sm:mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-base sm:text-lg w-full placeholder:text-[#71afd4] text-[#b4defc]"
            />
          </div>
        </div>
        {/* Filter */}
        <div className="mt-2 sm:mt-3 md:mt-4 px-4 sm:px-6 pt-2 min-h-8 sm:min-h-12 md:min-h-14 rounded-t-3xl sm:rounded-t-4xl z-60 border-2 sm:border-4 border-b-0 sm:border-b-0 border-[#B9E3F8] bg-[#FEFDF9] flex items-center relative w-[calc(100%-50px)] sm:w-[calc(100%-80px)] md:w-[calc(100%-110px)] mr-[50px] sm:mr-[80px] md:mr-[110px] gap-2 sm:gap-4">
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
          className="mb-4 sm:mb-6 w-full flex-1 min-h-0 rounded-b-3xl sm:rounded-b-4xl elevation-4 border-2 sm:border-4 border-t-0 sm:border-t-0 border-[#B9E3F8] flex items-center justify-center relative"
          style={{
            background: "linear-gradient(180deg, #FEFDF9 0%, #DCECF1 40%)",
          }}
        >
          {/* Main Card Logo */}
          <div className="absolute -right-6 -top-22.5 sm:-right-10 sm:-top-34 md:-right-15.5 md:-top-45 z-50">
            <Image
              src="/pengu-peep.png"
              alt="ArkiveNow Logo"
              width={100}
              height={100}
              className="sm:w-[180px] sm:h-[180px] md:w-[250px] md:h-[250px] w-[120px] h-[120px]"
              priority
            />
          </div>
          {/* Content Grid */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {showcaseData
                .filter(
                  (item) =>
                    searchQuery === "" ||
                    item.tweet.text
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item.tweet.user?.displayName
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <ShowcaseCard
                    key={item.id}
                    tweet={item.tweet}
                    transactionId={item.transactionId}
                    timestamp={item.timestamp}
                    image={item.image}
                  />
                ))}
            </div>

            {/* Empty State */}
            {showcaseData.filter(
              (item) =>
                searchQuery === "" ||
                item.tweet.text
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item.tweet.user?.displayName
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            ).length === 0 && (
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
    </div>
  );
}
