import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./layouts/nav/Navbar";
import Footer from "./layouts/footer/Footer";

const thamaniyah = localFont({
  src: "../public/fonts/woff2/thmanyahserifdisplay-Regular.woff2",
  variable: "--font-thamaniyah",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "مدونة قبس",
  description: "أطلق العنان لقلمك",
};

// الطريقة الصحيحة في Next.js لإضافة الـ viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${thamaniyah.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
