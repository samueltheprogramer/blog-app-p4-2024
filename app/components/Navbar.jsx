import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-full bg-blue-500">
      <Link href="/home">Home</Link>
      <Link href="/createpost">createpost</Link>
    </div>
  );
}