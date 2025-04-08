// app/schulte-table-benefits/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Benefits of the Schulte Table | SchulteTable.com",
  description:
    "Explore the mental and cognitive benefits of practicing with the Schulte Table. Boost focus, memory, and visual perception with this simple brain exercise.",
};

export default function SchulteTableBenefitsPage() {
  return (
    <main className="bg-stone-50 min-h-screen px-4 py-10 text-stone-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-500">
          Benefits of the Schulte Table
        </h1>

        <p className="text-lg mb-6 text-stone-900">
          The <strong>Schulte Table</strong> is more than just a fun game. It’s
          a scientifically backed tool that offers powerful benefits for your
          brain health, focus, and mental performance.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            🧠 Mental Sharpness
          </h2>
          <p className="text-stone-900">
            Regular practice improves cognitive speed, memory recall, and mental
            clarity—making your brain faster and more agile.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            👁️ Enhanced Visual Perception
          </h2>
          <p className="text-stone-900">
            The exercise strengthens your peripheral vision, helping you spot
            things quickly without directly looking at them—a key skill for
            reading, gaming, and driving.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            ⏱️ Improved Focus & Concentration
          </h2>
          <p className="text-stone-900">
            By focusing on a central point while locating numbers, your ability
            to concentrate improves, making it easier to stay attentive during
            tasks.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            📚 Better Reading Speed
          </h2>
          <p className="text-stone-900">
            The Schulte Table is often used in speed-reading courses to help
            train the eye to move more efficiently across text while maintaining
            comprehension.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            🎯 Who Should Use It?
          </h2>
          <ul className="list-disc list-inside text-stone-900 space-y-1">
            <li>Students preparing for exams</li>
            <li>Professionals wanting to stay mentally sharp</li>
            <li>Gamers looking to improve reflexes</li>
            <li>Anyone interested in brain training</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-2">
            🔥 Start Training Your Brain Today
          </h2>
          <p className="text-stone-900 mb-4">
            Try the Schulte Table now and experience these benefits firsthand.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            ▶️ Play the Schulte Table
          </Link>
        </section>

        <footer className="text-sm text-stone-900 border-t border-stone-700 pt-6 mt-10">
          Explore more:
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
                href="/how-to-play-schulte-table"
                className="text-stone-900 hover:underline"
              >
                How to Play the Schulte Table
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
