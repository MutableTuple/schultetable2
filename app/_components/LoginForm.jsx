"use client";

import { Login } from "@/app/_lib/actions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.target);
    const { user, session, error } = await Login(formData);

    if (error) {
      setError(error);
      return;
    }

    setSuccess("Login successful!");
    setTimeout(() => {
      router.push("/"); // Redirect to home after login
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Welcome Back
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium mt-6"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              href="register"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
