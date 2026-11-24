import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const terminal = IBM_Plex_Mono({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Interfaces — The Interfaces Company of Tomorrow",
  description:
    "An independent human technology company building technology that expands human capability, creativity and agency.",
  metadataBase: new URL("https://interfaces.company"),
  openGraph: {
    title: "Interfaces — The Interfaces Company of Tomorrow",
    description:
      "An independent human technology company building technology that expands human capability, creativity and agency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${terminal.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
