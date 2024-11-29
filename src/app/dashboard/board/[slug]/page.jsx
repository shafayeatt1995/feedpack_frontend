import BoardDelete from "@/components/dashboard/BoardDelete";
import FeatureForm from "@/components/dashboard/FeatureForm";
import FeatureTitle from "@/components/dashboard/FeatureTitle";
import FeedbackList from "@/components/dashboard/FeedbackList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userApi } from "@/server";
import { SquareArrowOutUpRightIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { board } = await userApi.getBoard({ slug });
  return {
    title: `${board?.name} board - Feedback`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { board } = await userApi.getBoard({ slug });

  return (
    <div className="container mx-auto">
      <div>
        <FeatureTitle board={board} />
        <div className="flex flex-col lg:flex-row gap-10 pb-5 px-2 lg:px-0">
          <FeatureForm board={board} />
          <FeedbackList board={board} />
        </div>
      </div>
    </div>
  );
}
