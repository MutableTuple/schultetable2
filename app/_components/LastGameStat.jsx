import Link from "next/link";
import React from "react";

export default function LastGameStat() {
  return (
    <div className="fixed right-4 top-[4.5rem] md:top-auto md:bottom-[4.5rem] z-50">
      {/* 
        On small screens: `top-18` (~4.5rem) places it *just below* the leaderboard banner
        On md and above: `bottom-18` (~4.5rem) places it *just above* the lower leaderboard button
      */}
      <Link
        href="/leaderboard"
        className="relative bg-gray-800 text-yellow-400 px-4 py-2 rounded-full shadow-lg text-sm md:text-base hover:bg-gray-700 transition-all font-medium overflow-hidden"
      >
        <span className="relative z-10">Last game stat</span>
        <div className="absolute inset-0 pointer-events-none shine-effect"></div>
      </Link>
    </div>
  );
}
