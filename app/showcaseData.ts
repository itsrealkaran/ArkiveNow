import { sampleTweets } from "@/types/tweet";

const showcaseImages = [
  "/tweet-1.png",
  "/tweet-2.jpg",
  "/tweet-4.jpg",
  "/tweet-6.png",
];

export const showcaseData = sampleTweets.map((tweet, index) => ({
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