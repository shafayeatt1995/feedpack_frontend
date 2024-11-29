import React from "react";

export default function layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh_-_72px)]">{children}</div>
  );
}
