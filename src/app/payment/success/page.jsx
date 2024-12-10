"use client";
import { refreshToken } from "@/services/nextAuth";
import { initLottie } from "@/utils";
import React, { useEffect, useRef, useState } from "react";

export default function SocialLogin() {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  const animationPath = "/lottie/payment-success.json";

  useEffect(() => {
    document.title = `Payment Success | FeedPack`;
    const init = async () => {
      if (loadingRef.current) {
        await initLottie(loadingRef.current, animationPath, false);
      }
    };
    init();
    setTimeout(() => {
      setLoading(true);
    }, 500);
    setTimeout(async () => {
      await refreshToken();
      window.open("/dashboard", "_self");
    }, 15000);

    return () => {
      if (window.lottie) {
        window.lottie.stop();
        window.lottie.destroy();
      }
    };
  }, [animationPath]);

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div ref={loadingRef} className="max-h-72"></div>
      <div className="flex justify-center flex-col items-center gap-2">
        <div className="w-full h-1 bg-gray-200 rounded-full">
          <div
            className={`h-1 bg-gradient rounded-full transition-all duration-15000 ${
              loading ? "w-full" : "w-[0%]"
            }`}
          ></div>
        </div>
        <p className="text-gray-700">
          {`Don't`} close the browser. We are verifying your payment and
          updating your profile.
        </p>
      </div>
    </div>
  );
}
