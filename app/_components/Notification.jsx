"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const STORAGE_KEY = "notification-dismissed";
const STORAGE_TIMESTAMP_KEY = "notification-timestamp";

const Notification = ({ notifications }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Check localStorage and timestamp
    const isDismissed = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
    const currentTime = Date.now();

    // Reset if more than 3 days have passed
    if (
      !timestamp ||
      currentTime - parseInt(timestamp) > 3 * 24 * 60 * 60 * 1000
    ) {
      localStorage.removeItem(STORAGE_KEY);
    }

    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 12000;
    const interval = 10;
    const step = (100 * interval) / duration;

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(progressTimer);
          return 0;
        }
        return prevProgress - step;
      });
    }, interval);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
  };

  if (!isVisible) return null;
  if (!notifications.length > 0) {
    return;
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-blue-500 text-white shadow-lg">
        <div
          className="h-1 bg-white/30 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="font-medium">
            {notifications[0].message}{" "}
            <span className="text-stone-950  bg-white">
              <Link href="/register">start now!</Link>
            </span>{" "}
          </span>

          <button
            onClick={handleClose}
            className="p-1 hover:bg-blue-600 rounded-full transition-colors"
            aria-label="Close notification"
          >
            <IoMdCloseCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
