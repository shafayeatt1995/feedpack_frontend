import React from "react";
import { buttonVariants } from "../../components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Customer() {
  return (
    <div className="container mx-auto my-20">
      <div className="max-w-5xl rounded-3xl md:bg-gradient mx-auto md:text-white md:p-12 p-2">
        <h2 className="md:text-5xl text-3xl text-center font-black">
          Get more customers today
        </h2>
        <p className="text-center md:my-8 md:text-lg">
          {`Don't`} let your visitors leave without taking action.
        </p>
        <div className="flex justify-center pt-10">
          <Link
            href="/#pricing"
            className={`${cn(
              buttonVariants({ variant: "white", size: "lgt" })
            )} text-lg font-bold py-7 px-12 hidden md:flex`}
          >
            Get FeedPack <ChevronRightIcon />
          </Link>
          <Link
            href="/#pricing"
            className={`${cn(
              buttonVariants({ variant: "indigo", size: "lgt" })
            )} text-lg font-bold py-7 px-12 md:hidden`}
          >
            Get FeedPack <ChevronRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
