import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import GameDifficultyBtn from "./GameDifficultyBtn";
import VisualizationToggle from "./VisualizationToggle";
import GridSize from "./GridSize";
import Ads from "./Ads";
import MiniNavBar from "./MiniNavBar";

const Sidebar = ({
  visualization,
  setVisualization,
  setGridSize,
  setDifficulty,
  gameStarted,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Only open if it's not mobile
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full">
      {/* Toggle Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <IoMdClose size={24} /> : <CiMenuBurger size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          transition-all duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${
            isMobile
              ? "fixed left-0 top-0 h-full z-40 bg-white shadow-lg"
              : "relative"
          }
          flex flex-col w-full
        `}
      >
        <div className="border-b-2 border-dashed px-8 py-4 w-full">
          <MiniNavBar />
        </div>
        <div className="flex flex-col gap-4 p-8  min-w-full">
          <GameDifficultyBtn
            setDifficulty={setDifficulty}
            disabled={gameStarted}
          />
          <GridSize setGridSize={setGridSize} disabled={gameStarted} />
          <Ads index={0} />
          <Ads index={1} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
