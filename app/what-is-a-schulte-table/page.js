// app/what-is-a-schulte-table/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "What is a Schulte Table? | SchulteTable.com",
  description:
    "Discover the origins, purpose, and benefits of the Schulte Table. Learn how this simple brain-training tool can boost your focus and mental agility.",
};

export default function WhatIsSchulteTablePage() {
  return (
    <main className="bg-stone-50 min-h-screen px-4 py-10 text-stone-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-500">
          What is a Schulte Table?
        </h1>

        <p className="text-lg mb-6">
          A <strong>Schulte Table</strong> is a grid of randomly arranged
          numbers or letters, typically in a 5×5 format. It’s used to develop
          speed reading, peripheral vision, concentration, and visual
          perception.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">📜 Origin</h2>
          <p className="text-stone-900">
            Named after German psychiatrist <strong>Walter Schulte</strong>, the
            table was originally developed as a psychological test tool to
            assess attention and mental speed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            🎯 How It Works
          </h2>
          <p className="text-stone-900 mb-2">
            You are presented with a grid of numbers (usually 1 to 25), and the
            goal is to locate and click them in ascending order as quickly as
            possible.
          </p>
          <ul className="list-disc list-inside text-stone-900 space-y-1">
            <li>Focus on the center of the table</li>
            <li>Use your peripheral vision to locate numbers</li>
            <li>Try to minimize eye movement</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            💡 Applications
          </h2>
          <p className="text-stone-900">
            Schulte Tables are used in cognitive training programs, schools,
            military training, and even competitive gaming to:
          </p>
          <ul className="list-disc list-inside mt-2 text-stone-900 space-y-1">
            <li>Enhance reading speed and focus</li>
            <li>Improve mental alertness</li>
            <li>Train peripheral vision and visual memory</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-2">
            🚀 Try It Yourself
          </h2>
          <p className="text-stone-900 mb-4">
            Experience the benefits firsthand by playing the interactive Schulte
            Table game.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            ▶️ Play Now
          </Link>
        </section>

        <footer className="text-sm text-stone-900 border-t border-stone-700 pt-6 mt-10">
          Related pages:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <Link
                href="/how-to-play-schulte-table"
                className="text-stone-900 hover:underline"
              >
                How to Play the Schulte Table
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
      </div>
    </main>
  );
}
