"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import DemoFeedback from "./DemoFeedback";

export default function Usecase() {
  const [show, setShow] = useState(true);
  const [text, setText] = useState("Notifications...");
  const demoFeedbacks = [
    {
      title: `Add LemonSqueezy integration to the boilerplate`,
      description: `Yes, ship this! ✅`,
      vote: 48,
    },
    {
      title: `A new pricing table for metered billing`,
      description: `Maybe ship this 🤔`,
      vote: 12,
    },
    {
      title: `A new Ul library for the dashboard`,
      description: `But don't ship that ❌`,
      vote: 1,
    },
  ];

  const showFullText = () => {
    if (show) {
      setShow(false);
      const fulltext =
        "Notifications should be visible only on certain pages. Terms & privacy pages don't need them";
      for (let i = 0; i < fulltext.length; i++) {
        setTimeout(() => {
          setText(fulltext.slice(0, i + 1));
        }, 30 * i);
      }
    }
  };
  return (
    <div className="container mx-auto my-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="group text-center md:text-6xl text-4xl font-black leading-10">
          <span>Ship features users </span>
          <span className="border-b-4 md:border-b-8 border-indigo-200 border-dashed group-hover:border-indigo-500 duration-200 transition-all">
            (really)
          </span>
          <span> want </span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-10 pt-14">
        <div
          className="bg-gradient p-5 md:rounded-xl md:max-w-96 md:w-96 overflow-hidden"
          onMouseEnter={() => showFullText()}
        >
          <h3 className="text-white font-black text-3xl">
            Collect user feedback
          </h3>
          <p className="text-white">
            Use your Insighto's board to let users submit features they want.
          </p>
          <div
            className={`p-5 mt-7 bg-gray-100 rounded-xl transition-all duration-300 ${
              show
                ? "translate-x-8 translate-y-11"
                : "translate-x-0 translate-y-0"
            }`}
          >
            <p className="text-gray-700 pb-2">Suggest a feature</p>
            <div className="bg-white rounded-xl mt-2 p-3">
              <p className="min-h-20">{text}</p>
              <div className="flex justify-end">
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 col-span-2 flex-grow md:rounded-xl p-5 group">
          <h2 className="text-3xl font-black text-white">
            Prioritize features
          </h2>
          <p className="text-white">
            Users upvote features they want. You know what to ship next.
          </p>
          <div className="mt-5 lg:pr-32 h-64 overflow-hidden flex flex-col gap-4">
            {demoFeedbacks.map((val, i) => (
              <DemoFeedback
                key={i}
                feedback={val}
                vote={i === 0}
                className={`${
                  i === 0 ? "group-hover:-mt-28" : ""
                } transition-all duration-200`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
