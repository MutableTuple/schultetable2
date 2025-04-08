// app/how-to-play-schulte-table/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "How to Play the Schulte Table | SchulteTable.com",
  description:
    "Learn how to play the Schulte Table game with this step-by-step guide. Improve your brain focus, visual perception, and cognitive speed.",
};

export default function HowToPlayPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500">
        How to Play the Schulte Table
      </h1>
      <p className="text-lg mb-6 text-stone-950">
        The Schulte Table is a powerful brain-training exercise used to improve
        focus, visual perception, and mental speed. Whether you're a student,
        gamer, or productivity enthusiast—this guide will teach you how to use
        it effectively.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-stone-950">
          🧠 Step-by-Step Instructions
        </h2>
        <ol className="list-decimal list-inside text-stone-950 space-y-2">
          <li>
            Start with a 5×5 grid containing numbers from 1 to 25, randomly
            placed.
          </li>
          <li>
            Focus your eyes on the center of the grid and try not to move them.
          </li>
          <li>
            Click or tap the numbers in ascending order as fast as possible.
          </li>
          <li>
            Use your peripheral vision to find numbers without shifting your
            gaze too much.
          </li>
          <li>Track your time and try to beat your previous records!</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-stone-950">
          🎯 Pro Tips
        </h2>
        <ul className="list-disc list-inside text-stone-950 space-y-2">
          <li>Practice daily to notice cognitive improvement over time.</li>
          <li>Increase difficulty by using larger grids (6x6 or 7x7).</li>
          <li>Use a timer and track your progress every week.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-stone-950">
          💡 Who Should Play?
        </h2>
        <p className="text-stone-950">
          Anyone can benefit from the Schulte Table! It’s especially helpful
          for:
        </p>
        <ul className="list-disc list-inside text-stone-950 mt-2 space-y-1">
          <li>Students preparing for exams</li>
          <li>Gamers looking to improve reflexes</li>
          <li>Professionals wanting to boost productivity</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          🧪 Ready to Try?
        </h2>
        <p className="text-stone-950 mb-4">
          Start playing now and train your brain in a fun and effective way.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          ▶️ Play the Schulte Table
        </Link>
      </section>

      <hr className="border-yellow-500 my-10" />

      <footer className="text-sm text-gray-400">
        Also check out:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <Link
              href="/what-is-a-schulte-table"
              className="text-stone-900 hover:underline"
            >
              What is a Schulte Table?
            </Link>
          </li>
          <li>
            <Link
              href="/schulte-table-benefits"
              className="text-stone-900 hover:underline"
            >
              Benefits of Schulte Table
            </Link>
          </li>
        </ul>
      </footer>
    </main>
  );
}
