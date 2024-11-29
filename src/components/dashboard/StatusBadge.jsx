import React from "react";

export default function StatusBadge({ status }) {
  return (
    <>
      {status === "researching" && (
        <span className="bg-sky-100 text-sky-500 text-sm px-3 rounded-xl ml-1">
          Researching
        </span>
      )}
      {status === "planning" && (
        <span className="bg-blue-100 text-blue-500 text-sm px-3 rounded-xl ml-1">
          Planning
        </span>
      )}
      {status === "in_progress" && (
        <span className="bg-purple-100 text-purple-500 text-sm px-3 rounded-xl ml-1">
          In Progress
        </span>
      )}
      {status === "beta" && (
        <span className="bg-amber-100 text-amber-500 text-sm px-3 rounded-xl ml-1">
          Beta
        </span>
      )}
      {status === "on_hold" && (
        <span className="bg-orange-100 text-orange-500 text-sm px-3 rounded-xl ml-1">
          On Hold
        </span>
      )}
      {status === "fixed" && (
        <span className="bg-lime-100 text-lime-500 text-sm px-3 rounded-xl ml-1">
          Fixed
        </span>
      )}
      {status === "complete" && (
        <span className="bg-green-100 text-green-500 text-sm px-3 rounded-xl ml-1">
          Completed
        </span>
      )}
      {status === "cancel" && (
        <span className="bg-rose-100 text-rose-500 text-sm px-3 rounded-xl ml-1">
          Canceled
        </span>
      )}
    </>
  );
}
