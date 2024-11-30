"use client";
import { Select } from "@radix-ui/react-select";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronRightIcon,
  Loader2Icon,
  MessageSquareTextIcon,
} from "lucide-react";
import { commonApi, userApi } from "@/server";
import { toast } from "sonner";
import StatusBadge from "./StatusBadge";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import Vote from "./Vote";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FeedbackComment from "./FeedbackComment";
import DeleteFeedback from "./DeleteFeedback";
import { authUser } from "@/services/nextAuth";
import eventBus from "@/utils/event";
import { getItem, removeItem, setItem } from "@/utils";

export default function FeedbackCard({ feedback, publicBoard = false, board }) {
  const checkVote = getItem(feedback._id) === "voted";
  const statusOptions = [
    { value: "none", label: "None" },
    { value: "researching", label: "Researching" },
    { value: "planning", label: "Planning" },
    { value: "in_progress", label: "In Progress" },
    { value: "beta", label: "Beta" },
    { value: "on_hold", label: "On Hold" },
    { value: "fixed", label: "Fixed" },
    { value: "complete", label: "Completed" },
    { value: "cancel", label: "Canceled" },
  ];
  const page = useRef(1);
  const limit = useRef(24);
  const loaded = useRef(false);
  const commentLoaded = useRef(false);
  const [status, setStatus] = useState(feedback.status);
  const [voteCount, setVoteCount] = useState(feedback.voteCount);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(checkVote);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [commentLoadLoading, setCommentLoadLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [validUser, setValidUser] = useState(null);

  const toggleVote = async () => {
    try {
      const tVoted = getItem(feedback._id) === "voted";
      await commonApi.toggleFeedbackVote({ _id: feedback._id, voted: !tVoted });
      tVoted ? removeItem(feedback._id) : setItem(feedback._id, "voted");
      setVoteCount(voteCount + (tVoted ? -1 : 1));
      setVoted((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const openComments = async () => {
    try {
      setModal(true);
      if (!commentLoaded.current) {
        setCommentLoadLoading(true);
        let items = [];
        const params = {
          _id: feedback._id,
          page: page.current,
          limit: limit.current,
        };
        if (publicBoard) {
          const data = await commonApi.fetchFeedbackComments(params);
          items = data.items;
        } else {
          const data = await userApi.fetchFeedbackComments(params);
          items = data.items;
        }
        setComments((prev) => [...prev, ...items]);
        commentLoaded.current =
          items.length === 0 || items.length !== limit.current;
        page.current++;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setCommentLoadLoading(false);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const user = await authUser();
      if (!user) {
        eventBus.emit("loginModal");
        return;
      }
      setCommentLoading(true);
      const { item } = await userApi.addFeedbackComment({
        _id: feedback._id,
        message,
      });
      setComments((prev) => [item, ...prev]);
      setMessage("");
      toast.success("Comment added successfully");
    } catch (error) {
      if (error?.error?.errors) {
        const errors = Object.values(error.error.errors);
        errors.map((err) => toast.error(err.msg || "Something went wrong"));
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setCommentLoading(false);
    }
  };
  const deleteComment = async (_id) => {
    try {
      if (validUser) {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        await userApi.deleteFeedbackComment({ _id });
        setComments((prev) => prev.filter((c) => c._id !== _id));
        toast.success("Comment deleted successfully");
      } else {
        eventBus.emit("loginModal");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const setAuthUser = useCallback(async () => {
    try {
      const auth = await authUser();
      setValidUser(publicBoard || auth?._id === feedback.userID);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [feedback.userID, publicBoard]);

  useEffect(() => {
    setAuthUser();
  }, [setAuthUser]);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      return;
    }

    const updateStatus = async () => {
      try {
        setLoading(true);
        await userApi.updateFeedbackStatus({
          _id: feedback._id,
          status,
        });
        toast.success("Feedback status updated");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    updateStatus();
  }, [feedback._id, status]);

  return (
    <>
      {validUser && (
        <>
          <div
            className="bg-white rounded-xl p-5 w-full cursor-pointer"
            onClick={openComments}
          >
            {!publicBoard && (
              <div className="flex justify-between gap-5 mb-3">
                <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
                  {loading && (
                    <Loader2Icon
                      size={20}
                      className="animate-spin text-indigo-500"
                    />
                  )}
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
                    <SelectTrigger
                      className="md:w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statusOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <DeleteFeedback feedback={feedback} />
              </div>
            )}
            <div className="flex justify-between items-center gap-1">
              <p className="text-lg font-bold w-full">
                {feedback.title} <StatusBadge status={status} />
              </p>
              <div>
                <Vote
                  voted={voted}
                  voteCount={voteCount}
                  toggleVote={toggleVote}
                />
              </div>
            </div>
            <div className="flex mt-2">
              <div className="flex-grow flex flex-col justify-between">
                <p>{feedback.description}</p>
                <p className="flex gap-1 items-center text-gray-600 text-sm mt-3">
                  <MessageSquareTextIcon size={20} /> {feedback.commentCount}
                </p>
              </div>
            </div>
          </div>
          <Sheet open={modal} onOpenChange={setModal}>
            <SheetContent className="max-w-full w-full md:!max-w-2xl md:w-2xl flex flex-col">
              <SheetTitle>
                <div className="flex gap-2 items-center">
                  <Vote
                    voted={voted}
                    voteCount={voteCount}
                    toggleVote={toggleVote}
                  />
                  <span className="text-lg md:text-2xl font-bold flex items-center gap-1">
                    &quot;{feedback.title}&quot; comments
                  </span>
                </div>
                <form className="mt-2" onSubmit={addComment}>
                  <Textarea
                    placeholder="Add a comment"
                    disabled={commentLoading}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {message.length > 0 && (
                    <Button type="submit" className="w-full mt-2">
                      Add comment
                      {commentLoading ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </Button>
                  )}
                </form>
              </SheetTitle>

              <FeedbackComment
                comments={comments}
                commentLoadLoading={commentLoadLoading}
                deleteComment={deleteComment}
                board={board}
              />
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}
