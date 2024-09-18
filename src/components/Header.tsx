"use client";

import { appName } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import icon from "@/resources/icons/favicon.ico";
import { useState, useRef } from "react";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const { y } = useScrollPosition();
  const preY = useRef(y);

  if (showHeader) {
    if (y > preY.current) setShowHeader(false);
  } else {
    if (y === 0 || y < preY.current) setShowHeader(true);
  }
  preY.current = y;

  return (
    <header
      id={`${appName}-header`}
      className="box-border w-full sticky px-[64px] py-[16px] flex justify-between flex-row z-10 [transition:0.3s] max-lg:p-[16px]"
      style={{
        ...(y !== 0
          ? { backgroundColor: "white", boxShadow: "2px 2px 7px #b0a0c0" }
          : {}),
        ...(showHeader ? { top: "0px" } : { top: "-100px" }),
      }}
    >
      <nav className="flex justify-between flex-row items-center gap-[10px]">
        <Link href="/">
          <Image
            title={appName}
            src={icon}
            width={50}
            height={50}
            alt="icon"
            className="[transition:0.2s] rounded"
            style={y === 0 ? { boxShadow: "2px 2px 7px #b0a0c0" } : undefined}
          />
        </Link>
        <Link href="/">{appName}</Link>
      </nav>
      <nav className="flex justify-between flex-row items-center gap-[30px]">
        <Link href="/" className="max-md:hidden">
          HOME
        </Link>
        <Link href="/tags">TAGS</Link>
        <Link href="/posts">POSTS</Link>
      </nav>
    </header>
  );
}
