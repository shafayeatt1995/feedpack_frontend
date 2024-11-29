import { cn } from "@/lib/utils";
import { ArrowRightIcon, CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../../components/ui/button";
import DemoFeedback from "./DemoFeedback";
import Image from "next/image";

export default function Hero() {
  const messages = [
    "One-Time Payment, Lifetime Access.",
    "Easy and user friendly interface.",
    "Make your product better.",
    "Save time and money.",
  ];
  const demoFeedbacks = [
    {
      title: `PayPal integration`,
      description: `20% of users are asking for it, I need it to grow revenue.`,
      vote: 37,
    },
    {
      title: `Images should be smaller`,
      description: `They're cropped on mobile.`,
      vote: 12,
    },
    {
      title: `Dark mode`,
      description: `PS: I don't pay for your app`,
      vote: 1,
    },
  ];

  return (
    <div className="container mx-auto md:my-20 pb-10 pt-4 px-2 relative">
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="lg:pt-5">
          <h1 className="group xl:text-[58px] lg:leading-none lg:text-[44px] md:text-6xl text-center lg:text-left text-3xl font-black leading-10">
            <span>Focus on the features users </span>
            <span className="border-b-4 md:border-b-8 border-indigo-200 border-dashed group-hover:border-indigo-500 duration-200 transition-all">
              (really)
            </span>
            <span> want </span>
          </h1>
          <p className="md:text-lg mt-8 text-center lg:text-left">
            Collect feedback from your customers and build a product that users
            love.
          </p>
          <ul className="mt-10 space-y-2 flex flex-col items-center lg:items-start ">
            {messages.map((val) => (
              <li key={val} className="flex gap-2">
                <CircleCheckIcon className="text-indigo-500" /> {val}
              </li>
            ))}
          </ul>
          <div className="flex mt-5 lg:justify-start justify-center">
            <Link
              href="#pricing"
              className={`${cn(
                buttonVariants({ variant: "indigo", size: "lgt" })
              )} inline-block`}
            >
              Collect Feedback <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <div className="px-2">
          <div className="bg-gray-100 shadow-lg rounded-3xl md:p-5 p-3 pb-10 md:pb-10  relative">
            <div className="absolute top-5 xl:right-1/2 lg:right-1/3 md:right-1/2  right-1/4 inline-flex flex-col items-center">
              <p className="text-sm">Added this ✅</p>
              <Image
                src="/icons/arrow.svg"
                width={75}
                height={175}
                alt="arrow"
                className="w-4 rotate-180"
              />
            </div>
            <div className="absolute bottom-3 xl:right-1/2 lg:right-1/3 md:right-1/2 right-1/4 inline-flex flex-col items-center">
              <Image
                src="/icons/arrow.svg"
                width={75}
                height={175}
                alt="arrow"
                className="w-4 -scale-x-100 -rotate-6"
              />
              <p className="text-sm">Not that ❌</p>
            </div>
            <p className="text-gray-600">Latest feedback</p>
            <div className="mt-2 space-y-4">
              {demoFeedbacks.map((val, i) => (
                <DemoFeedback key={i} feedback={val} vote={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
