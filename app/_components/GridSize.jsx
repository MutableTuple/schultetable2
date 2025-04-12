import React, { useState } from "react";
import Titles from "./Titles";

export default function GridSize({ setGridSize, disabled }) {
  const [customSize, setCustomSize] = useState("");
  const [selectedSize, setSelectedSize] = useState(3); // Default grid size

  const sizes = [3, 4, 5, 6, 7];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setGridSize(size);
    setCustomSize(""); // Reset custom input when selecting a preset
  };

  const handleCustomChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 3 && value <= 10) {
      setSelectedSize(value);
      setGridSize(value);
      setCustomSize(value);
    }
  };

  return (
    <div>
      <Titles>Grid size</Titles>
      <div className="flex flex-col items-center">
        <div className="flex justify-between min-w-full flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              disabled={disabled}
              className={`px-4 py-2 bg-[#ffde59] border-[4px] border-black box-border 
            shadow-[4px_4px_0px_0px_black] pixelated text-lg font-bold 
            hover:bg-[#ffde59]/70 cursor-pointer hover:-translate-y-1 ${
              selectedSize === size ? "bg-blue-500 text-white" : ""
            }`}
            >
              {size}x{size}
            </button>
          ))}
          {/* Custom Input */}
          {/* <input
            type="number"
            min="3"
            max="10"
            placeholder="Custom"
            value={customSize}
            onChange={handleCustomChange}
            className="w-20 px-2 py-1 text-center bg-[#ffde59] border-[4px] border-black box-border 
          shadow-[4px_4px_0px_0px_black] pixelated font-bold outline-none 
          hover:bg-[#ffde59]/70 cursor-pointer hover:-translate-y-1"
          /> */}
        </div>
      </div>
    </div>
  );
}
