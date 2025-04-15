import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineNotification } from "react-icons/ai";

export default function UserNotifLogin({ user_id }) {
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem("userNotifClosedAt");
    if (!lastClosed || Date.now() - parseInt(lastClosed) > 8 * 60 * 60 * 1000) {
      setShowNotif(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("userNotifClosedAt", Date.now().toString());
    setShowNotif(false);
  };

  if (!showNotif || user_id) return null;

  return (
    <div className="bg-green-200 text-green-700 px-3 py-2 mx-4 my-3 rounded-md flex items-center justify-between text-xs sm:text-sm lg:text-base">
      <div className="flex items-center gap-2">
        <Link href="/login" className="hover:underline sm:w-96">
          you need to be logged in to get on the leaderboard & set fastest score
          record on games!
        </Link>
      </div>
      <button onClick={handleClose}>
        <AiOutlineClose className="text-green-600 hover:text-green-800 text-sm sm:text-base" />
      </button>
    </div>
  );
}
