import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "../ui/button";
import { SquareArrowOutUpRightIcon, Undo2Icon } from "lucide-react";
import BoardDelete from "./BoardDelete";
import Link from "next/link";

export default function FeatureTitle({ board, publicBoard = false }) {
  return (
    <div className="pt-5 flex justify-between mb-3 items-center">
      <Link
        className="text-2xl font-bold flex items-center gap-2"
        href={`/board/${board?.slug}`}
        target="_blank"
      >
        {board?.name} <SquareArrowOutUpRightIcon size={20} strokeWidth={3} />
      </Link>

      {!publicBoard && (
        <div className="flex gap-2">
          <Link
            href="/dashboard"
            className={`${cn(buttonVariants({ variant: "indigo" }))}`}
          >
            <Undo2Icon /> Back
          </Link>
          <BoardDelete />
        </div>
      )}
    </div>
  );
}
