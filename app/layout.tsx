import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const thamaniyah = localFont({
  src: "../public/fonts/woff2/thmanyahserifdisplay-Regular.woff2",
  variable: "--font-thamaniyah",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدونة قبس",
  description: "أطلق العنان لقلمك",
};
// Ensure responsive viewport

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${thamaniyah.variable}  h-full antialiased`}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="min-h-full flex-col ">{children}</body>
    </html>
  );
}
