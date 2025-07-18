"use client";

import { useState } from "react";
import type { Tweet } from "@/types/tweet";
import { ExternalLink, Copy, Heart, Share2 } from "lucide-react";

interface ShowcaseCardProps {
  tweet: Tweet;
  transactionId: string;
  timestamp: string;
  image: string;
  username: string;
}

export function ShowcaseCard({
  tweet,
  transactionId,
  timestamp,
  image,
  username,
}: ShowcaseCardProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyTransaction = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(`https://arweave.net/${transactionId}`, "_blank");
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <div className="group relative">
      {/* Main Card */}
      <div
        className="bg-[#FEFDF9] border-4 border-[#b4defc] rounded-2xl shadow-[4px_6px_0_#71afd4,0_2px_16px_rgba(180,222,252,0.15)] overflow-hidden hover:shadow-[8px_12px_0_#71afd4,0_4px_32px_rgba(180,222,252,0.18)]"
        style={{
          fontFamily: "Comic Sans MS, cursive, sans-serif",
          position: "relative",
          borderRadius: "1rem",
          boxShadow: "0 6px 0 #b4defc, 0 2px 16px rgba(180,222,252,0.15)",
        }}
      >
        {/* Tweet Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt="Tweet"
            className="w-full object-cover rounded-t-2xl"
            style={{ filter: "contrast(1.1) brightness(1.05) saturate(1.2)" }}
          />
        </div>
        {/* Card Footer */}
        <div
          className="px-4 pt-4 pb-3 bg-[#fffbe9]/80 rounded-b-2xl border-t-4 border-[#ffe066] border-dashed shadow-[0_2px_8px_rgba(180,222,252,0.10)]"
          style={{
            position: "relative",
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(180,222,252,0.10)",
          }}
        >
          {/* Transaction ID */}
          <div className="flex items-center justify-between bg-[#fefdf9]/80 rounded-xl p-2 border border-[#b4defc] shadow-sm mt-2">
            <div className="flex-1 min-w-0">
              <p
                className="text-[11px] font-semibold text-[#71afd4] mb-0.5"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                Transaction ID
              </p>
              <p
                className="text-xs font-mono text-[#3a3a3a] truncate"
                style={{ fontWeight: 500 }}
              >
                {transactionId}
              </p>
            </div>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={handleCopyTransaction}
                className="bg-[#ffe066]/80 hover:bg-[#ffb347] text-[#ffb347] hover:text-white p-1.5 rounded-lg border border-[#ffb347] shadow-[1px_1px_0_#ffb347] transform hover:scale-110 transition-all duration-200 relative"
                title="Copy transaction ID"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                <Copy size={14} />
                {showCopied && (
                  <div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#71afd4] text-white text-xs px-2 py-1 rounded-md shadow-lg border-2 border-white"
                    style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                  >
                    Copied!
                  </div>
                )}
              </button>
              <button
                className="bg-[#ffe066]/80 hover:bg-[#ffb347] text-[#ffb347] hover:text-white p-1.5 rounded-lg border border-[#ffb347] shadow-[1px_1px_0_#ffb347] transform hover:scale-110 transition-all duration-200"
                title="Share"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
          {/* Transaction Info */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#ffe066] border-2 border-[#ffb347] rounded-full shadow-[0_2px_0_#ffb347] animate-pulse"></div>
              <span
                className="text-xs font-bold text-[#ffb347] bg-[#fffbe9] px-2 py-1 rounded-full border-2 border-[#ffe066] shadow-sm"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {username && `@${username} `}ARCHIVED
              </span>
              <span
                className="text-xs text-[#71afd4] font-semibold"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {formatTimeAgo(timestamp)}
              </span>
            </div>
            <button
              onClick={handleOpenInNewTab}
              className="text-[#b4defc] hover:text-[#71afd4] transform hover:scale-125 transition-all duration-200"
              title="View full size"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
