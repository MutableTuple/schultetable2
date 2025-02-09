"use client"; // Ensure this is a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { RegisterUser } from "@/app/_lib/actions";

export default function RegisterForm() {
  const [status, setStatus] = useState({ success: null, message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Ensure passwords match
    if (formData.get("password") !== formData.get("confirm-password")) {
      setStatus({ success: false, message: "Passwords do not match." });
      return;
    }

    // Call the register function
    const response = await RegisterUser(formData);

    if (response.error) {
      setStatus({ success: false, message: response.error.message });
    } else {
      setStatus({ success: true, message: response.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h1 className="text-xl font-bold mb-8 text-center text-gray-900">
            Create Your Account
          </h1>

          {status.message && (
            <div
              className={`mb-4 text-center p-3 rounded-lg ${
                status.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="fullName"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium mt-6"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              href="login"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
