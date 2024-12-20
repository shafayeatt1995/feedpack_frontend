"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { userApi } from "@/server";
import { toast } from "sonner";
import eventBus from "@/utils/event";
import { authUser } from "@/services/nextAuth";

export default function FeatureForm({ board, publicBoard = false }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [permission, setPermission] = useState(false);

  const handleCreateFeedback = async (e) => {
    try {
      e.preventDefault();
      const user = await authUser();
      if (user) {
        setCreateLoading(true);
        await userApi.createFeedback({
          boardID: board._id,
          title,
          description,
        });
        setTitle("");
        setDescription("");
        toast.success("Feedback created successfully");
        eventBus.emit("feedbackCreated");
      } else {
        eventBus.emit("loginModal");
      }
    } catch (error) {
      if (error?.error?.errors) {
        const errors = Object.values(error.error.errors);
        errors.map((err) => toast.error(err.msg || "Something went wrong"));
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const editable = useCallback(() => {
    if (!publicBoard) {
      setPermission(true);
      return;
    }
    setPermission(board?.userFeedback);
  }, [publicBoard, board?.userFeedback]);

  useEffect(() => {
    editable();
  }, [editable]);

  return (
    <div className="lg:min-w-96 lg:w-96">
      <form
        className="bg-white rounded-xl p-5 sticky top-5"
        onSubmit={handleCreateFeedback}
      >
        <h2 className="text-xl font-black mb-8">Suggest a feature</h2>
        <div className="grid w-full items-center gap-1 mb-5">
          <Label htmlFor="title">Descriptive title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!permission}
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">Short description</Label>
            <p className="text-xs text-gray-500">{description.length}/500</p>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Type your description here."
              id="description"
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              disabled={!permission}
            />
          </div>
        </div>
        <Button
          className="w-full mt-3"
          disabled={createLoading || !permission}
          type="submit"
        >
          {createLoading && <Loader2Icon className="animate-spin text-white" />}
          Create feedback
        </Button>
      </form>
    </div>
  );
}
