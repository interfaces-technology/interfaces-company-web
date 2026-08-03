import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const terminal = IBM_Plex_Mono({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Interfaces Company",
  description:
    "A human technology practice making crafted technology more accessible. Public terminal — proof of existence.",
  metadataBase: new URL("https://interfaces.company"),
  openGraph: {
    title: "The Interfaces Company",
    description:
      "A human technology practice making crafted technology more accessible.",
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
      className={`${terminal.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full font-mono antialiased">{children}</body>
    </html>
  );
}
