import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maafuz Ismail — Full-Stack Engineer",
  description: "Full-Stack Software Engineer specialising in React, Node.js, AWS and scalable cloud infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
