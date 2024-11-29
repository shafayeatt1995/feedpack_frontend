"use client";
import { authUser } from "@/services/nextAuth";
import eventBus from "@/utils/event";
import { ChevronUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Vote({ voted, voteCount, toggleVote }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const user = await authUser();
      setUser(user);
    };
    init();
  }, []);

  return (
    <button
      className={`border rounded-lg py-2 px-4 flex flex-col items-center group focus-visible:outline-none ${
        voted ? "bg-gradient text-white" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        user ? toggleVote() : eventBus.emit("loginModal");
      }}
    >
      <ChevronUpIcon className="transition-all duration-200 group-hover:-translate-y-1" />
      {voteCount}
    </button>
  );
}
