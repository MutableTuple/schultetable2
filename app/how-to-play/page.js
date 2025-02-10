import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">How to Play Schulte Table</h1>
      <p className="text-lg max-w-2xl mb-6">
        The Schulte Table is a simple but effective exercise to improve your
        visual attention and peripheral vision. Follow these steps to play:
      </p>
      <ol className="text-left list-decimal list-inside  p-6 rounded-lg max-w-lg">
        <li>Focus on the center of the table without moving your eyes.</li>
        <li>
          Find and click the numbers in ascending order as fast as possible.
        </li>
        <li>
          Avoid distractions and try to improve your speed with each round.
        </li>
        <li>Practice regularly to boost your brain’s cognitive abilities.</li>
      </ol>
      <Link href="/">
        <div className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg hover:bg-blue-700 transition">
          Play Now
        </div>
      </Link>
    </div>
  );
}
