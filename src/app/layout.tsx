import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dots Payout Calculator",
  description: "Calculate payouts for the Dots golf game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
