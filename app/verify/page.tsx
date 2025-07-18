"use client";

import React, { useState } from "react";
import Header from "@/component/explore/header";
import { ShowcaseCard } from "@/component/explore/tweet";
import { useRouter } from "next/navigation";
import { verifyImageUrl } from "@/lib/api";
import type { PublicMetrics } from "@/types/tweet";

// Define the VerifyResult type based on expected data structure
interface VerifyResult {
  tweet: {
    id: string;
    text: string;
    public_metrics: PublicMetrics;
  };
  username: string;
  transactionId: string;
  timestamp: string;
  image: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult | false | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await verifyImageUrl(input.trim());
      setShowModal(true);
      if (data.exists) {
        setResult({
          tweet: {
            id: data.tweetId,
            text: data.tweetContent || "",
            public_metrics: data.publicMetrics || {},
          },
          username: data.username || "",
          transactionId: data.transactionId,
          timestamp: data.archivedAt,
          image: data.imageUrl,
        });
      } else {
        setResult(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to verify image");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setResult(null);
    setError(null);
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-[#eaf6fb]"
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
        <main className="flex flex-col items-center justify-center flex-1 w-full pt-8">
          {/* Cartoon Card */}
          <div className="relative flex flex-col items-center w-full max-w-lg px-2 sm:px-0">
            <form
              onSubmit={handleSubmit}
              className="bg-[#fffbe9]/90 border-2 sm:border-4 border-[#b4defc] rounded-3xl px-4 sm:px-8 py-6 sm:py-10 shadow-[4px_8px_0_#b4defc,0_2px_24px_rgba(180,222,252,0.10)] flex flex-col items-center gap-3 sm:gap-4 w-full relative z-10"
              style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            >
              {/* Penguin Mascot */}
              <img
                src="/pengu-right.png"
                alt="Mascot"
                className="absolute right-6 sm:right-4 -top-[84.5px] sm:-top-[114px] w-32 h-24 sm:w-[168px] sm:h-32 drop-shadow-lg z-10 select-none pointer-events-none [filter:drop-shadow(0_2px_0_#b4defc)] sm:[filter:drop-shadow(0_4px_0_#b4defc)]"
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl sm:text-4xl">🔎</span>
                <span
                  className="text-lg sm:text-2xl font-extrabold text-[#71afd4] drop-shadow-[2px_2px_0_#b4defc] tracking-tight"
                  style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                >
                  Verify Image Link
                </span>
              </div>
              <input
                type="text"
                placeholder="Paste image URL (e.g. arweave.net/...)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-3 sm:px-5 py-2 sm:py-3 rounded-full border-2 sm:border-4 border-[#b4defc] bg-[#fefdf9] text-sm sm:text-base text-[#71afd4] font-bold shadow-[2px_2px_0_#b4defc] focus:outline-none focus:ring-2 focus:ring-[#b4defc] placeholder:text-[#b4defc]"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  letterSpacing: "0.01em",
                }}
                disabled={loading}
              />
              <button
                type="submit"
                className="px-5 sm:px-8 py-1.5 sm:py-2 rounded-full bg-[#ffe066] text-[#ffb347] font-extrabold border-2 sm:border-4 border-[#ffb347] shadow-[2px_2px_0_#ffb347] hover:bg-[#ffb347] hover:text-white hover:scale-105 transition-all duration-150 text-base sm:text-lg mt-2"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                disabled={loading || !input.trim()}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
          {/* Result Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-2 animate-fadeIn">
                <button
                  className="absolute top-2 right-2 text-[#b4defc] hover:text-[#71afd4] text-2xl font-bold rounded-full px-2 py-1 focus:outline-none"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ×
                </button>
                {error && (
                  <div className="mb-4 text-red-500 font-bold">{error}</div>
                )}
                {result !== null && result !== false && (
                  <div className="flex flex-col items-center w-full relative">
                    {/* Floating Badge */}
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-lg font-black rounded-full shadow-lg border-4 border-white z-20 select-none"
                      style={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                        transform: "rotate(-6deg) scale(1.1)",
                      }}
                    >
                      ✅ Image is Arkived!
                    </div>
                    <ShowcaseCard
                      tweet={result.tweet}
                      transactionId={result.transactionId}
                      timestamp={result.timestamp}
                      image={result.image}
                      username={result.username}
                    />
                  </div>
                )}
                {result === false && (
                  <div className="flex flex-col items-center w-full relative">
                    {/* Speech Bubble Error */}
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#b4defc] to-[#71afd4] text-white text-lg font-black rounded-full shadow-lg border-4 border-white z-20 select-none"
                      style={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                        transform: "rotate(-6deg) scale(1.1)",
                      }}
                    >
                      ❌ Not Arkived by ArkiveNow
                    </div>
                    <div className="bg-[#fffbe9]/90 border-4 border-[#ffe066] rounded-2xl px-8 py-8 shadow-[4px_8px_0_#ffe066] text-center text-[#b4defc] font-bold mt-4">
                      This image link was not found in ArkiveNow&apos;s archive.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
