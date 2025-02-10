import Link from "next/link";
import React from "react";

export default function Cookies() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">Cookies Policy</h1>
      <p className="max-w-2xl text-lg mb-4">
        This Cookies Policy explains how <strong>SchulteTable.com</strong> uses
        cookies to enhance your experience.
      </p>

      <div className="max-w-2xl text-left">
        <h2 className="text-2xl font-bold mt-6 mb-2">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit a
          website. They help improve functionality, track user preferences, and
          enhance your browsing experience.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">2. How We Use Cookies</h2>
        <p className="mb-4">
          We use cookies to analyze site traffic, remember your settings, and
          improve user experience. Some cookies are necessary for the website to
          function properly.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Managing Cookies</h2>
        <p className="mb-4">
          You can control or delete cookies through your browser settings.
          However, disabling certain cookies may affect the website’s
          functionality.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Third-Party Cookies</h2>
        <p className="mb-4">
          We may use third-party services like Google Analytics that set their
          own cookies to track website usage.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          5. Updates to This Policy
        </h2>
        <p className="mb-4">
          We may update this Cookies Policy from time to time. Please check back
          regularly for any changes.
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
