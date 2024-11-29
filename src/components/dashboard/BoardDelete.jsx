"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { userApi } from "@/server";
import { toast } from "sonner";

export default function BoardDelete() {
  const router = useRouter();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      if (!confirm("Are you sure you want to delete this board?")) return;
      setLoading(true);
      await userApi.deleteBoard({ slug });
      toast.success("Board deleted successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlineDanger"
      onClick={() => handleDelete(slug)}
      disabled={loading}
      className="w-full md:w-auto"
    >
      {loading && <Loader2Icon className="animate-spin" />}
      <Trash2Icon />
      Delete
    </Button>
  );
}
