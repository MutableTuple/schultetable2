"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import Buttons from "./Buttons";
import Sidebar from "./Sidebar";
import { supabase } from "../_lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default function SchulteBoard({ session }) {
  // Get user data if session exists
  const user_id = session?.user?.value
    ? JSON.parse(session.user.value)?.identities?.[0]?.id
    : null;

  const [gridSize, setGridSize] = useState(4);
  const [difficulty, setDifficulty] = useState("Easy");
  const [gameId, setGameId] = useState(null);
  const [totalWrongClicks, setTotalWrongClicks] = useState(0);
  const [totalRightClicks, setTotalRightClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [clickedNumbers, setClickedNumbers] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [lastButtonRef, setLastButtonRef] = useState(null);
  const [firstClickMade, setFirstClickMade] = useState(false);
  const totalButtons = gridSize * gridSize;

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  // Handle page refresh/unload - only for logged-in users
  useEffect(() => {
    if (!user_id) return;

    const handleBeforeUnload = async () => {
      if (gameId && !firstClickMade) {
        await supabase.from("SingleGameStat").delete().eq("id", gameId);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [gameId, firstClickMade, user_id]);

  const getRange = () => {
    switch (difficulty) {
      case "Medium":
        return [50, 100];
      case "Hard":
        return [100, 500];
      case "God":
        return [500, 1000];
      default:
        return [1, 50];
    }
  };
  const getButtonSizeClass = () => {
    switch (gridSize) {
      case 3:
        return "w-16 h-16 md:w-16 md:h-16 text-md";
      case 4:
        return "w-16 h-16  md:w-16 md:h-16 text-lg";
      case 5:
        return "w-14 h-14 md:w-16 md:h-16 text-base";
      case 6:
        return "w-12 h-12  md:w-16 md:h-16 text-sm";
      default:
        return "w-10 h-10 md:w-16 md:h-16 text-xs"; // For larger grids
    }
  };
  const getGridGapClass = () => {
    if (gridSize <= 4) return "gap-3";
    if (gridSize === 5) return "gap-2";
    return "gap-1";
  };
  const generateNumbers = () => {
    const [min, max] = getRange();
    const numbers = new Set();
    while (numbers.size < totalButtons) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const shuffledNumbers = [...sortedNumbers].sort(() => Math.random() - 0.5);
    return { shuffledNumbers, sortedNumbers };
  };

  const [{ shuffledNumbers, sortedNumbers }, setNumbers] =
    useState(generateNumbers);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    resetGame();
  }, [gridSize, difficulty]);

  const resetGame = () => {
    const newNumbers = generateNumbers();
    setNumbers(newNumbers);
    setCurrentIndex(0);
    setGameStarted(false);
    setElapsedTime(0);
    setClickedNumbers({});
    setTotalRightClicks(0);
    setTotalWrongClicks(0);
    setIsExploding(false);
    setGameId(null);
    setFirstClickMade(false);
  };

  const createGameEntry = async () => {
    resetGame();
    const newNumbers = generateNumbers();
    setNumbers(newNumbers);

    if (user_id) {
      const newGameId = uuidv4();
      setGameId(newGameId);
    }

    setStartTime(Date.now());
    setGameStarted(true);
  };

  const handleClick = async (num, buttonRef) => {
    if (!gameStarted) return;

    if (!firstClickMade && user_id && gameId) {
      setFirstClickMade(true);
      const { error } = await supabase.from("SingleGameStat").insert([
        {
          id: gameId,
          user: user_id,
          grid_size: gridSize,
          difficulty: difficulty,
          total_wrong_click: 0,
          total_right_click: 0,
          time_taken: 0,
        },
      ]);
      if (error) console.error("Error creating game entry:", error);
    }

    if (num === sortedNumbers[currentIndex]) {
      setClickedNumbers((prev) => ({ ...prev, [num]: "correct" }));
      setCurrentIndex((prev) => prev + 1);
      setTotalRightClicks((prev) => {
        const newCount = prev + 1;
        if (user_id) updateGameStats({ rightClicks: newCount });
        return newCount;
      });

      if (currentIndex === sortedNumbers.length - 1) {
        setLastButtonRef(buttonRef);
        setIsExploding(true);
        setGameStarted(false);
        const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        setElapsedTime(finalTime);

        if (user_id) {
          const finalScore = calculateScore(
            difficulty,
            finalTime,
            totalWrongClicks
          );
          await updateGameStats({ time: finalTime, score: finalScore });
          await updateUserScore(finalScore);
        }
      }
    } else {
      setClickedNumbers((prev) => ({ ...prev, [num]: "wrong" }));
      setTotalWrongClicks((prev) => {
        const newCount = prev + 1;
        if (user_id) updateGameStats({ wrongClicks: newCount });
        return newCount;
      });
    }
  };

  // Function to calculate score
  const calculateScore = (difficulty, timeTaken, wrongClicks) => {
    let baseScore = 0;

    switch (difficulty) {
      case "Medium":
        baseScore = 2000;
        break;
      case "Hard":
        baseScore = 3000;
        break;
      case "God":
        baseScore = 5000;
        break;
      default:
        baseScore = 1000;
    }

    let score = baseScore - timeTaken * 5 - wrongClicks * 50;
    return Math.max(score, 0); // Ensure score is not negative
  };

  // Function to update user score
  const updateUserScore = async (score) => {
    if (!user_id) return;

    const { data, error } = await supabase
      .from("User")
      .select("score")
      .eq("id", user_id)
      .single();

    if (error) {
      console.error("Error fetching user score:", error);
      return;
    }

    const updatedScore = (data?.score || 0) + score;

    await supabase
      .from("User")
      .update({ score: updatedScore })
      .eq("id", user_id);
  };

  // Function to update game stats
  const updateGameStats = async ({ rightClicks, wrongClicks, time, score }) => {
    if (!gameId || !user_id) return;

    const updates = {};
    if (rightClicks !== undefined) updates.total_right_click = rightClicks;
    if (wrongClicks !== undefined) updates.total_wrong_click = wrongClicks;
    if (time !== undefined) updates.time_taken = time;
    if (score !== undefined) updates.score = score;

    const { error } = await supabase
      .from("SingleGameStat")
      .update(updates)
      .eq("id", gameId);

    if (error) console.error("Error updating game stats:", error);
  };

  const getCurrentNumberToFind = () => {
    if (!gameStarted) return null;
    if (currentIndex >= sortedNumbers.length) return null;
    return sortedNumbers[currentIndex];
  };

  return (
    <div className="min-h-screen grid md:grid-cols-8 grid-cols-1 ">
      <div className="col-span-5 flex flex-col items-center justify-center h-screen text-center overflow-hidden md:p-4 p-0">
        <h1 className="mb-4 text-xl font-bold">
          {gameStarted
            ? getCurrentNumberToFind()
              ? `Find: ${getCurrentNumberToFind()}`
              : "Game Complete!"
            : elapsedTime > 0
            ? `Game Over! Time: ${elapsedTime}s`
            : "Click Start to Begin"}
        </h1>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={createGameEntry}
            disabled={gameStarted}
            className={`px-4 py-2 rounded ${
              gameStarted ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            Start
          </button>
        </div>

        <div
          className={`grid ${getGridGapClass()} mt-4 max-w-[90vw] md:max-w-[70vh]`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {shuffledNumbers.map((num) => (
            <button
              key={num}
              onClick={(e) => handleClick(num, e.currentTarget)}
              className={`relative ${getButtonSizeClass()}`}
            >
              <Buttons value={num} size={gridSize} />
              {num === sortedNumbers[sortedNumbers.length - 1] && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Confetti active={isExploding} config={confettiConfig} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-3 border-l border-dashed border-stone-300">
        <Sidebar
          setGridSize={setGridSize}
          setDifficulty={setDifficulty}
          gameStarted={gameStarted}
        />
      </div>
    </div>
  );
}
