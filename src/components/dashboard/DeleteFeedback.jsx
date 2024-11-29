"use client";
import React from "react";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { userApi } from "@/server";
import { toast } from "sonner";
import eventBus from "@/utils/event";

export default function DeleteFeedback({ feedback }) {
  const deleteFeedback = async () => {
    try {
      if (!confirm("Are you sure you want to delete this feedback?")) return;
      await userApi.deleteFeedback({ _id: feedback._id });
      eventBus.emit("feedbackDeleted", feedback._id);
      toast.success("Feedback deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        deleteFeedback();
      }}
      variant="outlineDanger"
    >
      <Trash2Icon size={20} /> Delete
    </Button>
  );
}
