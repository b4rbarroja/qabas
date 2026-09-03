import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "سجل معنا ككاتب | مدونة قبس",
  description:
    "انضم إلى مجتمع الكتاب والباحثين في مدونة قبس وشارك أبحاثك ومقالاتك مع آلاف القراء في بيئة معرفية رصينة.",
};

export default function RegisterPage() {
  return (
    <main className="w-full bg-background font-thamaniyah text-dark" dir="rtl">
      <RegisterForm />
    </main>
  );
}
