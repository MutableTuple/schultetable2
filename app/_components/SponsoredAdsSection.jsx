import React from "react";

const SponsoredAd = ({ size = "md", image, link, title }) => {
  const sizeClasses = {
    sm: "w-40 h-20 text-sm",
    md: "w-60 h-30 text-base",
    lg: "w-80 h-40 text-lg",
    xl: "w-96 h-48 text-xl",
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 ${sizeClasses[size]}`}
    >
      <img src={image} alt={title} className="w-full h-2/3 object-cover" />
      <div className="p-2 text-center font-semibold">{title}</div>
    </a>
  );
};

const SponsoredAdsSection = ({ ads, size }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {ads.map((ad, index) => (
        <SponsoredAd key={index} size={size} {...ad} />
      ))}
    </div>
  );
};

export default SponsoredAdsSection;
