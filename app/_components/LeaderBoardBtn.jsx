import Link from "next/link";
import React from "react";

export default function LeaderBoardBtn() {
  return (
    <div className="fixed right-4 top-6 md:top-auto md:bottom-4 z-50">
      <Link
        href="/leaderboard"
        className="relative bg-gray-800 text-yellow-400 px-4 py-2 rounded-full shadow-lg text-sm md:text-base hover:bg-gray-700 transition-all font-medium overflow-hidden"
      >
        <span className="relative z-10">🏆Leaderboard</span>
        <div className="absolute inset-0 pointer-events-none shine-effect"></div>
      </Link>
    </div>
  );
}
