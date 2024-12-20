import { authUser } from "@/services/nextAuth";
import { dateFormat } from "@/utils";
import { Loader2Icon, MessageCircleMoreIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function FeedbackComment({
  comments,
  commentLoadLoading,
  deleteComment,
  board,
}) {
  const [user, setUser] = useState(null);

  const showDelete = useMemo(
    () => (i) =>
      user?.isAdmin ||
      user?._id === board?.userID ||
      user?._id === comments[i]?.userID,
    [comments, user, board]
  );

  useEffect(() => {
    const init = async () => {
      const user = await authUser();
      setUser(user);
    };
    init();
  }, []);

  return (
    <div className="flex-grow overflow-y-auto">
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <div key={comment._id} className="mb-6 space-y-1">
            <p className="whitespace-pre-wrap">{comment.message}</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Image
                  src={comment.userAvatar}
                  width={40}
                  height={40}
                  alt={comment.userName}
                  className="rounded-full"
                />
                <p className="ml-1">{comment.userName}</p>•
                <p>{dateFormat(comment.created_at)}</p>
              </div>
              {showDelete(i) && (
                <button onClick={() => deleteComment(comment._id)}>
                  <Trash2Icon size={20} className="text-rose-500" />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-600">
          <MessageCircleMoreIcon size={150} />
          <span className="text-center ">No comments found</span>
        </div>
      )}
      {commentLoadLoading && (
        <div className="flex items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
}
