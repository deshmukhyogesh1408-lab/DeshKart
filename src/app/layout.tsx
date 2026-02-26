import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeshKart — Unique Shopping by YDeshmuk",
  description:
    "DeshKart: Discover unique deals on electronics, fashion, home & living, and more. Created by ydeshmuk. Free shipping on orders over $100.",
  keywords: ["deshkart", "ydeshmuk", "online shopping", "e-commerce", "unique deals"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

// Client wrapper for interactive components
import ClientLayout from "@/components/layout/client-layout";
