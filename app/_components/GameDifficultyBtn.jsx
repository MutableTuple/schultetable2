"use client";
import React, { useState } from "react";
import Titles from "./Titles";

export default function GameDifficultyBtn({ setDifficulty, disabled }) {
  const [selectedMode, setSelectedMode] = useState("Easy");

  const modes = ["Easy", "Medium", "Hard", "God"];

  const handleChange = (e) => {
    const mode = e.target.value;
    setSelectedMode(mode);
    setDifficulty(mode);
  };

  return (
    <div className="relative inline-block">
      <Titles>game difficulty</Titles>
      <select
        className={`w-full h-14 border-[4px] border-black shadow-[4px_4px_0px_0px_black] pixelated cursor-pointer text-center font-bold outline-none
          ${
            selectedMode !== "Easy"
              ? "bg-blue-500 text-white"
              : "bg-[#ffde59] hover:bg-[#ffde59]/70"
          }
        `}
        disabled={disabled}
        value={selectedMode}
        onChange={handleChange}
      >
        {modes.map((mode) => (
          <option
            key={mode}
            value={mode}
            className="bg-[#ffde59] text-black font-bold"
          >
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
}
