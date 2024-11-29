import BoardForm from "@/components/dashboard/BoardForm";
import BoardItems from "@/components/dashboard/BoardItems";
import React from "react";

export const metadata = {
  title: "Dashboard - Feedpack",
};

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row pt-10 lg:gap-10 gap-5 px-2">
        <div className="xl:min-w-96 xl:w-96 md:min-w-80 md:w-80 bg-white rounded-xl p-5">
          <h1 className="text-xl font-bold">
            Build features that your users{" "}
            <span className="bg-gradient text-white px-1">really</span> want
          </h1>
          <BoardForm />
        </div>
        <div className="flex-grow mb-5">
          <BoardItems />
        </div>
      </div>
    </div>
  );
}
