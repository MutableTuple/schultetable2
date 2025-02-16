"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "../_lib/data-service";
import countries from "world-countries"; // Import country data

export default function ProfilePage({ fetched_user }) {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: fetched_user[0]?.name || "",
    social_link: fetched_user[0]?.social_link || "",
    email: fetched_user[0]?.email || "",
    bio: fetched_user[0]?.bio || "",
    nationality: fetched_user[0]?.nationality || "", // This should store only country code (e.g., "US", "IN")
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Format country data
  const countryList = countries.map((country) => ({
    code: country.cca2, // Store country code (ISO Alpha-2)
    name: country.name.common,
    flag: country.flag,
  }));

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updatedData = await updateProfile(
        profile.name,
        profile.social_link,
        profile.bio,
        profile.nationality, // Send only country code
        fetched_user[0].id
      );

      if (updatedData) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile. Try again.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Edit Profile
        </h2>
        {message && (
          <p className="text-center text-sm font-medium text-green-600 mt-2">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Social Link
            </label>
            <input
              type="url"
              name="social_link"
              value={profile.social_link}
              onChange={handleChange}
              placeholder="Enter your social link"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={profile.email}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
            ></textarea>
          </div>

          {/* Nationality Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium">
              Nationality
            </label>
            <select
              name="nationality"
              value={profile.nationality}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select your nationality</option>
              {countryList.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full mt-4 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all"
        >
          &larr; Go Back
        </button>
      </div>
    </div>
  );
}
