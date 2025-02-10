"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from("SingleGameStat") // Replace with your actual table name
        .select("user, score")
        .order("score", { ascending: false }) // Sort by highest score
        .limit(10); // Get top 10 players

      if (error) {
        console.error("❌ Error fetching leaderboard:", error);
      } else {
        setPlayers(data);
      }
      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white text-black">
      <h1 className="text-4xl font-bold mb-6">🏆 Leaderboard</h1>

      {loading ? (
        <p className="text-xl animate-pulse">Loading...</p>
      ) : (
        <div className="w-full max-w-xl bg-gray-100 text-black rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-300 text-black">
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Player</th>
                <th className="py-3 px-6">Score</th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No scores available yet.
                  </td>
                </tr>
              ) : (
                players.map((player, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                    } text-black`}
                  >
                    <td className="py-3 px-6 font-bold">{index + 1}</td>
                    <td className="py-3 px-6">{player.user}</td>
                    <td className="py-3 px-6">{player.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
