import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6-Point Scotch Payout Calculator",
  description: "Calculate payouts for the 6-Point Scotch golf game",
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
