"use client";
import { CircleCheckBigIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import GenerateUrl from "./GenerateUrl";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [pricing, setPricing] = useState([
    {
      price: 5,
      time: "Month",
      title: "Basic",
      subtitle: "A basic plan for beginners",
      features: [
        "1 board limit",
        "Unlimited feature requests",
        "Priority support",
      ],
    },
    {
      price: 9,
      time: "Month",
      title: "Premium",
      subtitle: "A premium plan for advance users",
      features: [
        "Unlimited board",
        "Unlimited feature requests",
        "Early access to new features",
        "Priority support",
      ],
    },
    {
      tag: "Best",
      price: 49,
      time: "Lifetime",
      title: "One Time Payment",
      subtitle: "First 49 members will get lifetime access",
      features: [
        "All Premium Features.",
        "Lifetime updates",
        "No subscription hassle",
      ],
      specialMessage: "Pay once. Access forever.",
    },
  ]);

  useEffect(() => {
    setPricing((prev) =>
      prev.map((p) =>
        annual
          ? p.price === 5
            ? { ...p, price: 50, time: "Year" }
            : p.price === 9
            ? { ...p, price: 90, time: "Year" }
            : p
          : p.price === 50
          ? { ...p, price: 5, time: "Month" }
          : p.price === 90
          ? { ...p, price: 9, time: "Month" }
          : p
      )
    );
  }, [annual]);

  return (
    <div className="container mx-auto md:my-20 my-12 px-2" id="pricing">
      <div className="max-w-2xl mx-auto">
        <h2 className="md:text-6xl text-5xl text-center font-black mt-5">
          Pricing
        </h2>
        <p className="text-center mt-3">
          🎊 First 100 members will get lifetime access 🎊
        </p>
        <div className="flex justify-center mt-5 gap-2">
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <p>{annual ? "Annualy" : "Monthly"}</p>
          <Badge>2 MONTHS FREE ✨</Badge>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-12 mx-auto">
        {pricing.map((price, i) => (
          <div
            className={`flex flex-col border-[3px] p-6 rounded-3xl relative ${
              price.tag ? "border-indigo-500" : ""
            }`}
            key={i}
          >
            {price.tag && (
              <div className="absolute  -top-[14px] left-0 right-0 text-center flex justify-center">
                <p className="bg-gradient text-sm text-white px-4 py-0.5 rounded-full uppercase">
                  {price.tag}
                </p>
              </div>
            )}
            <div className="mb-6 text-center">
              <h3 className="text-gray-800 text-3xl font-bold">
                <span className="text-6xl">${price.price}</span>
                <sub className="text-sm font-medium">USD/{price.time}</sub>
              </h3>
            </div>
            <h3 className="text-2xl font-bold mb-2">{price.title}</h3>
            <p>{price.subtitle}</p>
            <ul className="mt-6 space-y-4 flex-grow">
              {price.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CircleCheckBigIcon className="text-indigo-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              {price.specialMessage && (
                <p className="text-center mb-2">{price.specialMessage}</p>
              )}
              <GenerateUrl productName="main_course" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link href="/terms/#refund-policy" className="hover:underline">
          Check Refund Policy
        </Link>
      </div>
    </div>
  );
}
