"use client";
import { useState, useEffect } from "react";
import Titles from "./Titles";
import AdsBanner from "./AdsBanner";
import { getAllAds } from "@/app/_lib/data-service";

export default function Ads() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      try {
        const data = await getAllAds();
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, []);

  return (
    <div>
      <Titles>Sponsored</Titles>
      {loading ? (
        <SkeletonLoader />
      ) : ads.length > 0 ? (
        <AdsBanner products={ads} />
      ) : (
        <p>No ads available</p>
      )}
    </div>
  );
}

// ✅ Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-300 h-24 w-full rounded-lg"></div>
    </div>
  );
}
