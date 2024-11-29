import FeatureForm from "@/components/dashboard/FeatureForm";
import FeatureTitle from "@/components/dashboard/FeatureTitle";
import FeedbackList from "@/components/dashboard/FeedbackList";
import { commonApi } from "@/server";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { board } = await commonApi.getBoard({ slug });
  return {
    title: `${board?.name} board - Feedback`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { board } = await commonApi.getBoard({ slug });

  return (
    <div className="container mx-auto">
      <FeatureTitle board={board} publicBoard={true} />
      <div className="flex gap-10 pb-5">
        <FeatureForm board={board} publicBoard={true} />
        <FeedbackList board={board} publicBoard={true} />
      </div>
    </div>
  );
}
