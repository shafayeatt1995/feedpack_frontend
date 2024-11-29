"use client";
import { userApi } from "@/server";
import eventBus from "@/utils/event";
import { ClipboardIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function BoardItems() {
  const loaded = useRef(false);
  const page = useRef(1);
  const limit = useRef(24);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  const boardCreated = useCallback(async () => {
    loaded.current = false;
    page.current = 1;
    setBoards([]);
    await fetchBoards();
  }, []);
  const fetchBoards = async () => {
    if (loaded.current) return;
    try {
      setLoading(true);
      const { boards } = await userApi.getBoards({
        page: page.current,
        limit: limit.current,
      });
      setBoards((prev) => [...prev, ...boards]);
      loaded.current = boards.length === 0 || boards.length !== limit.current;
      page.current++;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    eventBus.on("boardCreated", boardCreated);
    fetchBoards();
    return () => eventBus.off("boardCreated", boardCreated);
  }, [boardCreated]);

  return (
    <>
      <p className="text-4xl font-bold">{boards.length} Boards</p>
      {boards.length ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5">
          {boards.map((board) => (
            <Link
              href={`/dashboard/board/${board.slug}`}
              className="flex bg-white p-4 rounded-xl text-xl font-bold hover:bg-indigo-500 hover:text-white transition-all duration-200"
              key={board._id}
            >
              <span className="break-all">{board.name}</span>
            </Link>
          ))}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <LoaderCircleIcon
            size={48}
            strokeWidth={3}
            className="animate-spin text-indigo-500"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-600">
          <ClipboardIcon size={150} />
          <p className="text-center ">No boards found</p>
        </div>
      )}
    </>
  );
}
