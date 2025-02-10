import Link from "next/link";
import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-stone-950">
      <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
      <p className="max-w-2xl text-lg mb-4">
        Welcome to <strong>SchulteTable.com</strong>. By using our website, you
        agree to the following terms.
      </p>

      <div className="max-w-2xl text-left">
        <h2 className="text-2xl font-bold mt-6 mb-2">1. Use of Our Service</h2>
        <p className="mb-4">
          Our website is designed to help users train their focus and cognitive
          skills using Schulte Tables. You may use our services for personal,
          non-commercial purposes.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          2. User Responsibilities
        </h2>
        <p className="mb-4">
          You agree to use the website responsibly and not engage in any
          activities that may harm the platform or other users.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">
          3. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, including text, graphics, and design elements, are the
          property of SchulteTable.com. Unauthorized copying or distribution is
          prohibited.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Privacy Policy</h2>
        <p className="mb-4">
          We respect your privacy. Any personal data collected will be handled
          according to our Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to update these terms at any time. Continued use
          of the site means you accept any changes.
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
