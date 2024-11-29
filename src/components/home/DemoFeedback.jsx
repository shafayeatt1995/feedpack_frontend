"use client";
import { ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";

export default function DemoFeedback({
  feedback,
  vote = false,
  className = "",
}) {
  const [voted, setVoted] = useState(vote);
  return (
    <div className={`flex bg-white rounded-xl p-5 gap-1 ${className}`}>
      <div className="flex-grow">
        <h3 className="font-bold md:text-lg">{feedback.title}</h3>
        <p className="mt-2 text-gray-700">{feedback.description}</p>
      </div>
      <div>
        <button
          className={`border rounded-lg py-2 px-4 flex flex-col items-center group focus-visible:outline-none ${
            voted ? "bg-gradient text-white" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setVoted(!voted);
          }}
        >
          <ChevronUpIcon className="transition-all duration-200 group-hover:-translate-y-1" />
          {feedback.vote + (voted ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}
