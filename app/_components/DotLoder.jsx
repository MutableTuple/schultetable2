import React from "react";

export default function DotLoader() {
  return (
    <div className="flex space-x-1 justify-center items-center">
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "200ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "400ms" }}
      ></div>
    </div>
  );
}
