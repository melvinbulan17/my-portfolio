import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Nav } from "@/components/layout/Nav";
import { SocialRail } from "@/components/layout/SocialRail";
import { StarField } from "@/components/layout/StarField";
import {
  copyrightYear,
  navLinks,
  resumeHref,
  siteOwner,
  siteTagline,
  socialLinks,
} from "@/content/site";
import { siteUrl } from "@/lib/site";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const siteTitle = "MBulan | Digital Portfolio";
const siteDescription =
  "Software engineer and project manager. Make it work. Make it right.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MBulan",
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${firaCode.variable} antialiased`}
    >
      <body className="group/page relative isolate flex min-h-dvh flex-col pt-24">
        <StarField className="transition-[filter] duration-480 ease-out-expo group-has-[[data-moon]:hover]/page:brightness-150" />
        <Header>
          <Nav links={navLinks} resumeHref={resumeHref} />
        </Header>
        {children}
        <SocialRail
          links={socialLinks}
          className="fixed bottom-0 left-8 z-10 min-[1537px]:left-[calc((100vw-70rem)/2-4rem)]"
        />
        <Footer
          tagline={siteTagline}
          navLinks={navLinks}
          socialLinks={socialLinks}
          resumeHref={resumeHref}
          owner={siteOwner}
          year={copyrightYear}
        />
      </body>
    </html>
  );
}
