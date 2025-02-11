"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";
import Link from "next/link";
import { formatNumber } from "../utils/formatNumber";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from("User")
        .select("name, score, rank")
        .order("score", { ascending: false });

      if (error) {
        console.error("❌ Error fetching leaderboard:", error);
      } else {
        let updatedPlayers = data.map((player, index) => ({
          ...player,
          rank: player.score === 0 ? 0 : index + 1,
        }));

        setPlayers(updatedPlayers);
        setFilteredPlayers(updatedPlayers);

        const updates = updatedPlayers.map((player) => ({
          name: player.name,
          rank: player.rank,
        }));

        const { error: updateError } = await supabase
          .from("User")
          .upsert(updates, { onConflict: ["name"] });

        if (updateError) {
          console.error("❌ Error updating ranks:", updateError);
        }
      }
      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentPage(1);
  }, [searchQuery, players]);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-white text-black">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
        🏆 Leaderboard
      </h1>

      <input
        type="text"
        placeholder="Search players..."
        className="px-4 py-2 mb-4 w-full max-w-sm border rounded-lg shadow-sm text-black"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-lg sm:text-xl animate-pulse">Loading...</p>
      ) : (
        <div className="w-full max-w-xl bg-gray-100 text-black rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-md">
              <thead>
                <tr className="bg-gray-300 text-black">
                  <th className="py-2 px-4 sm:py-3 sm:px-6">Rank</th>
                  <th className="py-2 px-4 sm:py-3 sm:px-6">Player</th>
                  <th className="py-2 px-4 sm:py-3 sm:px-6">Score</th>
                </tr>
              </thead>
              <tbody>
                {currentPlayers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  currentPlayers.map((player, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                      } text-black`}
                    >
                      <td className="py-2 px-4 sm:py-3 sm:px-6 font-bold">
                        {player.score === 0 ? "N/A" : player.rank}
                      </td>
                      <td className="py-2 px-4 sm:py-3 sm:px-6">
                        {player.name}
                      </td>
                      <td className="py-2 px-4 sm:py-3 sm:px-6">
                        {formatNumber(player.score)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-4 py-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-black text-white rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-black">Page {currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(filteredPlayers.length / playersPerPage)
                    ? prev + 1
                    : prev
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredPlayers.length / playersPerPage)
              }
              className="px-3 py-1 bg-black text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg text-md sm:text-lg font-semibold hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
