import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SocialRail } from "@/components/layout/SocialRail";
import {
  copyrightYear,
  navLinks,
  resumeHref,
  siteOwner,
  siteTagline,
  socialLinks,
} from "@/content/site";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Bulan | Digital Portfolio",
  description: "Project manager and QA engineer. I lead it. I test it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${firaCode.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <header id="top" className="wrap w-full">
          <Nav links={navLinks} resumeHref={resumeHref} />
        </header>
        {children}
        <SocialRail
          links={socialLinks}
          className="fixed bottom-0 left-8 z-10"
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
