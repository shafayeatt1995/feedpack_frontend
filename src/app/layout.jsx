import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/nav";
import SocialLogin from "@/components/common/SocialLogin";
import Script from "next/script";

const font = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth hydrated">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GTM-M7WLCRQF"
        ></Script> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3CJSXVWENP"
        ></Script>
        <Script src="/js/gtag.js" type="text/javascript" defer></Script>
        <Script src="/js/gana.js" type="text/javascript" defer></Script>
      </head>
      <body
        className={`${font.className} text-gray-800 font-medium`}
        data-new-gr-c-s-check-loaded="14.1209.0"
        data-gr-ext-installed=""
      >
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" expand={true} richColors />
        <SocialLogin />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7WLCRQF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
