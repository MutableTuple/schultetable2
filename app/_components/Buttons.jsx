import React from "react";

const Buttons = ({ value, size }) => {
  // Get font size based on grid size and number length
  const getFontSizeClass = () => {
    const numLength = value.toString().length;

    if (size <= 4) {
      return numLength > 2 ? "text-lg" : "text-xl";
    }
    if (size === 5) {
      return numLength > 2 ? "text-sm" : "text-base";
    }
    return numLength > 2 ? "text-xs" : "text-sm";
  };

  return (
    <div
      className={`
        bg-[#ffde59] border-[4px] border-black box-border 
        shadow-[4px_4px_0px_0px_black] pixelated
        hover:bg-[#ffde59]/70 cursor-pointer hover:-translate-y-1
        flex items-center justify-center
        transition-all duration-200
        w-full h-full
        ${getFontSizeClass()}
        font-bold
      `}
    >
      {value}
    </div>
  );
};

export default Buttons;
