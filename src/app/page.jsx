import Faq from "@/components/home/Faq";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Reason from "@/components/home/Reason";
import Usecase from "@/components/home/Usecase";

export const metadata = {
  title: "Feedback collection tools - Feedpack",
  description:
    "Feedpack is a SaaS which helps you gather feedback, prioritize the right features, and build products users truly want.",
};

export default function Page() {
  return (
    <>
      <Hero />
      <Reason />
      <Usecase />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}
