"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-full bg-blue-500 ">
      <div>
        <Link
          className="text-base hover:bg-green-500 rounded-full"
          href="/home"
        >
          Home
        </Link>
        <Link
          className="text-base  hover:bg-green-500 rounded-full"
          href="/createpost"
        >
          Createpost
        </Link>
        <Link
          className="text-base  hover:bg-green-500 rounded-full"
          href="/likedblogs"
        >
          LikedBlogs
        </Link>
      </div>
    </div>
  );
}
