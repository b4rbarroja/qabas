import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول | مدونة قبس",
  description: "سجل الدخول إلى حسابك في منصة قبس لمتابعة نشر وإدارة مقالاتك.",
};

export default function LoginPage() {
  return (
    <main className="w-full bg-background font-thamaniyah text-dark" dir="rtl">
      <LoginForm />
    </main>
  );
}
