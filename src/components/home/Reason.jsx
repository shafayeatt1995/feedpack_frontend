import Image from "next/image";
import React from "react";

export default function Reason() {
  return (
    <div className="bg-gradient text-white my-20">
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center">
          <h2 className="lg:text-5xl md:text-4xl text-2xl text-center font-black max-w-4xl px-2">
            80% of startups fail because founders investing time and money to
            building useless products
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-16">
          <div className="flex flex-col items-center max-w-44">
            <p className="text-5xl">🤩</p>
            <p className="text-center md:text-2xl font-bold">
              Launching new feature
            </p>
          </div>
          <Image
            src="/icons/arrow-right.svg"
            alt="arrow"
            width={56}
            height={56}
            className="md:-rotate-90"
          />
          <div className="flex flex-col items-center max-w-44 ">
            <p className="text-5xl">🫤</p>
            <p className="text-center md:text-2xl font-bold">
              But nothing happens
            </p>
          </div>
          <Image
            src="/icons/arrow-right.svg"
            alt="arrow"
            width={56}
            height={56}
            className="md:-rotate-90 -scale-x-100"
          />
          <div className="flex flex-col items-center max-w-56">
            <p className="text-5xl">😔</p>
            <p className="text-center md:text-2xl font-bold">
              Lose motivation and quit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
