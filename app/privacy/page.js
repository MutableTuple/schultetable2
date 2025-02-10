import Link from "next/link";
import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="max-w-2xl text-lg mb-4">
        Your privacy is important to us. This Privacy Policy explains how{" "}
        <strong>SchulteTable.com</strong> collects, uses, and protects your
        information.
      </p>

      <div className="max-w-2xl text-left">
        <h2 className="text-2xl font-bold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal data such as name, email address, and usage
          information to improve our services.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use collected data to enhance user experience, analyze trends, and
          improve website functionality.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We implement security measures to protect your personal data from
          unauthorized access.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Cookies & Tracking</h2>
        <p className="mb-4">
          Our website uses cookies to improve user experience. You can disable
          cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          5. Third-Party Services
        </h2>
        <p className="mb-4">
          We may use third-party services (e.g., Google Analytics) to track
          usage and improve our platform.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          6. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Please review it
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
