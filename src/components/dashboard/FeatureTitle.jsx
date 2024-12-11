"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "../ui/button";
import { CopyIcon, SquareArrowOutUpRightIcon, Undo2Icon } from "lucide-react";
import BoardDelete from "./BoardDelete";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function FeatureTitle({ board, publicBoard = false }) {
  const copyUrl = () => {
    navigator.clipboard.writeText(
      window.location.origin + `/board/${board?.slug}`
    );
  };
  return (
    <div className="pt-5 flex flex-col md:flex-row justify-between mb-3 md:items-center gap-5 px-2 md:px-0">
      <div className="flex items-center gap-4">
        <Link
          className="text-2xl font-bold flex items-center gap-2"
          href={`/board/${board?.slug}`}
          target="_blank"
        >
          {board?.name} <SquareArrowOutUpRightIcon size={20} strokeWidth={3} />
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={copyUrl}>
                <CopyIcon size={20} strokeWidth={3} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy board url</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {!publicBoard && (
        <div className="flex gap-2">
          <Link
            href="/dashboard"
            className={`${cn(
              buttonVariants({ variant: "indigo" })
            )} w-full md:w-auto`}
          >
            <Undo2Icon /> Back
          </Link>
          <BoardDelete />
        </div>
      )}
    </div>
  );
}
