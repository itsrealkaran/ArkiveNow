import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative p-0"
      style={{
        backgroundImage: "url('/explore-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="absolute top-8 left-10 text-4xl font-bold text-black z-10 select-none">
        ArkiveNow
      </header>
      <div className="w-[85vw] flex flex-col items-center flex-1 min-h-[calc(100vh-4rem)]">
        {/* Search Bar */}
        <div className="mt-24 flex justify-end mr-72 w-full z-10">
          <div className="flex items-center bg-white bg-opacity-90 border-4 border-r-0 border-[#b4defc] rounded-l-full px-4 py-2 w-[380px] max-w-full">
            <Search className="w-8 h-8 text-[#b4defc] mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-lg w-full placeholder:text-[#71afd4] text-[#b4defc]"
            />
          </div>
        </div>
        {/* Filter */}
        <div
          className="mt-4 min-h-16 rounded-t-[2rem] z-60 border-4 border-b-0 border-[#B9E3F8] bg-[#FEFDF9] flex items-center justify-center relative w-[calc(100%-110px)] mr-[110px]"
        >
          Filter
        </div>
        {/* Main Card */}
        <div
          className="mb-6 w-full flex-1 min-h-0 rounded-b-4xl elevation-4 border-4 border-t-0 border-[#B9E3F8] flex items-center justify-center relative"
          style={{
            background: "linear-gradient(180deg, #FEFDF9 0%, #DCECF1 40%)",
          }}
        >
          {/* Main Card Logo */}
          <div className="absolute -right-15 -top-48 z-50">
            <Image
              src="/pengu-peep.png"
              alt="ArkiveNow Logo"
              width={260}
              height={260}
              priority
            />
          </div>
          Content goes here
        </div>
      </div>
    </div>
  );
}
