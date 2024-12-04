import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Terms & Condition | FeedPack",
};

export default function Page() {
  return (
    <div className="py-10 px-2 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: "indigo" }))}>
          <Undo2Icon />
          Back
        </Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Terms & condition</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using FeedPack {`('Service')`}, you agree to be
            bound by these Terms of Service {`('Terms')`}. If you do not agree
            with any part of these Terms, you may not use the Service.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Description of Service
          </h2>
          <p>
            FeedPack is a SaaS platform that helps users create and share
            feature boards to develop profitable features that meet user needs.
            You do not have the right to resell or redistribute the Service.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Ownership and Usage Rights
          </h2>
          <p>
            All content, trademarks, and data on the Service are owned by
            FeedPack. Users are granted a limited, non-transferable right to
            access and use the platform after subscribing. This license does not
            grant ownership of the platform or its intellectual property.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. User Data Collection
          </h2>
          <p>
            We collect the following personal data: name, email, and payment
            information. We also collect non-personal data through web cookies.
            For more details, please review our{" "}
            <a className="underline" href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Modifications to Terms
          </h2>
          <p>
            FeedPack reserves the right to update or modify these Terms at any
            time. You will be notified of any changes via email. Continued use
            of the Service after any changes indicates your acceptance of the
            updated Terms.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of India. Any disputes arising from these Terms or the use of
            the Service will be resolved in the courts of India.
          </p>
        </section>
        <section className="mb-8" id="refund-policy">
          <h2 className="text-2xl font-semibold mb-4">7. Refund Policy</h2>
          <p>
            FeedPack offers refunds under the following terms, based on your
            subscription or purchase plan:
          </p>
          <div className="pl-3">
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Monthly Subscriptions (Basic & Premium Plans)
            </h3>
            <div className="space-y-2 pl-3">
              <p>
                1. Refund requests for monthly subscriptions (Basic: $5
                USD/month & $50 USD/yearly, Premium: $9 USD/month & $90
                USD/yearly) can only be made within 14 days of the initial
                purchase.
              </p>
              <p>
                2. Refunds for subscription renewals are not provided. To avoid
                charges, cancel your subscription before the next billing cycle.
              </p>
            </div>
          </div>
          <div className="pl-3">
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Lifetime Plan ($49 USD/One-Time Payment)
            </h3>
            <div className="space-y-2 pl-3">
              <p>
                1. Refund requests for the Lifetime Plan must be made within 14
                days of purchase.
              </p>
              <p>
                2. Refunds will not be provided after 14 days or if the first
                49-member limit is reached and the promotion ends.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Contact Information
          </h2>
          <p>
            If you have any questions or concerns about these Terms, feel free
            to contact us:Email:{" "}
            <a className="underline" href="mailto:contact@feedpack.xyz">
              contact@feedpack.xyz
            </a>
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">
          By using FeedPack, you acknowledge that you have read, understood, and
          agree to these Terms of Service.
        </p>
      </div>
    </div>
  );
}
