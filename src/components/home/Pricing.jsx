"use client";
import {
  ChevronRightIcon,
  CircleCheckBigIcon,
  Loader2Icon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { initializePaddle } from "@paddle/paddle-js";
import { Button } from "../ui/button";
import { authUser } from "@/services/nextAuth";
import eventBus from "@/utils/event";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [paddle, setPaddle] = useState();
  const [loading, setLoading] = useState(false);
  const click = useRef(true);
  const [pricing, setPricing] = useState([
    {
      monthlyPrice: 5,
      yearlyPrice: 49,
      title: "Basic",
      subtitle: "A basic plan for beginners",
      features: [
        "1 board limit",
        "Unlimited feature requests",
        "Priority support",
      ],
    },
    {
      monthlyPrice: 9,
      yearlyPrice: 89,
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
      price: 99,
      time: "Lifetime",
      title: "One Time Payment",
      subtitle: "First 99 members will get lifetime access",
      features: [
        "All Premium Features.",
        "Lifetime updates",
        "No subscription hassle",
      ],
      specialMessage: "Pay once. Access forever.",
    },
  ]);
  const priceIDS = {
    5: { id: "pri_01jeax10xp2h5n3gfrm4wppq7n", package: "basicMonth" },
    9: { id: "pri_01jeax3pzkx703xhns991d979d", package: "premiumMonth" },
    99: { id: "pri_01jeax4ve6cayqt4hw47km8f47", package: "oneTime" },
    49: { id: "pri_01jeax8hwnb86azbk66z5ykkhh", package: "basicYear" },
    89: { id: "pri_01jeaxb1q0swjr1v2z6wqry4ky", package: "premiumYear" },
  };

  const getPriceID = (price) => {
    const getPrice = price.price
      ? price.price
      : annual
      ? price.yearlyPrice
      : price.monthlyPrice;
    return priceIDS[getPrice];
  };
  const openUrl = async (val) => {
    if (click.current) {
      try {
        click.current = false;
        setLoading(true);
        const user = await authUser();
        console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`);
        if (user && getPriceID(val)) {
          paddle.Checkout.open({
            displayMode: "overlay",
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            items: [{ quantity: 1, priceId: getPriceID(val).id }],
            customer: { email: user.email },
            customData: {
              userID: user._id,
              package: getPriceID(val).package,
            },
          });
        } else {
          eventBus.emit("loginModal");
        }
      } catch (error) {
        console.error(error);
      } finally {
        click.current = true;
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN,
    }).then((paddleInstance) => {
      if (paddleInstance) setPaddle(paddleInstance);
    });
  }, []);

  return (
    <div className="container mx-auto md:my-20 my-12 px-2" id="pricing">
      <div className="max-w-2xl mx-auto">
        <h2 className="md:text-6xl text-5xl text-center font-black mt-5">
          Pricing
        </h2>
        <p className="text-center mt-3">
          🎊 First 99 members will get lifetime access 🎊
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
                <span className="text-6xl">
                  $
                  {price.price
                    ? price.price
                    : annual
                    ? price.yearlyPrice
                    : price.monthlyPrice}
                </span>
                <sub className="text-sm font-medium">
                  USD/{price.time ? price.time : annual ? "Year" : "Month"}
                </sub>
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
              <Button
                className="w-full"
                onClick={() => openUrl(price)}
                disabled={loading}
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Get FeedPack <ChevronRightIcon />
              </Button>
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
