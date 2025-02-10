import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">About Schulte Table</h1>
      <p className="max-w-2xl text-lg mb-4">
        Welcome to <strong>SchulteTable.com</strong>, the ultimate platform to
        enhance your focus and mental agility!
      </p>
      <p className="max-w-2xl text-lg mb-4">
        The Schulte Table is a well-known brain training tool designed to
        improve
        <strong> speed reading, attention span, and peripheral vision</strong>.
        It is widely used by professionals, students, and anyone looking to
        boost cognitive performance.
      </p>
      <p className="max-w-2xl text-lg mb-4">
        Our goal is to provide an engaging and effective way for users to
        practice and track their progress while having fun!
      </p>
      <p className="max-w-2xl text-lg mb-4">
        Start training your brain today and experience the benefits of Schulte
        Table exercises!
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
      >
        Play Now
      </Link>
    </div>
  );
}
