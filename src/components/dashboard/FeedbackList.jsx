"use client";
import { commonApi, userApi } from "@/server";
import eventBus from "@/utils/event";
import { Loader2Icon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FeedbackCard from "./FeedbackCard";
import { toast } from "sonner";
import { authUser } from "@/services/nextAuth";

export default function FeedbackList({ board, publicBoard = false }) {
  const page = useRef(1);
  const limit = useRef(24);
  const loaded = useRef(false);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = useCallback(async () => {
    try {
      if (loaded.current) return;
      setFeedbackLoading(true);
      let items = [];
      const params = {
        _id: board._id,
        page: page.current,
        limit: limit.current,
      };
      const user = await authUser();
      if (publicBoard && !user) {
        const data = await commonApi.getFeedback(params);
        items = data.items;
      } else {
        const data = await userApi.getFeedback(params);
        items = data.items;
      }
      setFeedbacks((prev) => [...prev, ...items]);
      loaded.current = items.length === 0 || items.length !== limit.current;
      page.current++;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setFeedbackLoading(false);
    }
  }, [board, publicBoard]);
  const refetch = useCallback(() => {
    setFeedbacks([]);
    page.current = 1;
    loaded.current = false;
    fetchFeedback();
  }, [fetchFeedback]);
  const removeFeedback = useCallback((id) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback._id !== id));
  }, []);

  useEffect(() => {
    eventBus.on("feedbackCreated", refetch);
    eventBus.on("feedbackDeleted", removeFeedback);
    fetchFeedback();
    return () => {
      eventBus.off("feedbackCreated", refetch);
      eventBus.off("feedbackDeleted", removeFeedback);
    };
  }, [fetchFeedback, refetch, removeFeedback]);

  return (
    <div className="flex-grow">
      <div className="flex justify-center">
        {feedbackLoading ? (
          <Loader2Icon size={50} className="animate-spin text-indigo-500" />
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedbacks yet.</p>
        ) : (
          <div className="space-y-5 md:space-y-10 w-full">
            {feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback._id}
                feedback={feedback}
                publicBoard={publicBoard}
                board={board}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
