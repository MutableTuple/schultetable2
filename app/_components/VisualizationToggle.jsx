import React from "react";

export default function VisualizationToggle({
  visualization,
  setVisualization,
  disabled,
}) {
  return (
    <div className="flex items-center gap-3 ">
      <span className="text-sm font-bold text-gray-800">Visuals</span>
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={visualization}
          onChange={() => setVisualization((prev) => !prev)}
          className="hidden"
          disabled={disabled}
        />
        <div
          className={`w-6 h-6 border-2 border-gray-800 bg-gray-300 pixelated flex items-center justify-center 
          ${
            visualization
              ? "bg-blue-500 border-blue-800"
              : "bg-gray-300 border-gray-800"
          }`}
        >
          {visualization && (
            <div className="w-3 h-3 bg-white border-2 border-gray-900"></div>
          )}
        </div>
      </label>
    </div>
  );
}
