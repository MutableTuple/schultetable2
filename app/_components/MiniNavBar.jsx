import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function MiniNavBar() {
  return (
    <nav className="w-full bg-white ">
      <div className="flex justify-between items-center ">
        <div className="text-sm font-semibold">S.com</div>
        <div className="flex items-center gap-5 text-sm">
          <Link className="cursor-pointer" href={"/blog"}>
            Blogs
          </Link>
          <Link href={"/account"}>
            <FaUserCircle size={24} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
