import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { RomanticShell } from "@/components/providers/romantic-shell";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "For you",
  description: "An invitation to meet today",
  openGraph: {
    title: "For you",
    description: "An invitation to meet today",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <RomanticShell>{children}</RomanticShell>
      </body>
    </html>
  );
}
