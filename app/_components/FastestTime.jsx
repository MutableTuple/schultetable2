"use client";
import React, { useEffect, useState } from "react";
import { getFastestTimeForGame, fetchUserFromDB } from "../_lib/data-service";
import DotLoader from "./DotLoder";

export default function FastestTime({ grid_size, difficulty }) {
  const [fastest, setFastest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchFastest() {
      setLoading(true);
      // Reset states when the dependencies change
      setFastest(null);
      setUsername(null);

      const result = await getFastestTimeForGame(String(grid_size), difficulty);
      console.log("Fastest result:", result);

      // If we get a valid result, set the fastest time
      if (result) {
        setFastest(result);

        // Fetch the username using the user_id from the fastest time result
        if (result.user) {
          try {
            const userData = await fetchUserFromDB(result.user);
            console.log("userdata", userData);
            if (userData && userData[0].name) {
              setUsername(userData[0].name);
            }
          } catch (error) {
            console.error("Error fetching username:", error);
          }
        }
      }
      setLoading(false);
    }

    fetchFastest();
  }, [grid_size, difficulty]);

  // Format time to display minutes if time is greater than 60 seconds
  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
    }
    return `${seconds}s`;
  };

  return (
    <>
      <div className="text-xs border rounded-md p-2 sm:text-base bg-stone-50">
        {loading ? (
          <DotLoader />
        ) : fastest ? (
          <div>
            <p>
              fastest ⏱️ <strong>{formatTime(fastest.time_taken)}</strong>
              {username && <span> ({username})</span>}
            </p>
          </div>
        ) : (
          <p>Not solved yet!</p>
        )}
      </div>
    </>
  );
}
