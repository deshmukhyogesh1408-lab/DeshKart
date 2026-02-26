"use client";

import Header from "./header";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[108px] lg:pt-[140px]">{children}</main>
      <Footer />
    </>
  );
}
