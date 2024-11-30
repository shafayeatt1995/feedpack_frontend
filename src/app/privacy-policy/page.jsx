import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Privacy Policy | FeedPack",
};

export default function Page() {
  return (
    <div className="py-10 px-2 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: "indigo" }))}>
          <Undo2Icon />
          Back
        </Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to FeedPack. We are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your
            personal information.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p>
            <span>Personal Information:</span> We collect your name, email, and
            payment information during registration and when processing your
            subscription. <span>Non-Personal Information:</span> We use web
            cookies to collect non-personal data.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Purpose of Data Collection
          </h2>
          <p>
            We collect your personal information to process your payments
            securely through Paddle, and to manage your account on FeedPack.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
          <p>We do not share your data with any other parties.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. {`Children's`} Privacy
          </h2>
          <p>We do not collect any data from children.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Updates to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any significant
            changes will be communicated to you via email, and the updated
            policy will be posted on our website. Continued use of the platform
            after changes have been made constitutes acceptance of the updated
            Privacy Policy.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy,
            please feel free to contact us: Email:{" "}
            <a className="underline" href="mailto:contact@feedpack.xyz">
              contact@feedpack.xyz
            </a>
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">
          By using FeedPack, you consent to the terms of this Privacy Policy.
        </p>
      </div>
    </div>
  );
}
