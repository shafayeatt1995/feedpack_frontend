import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-gradient text-white">
      <div className="container mx-auto">
        <h2 className="xl:text-[250px] lg:leading-none lg:text-[180px] md:text-9xl text-7xl font-black text-center py-20">
          Feedpack
        </h2>
        <hr />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-5 py-5 px-5">
          <p>© 2024 Feedpack. All rights reserved.</p>
          <div className="gap-3 md:gap-5 w-full md:w-auto grid grid-cols-2 md:flex justify-items-center">
            <a
              href="https://feedpack.xyz/board/feedpack"
              target="_blank"
              className="hover:underline"
            >
              Submit your feedback
            </a>
            <Link href="/terms" className="hover:underline">
              Terms & Condition
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link
              href="mailto:contact@feedpack.xyz"
              className="hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
