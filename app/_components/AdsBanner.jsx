"use client";
import React from "react";

const AdsBanner = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const currentAd = products[0];

  return (
    <div className="w-full h-32">
      <a
        href={currentAd?.ad_link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="h-full bg-gray-100 border border-gray-300 rounded-lg shadow-md flex items-center p-3 gap-3">
          {/* Image Container - Fixed size */}
          <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
            {currentAd?.ad_image ? (
              <img
                src={currentAd.ad_image}
                alt={currentAd.ad_title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-xs">No Image</p>
              </div>
            )}
          </div>

          {/* Text Container - Flexible width with ellipsis */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700 ">
              {currentAd?.ad_title.slice(0, 40) + "..." || "Untitled Ad"}
            </p>
            <p className="text-xs text-gray-500 line-clamp-2 mt-2">
              {currentAd?.ad_description || "Limited-time offer"}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default AdsBanner;
