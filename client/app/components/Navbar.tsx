"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  };

  return (
    <div className="min-w-full flex items-center justify-between px-8 py-[7.5px] border-b-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)]">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src="/LeaveFlow.png"
            alt="logo"
            width={32}
            height={32}
          />
          <h1 className="text-[#5A67BA] text-[13px] font-bold font-[family-name:var(--font-poppins)]">
            LeaveFlow
          </h1>
        </div>
      </Link>

      <div className="flex items-center justify-center gap-2 py-1">
        <div className="flex items-center justify-center gap-1">
          <Link
            href="/"
            className={`text-[13px] text-[#5A67BA] font-medium px-7 py-2 rounded-md ${
          pathname === "/" ? "bg-[#707FDD] bg-opacity-10" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/leave-history"
            className={`text-[13px] text-[#5A67BA] font-medium px-7 py-2 rounded-md ${
          pathname === "/leave-history" ? "bg-[#707FDD] bg-opacity-10" : ""}`}
          >
            Leave History
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative overflow-visible flex flex-col items-center justify-center">
            <div className="flex items-center gap-1">
              <CgProfile className="text-[35px] text-[#5A67BA]" />
              <button onClick={handleClick}>
                {toggle ? (
                  <IoMdArrowDropup className="text-md text-black" />
                ) : (
                  <IoMdArrowDropdown className="text-md text-black" />
                )}
              </button>
            </div>
            <button
              onClick={logOut}
              className={`${
                toggle ? "solid" : "hidden"
              } absolute text-nowrap top-[140%] p-2 bg-gray-300 rounded-md`}
            >
              <Link href="/login">Log out</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
