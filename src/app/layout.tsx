import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tenxl — Graphics & Developer",
  description:
    "Tenxl — graphics & developer crafting title sequences, brand systems, and product motion that people actually remember.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/open-runde" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}
