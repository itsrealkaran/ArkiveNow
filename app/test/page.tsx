"use client";

import React, { useState } from "react";

const endpoints = [
  { label: "/api/tweets", url: "/api/tweets" },
  { label: "/api/tweets?sort=popular", url: "/api/tweets?sort=popular" },
  { label: "/api/tweets/search?q=test", url: "/api/tweets/search?q=test" },
  {
    label: "/api/tweets/verifyimageurl?url=https://arweave.net/test",
    url: "/api/tweets/verifyimageurl?url=https://arweave.net/test",
  },
  {
    label:
      "/api/tweets/verifyimageurl?url=https://arweave.net/UayE03Rcr8K7byGUOXLCkt8_Yo0QBUlbBZiOvLyxvTs",
    url: "/api/tweets/verifyimageurl?url=https://arweave.net/UayE03Rcr8K7byGUOXLCkt8_Yo0QBUlbBZiOvLyxvTs",
  },
  { label: "/api/arkivers", url: "/api/arkivers" },
  { label: "/api/users/testuser", url: "/api/users/testuser" },
  { label: "/api/users/apectoryinc", url: "/api/users/apectoryinc" },
  { label: "/api/users/testuser/tweets", url: "/api/users/testuser/tweets" },
  {
    label: "/api/users/apectoryinc/tweets",
    url: "/api/users/apectoryinc/tweets",
  },
];

export default function TestApiPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runTests() {
    setLoading(true);
    const newResults: any[] = [];
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint.url);
        const data = await res.json();
        newResults.push({ label: endpoint.label, data });
      } catch (err) {
        newResults.push({
          label: endpoint.label,
          data: { error: String(err) },
        });
      }
    }
    setResults(newResults);
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      <button
        onClick={runTests}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold mb-6"
        disabled={loading}
      >
        {loading ? "Testing..." : "Run API Tests"}
      </button>
      <div className="space-y-6">
        {results.map((r, i) => (
          <div key={i} className="border rounded p-4 bg-gray-50">
            <div className="font-mono text-sm text-blue-700 mb-2">
              {r.label}
            </div>
            <pre className="text-xs bg-white p-2 rounded overflow-x-auto max-h-64">
              {JSON.stringify(r.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
