"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { userApi } from "@/server";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import eventBus from "@/utils/event";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BoardForm() {
  const [name, setName] = useState("");
  const [userFeedback, setUserFeedback] = useState("true");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await userApi.createBoard({
        name,
        userFeedback: userFeedback === "true",
      });
      eventBus.emit("boardCreated");
      toast.success("Board created successfully");
      setName("");
      setUserFeedback("true");
    } catch (error) {
      const val = error?.error?.errors?.name?.msg;
      if (val) {
        toast.error(val);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="text">Board name</Label>
        <Input
          type="text"
          id="text"
          placeholder="Future unicorn Inc.🦄"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="text">User can added feedback</Label>
        <Select
          value={userFeedback}
          onValueChange={(value) => setUserFeedback(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Enable</SelectItem>
              <SelectItem value="false">Disabled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full mt-5" disabled={loading} type="submit">
        {loading && <Loader2Icon className="animate-spin" />}
        {loading ? "Creating..." : "Create board"}
      </Button>
    </form>
  );
}
