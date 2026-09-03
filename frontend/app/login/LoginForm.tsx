"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني.");
      return;
    }
    if (!password) {
      setErrorMessage("يرجى إدخال كلمة المرور.");
      return;
    }

    setIsSubmitting(true);
    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto my-14 w-full max-w-md rounded-2xl border border-primary/10 bg-background p-8 text-center shadow-xl sm:p-10"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-primary">تم تسجيل الدخول بنجاح!</h2>
        <p className="mt-3 text-sm text-dark/75">
          أهلاً بعودتك، يتم نقلك إلى لوحة الكاتب الرئيسية...
        </p>

        <div className="mt-7">
          <Link
            href="/posts"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-light shadow-md transition-all hover:bg-accent"
          >
            تصفح المقالات
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[75vh] w-full max-w-md items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-2xl border border-primary/10 bg-background p-6 shadow-md sm:p-8 md:p-10">
        {/* Top brand */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src="/blackQabas2.png"
              alt="قبس"
              width={64}
              height={64}
              className="mx-auto h-14 w-14 object-contain"
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
            تسجيل الدخول
          </h1>
          <p className="mt-2 text-xs text-dark/70 sm:text-sm">
            أهلاً بك مجدداً في منصة قبس المعرفية
          </p>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-medium text-red-600 sm:text-sm"
            >
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
            >
              البريد الإلكتروني
            </label>
            <input
              id="login-email"
              type="email"
              dir="ltr"
              required
              autoComplete="email"
              placeholder="author@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-xs font-semibold text-primary sm:text-sm"
              >
                كلمة المرور
              </label>
              <Link
                href="#"
                className="text-xs text-primary/60 hover:text-primary transition-colors"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                dir="ltr"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors text-xs"
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-primary/20 accent-primary cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-xs text-dark/80 sm:text-sm cursor-pointer"
            >
              تذكر تسجيل دخولي
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-light shadow-md transition-all duration-200 hover:bg-accent hover:shadow-lg active:scale-[0.99] disabled:opacity-50 sm:text-base"
          >
            {isSubmitting ? "جارٍ التحقق..." : "تسجيل الدخول"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-primary/10" />
          <span className="text-xs text-primary/50">أو</span>
          <div className="h-px flex-1 bg-primary/10" />
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-primary/15 bg-background py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/5 sm:text-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 23.3 12 24z"
              />
            </svg>
            <span>المتابعة عبر Google</span>
          </button>
        </div>

        {/* Register link */}
        <div className="mt-8 border-t border-primary/10 pt-5 text-center">
          <p className="text-xs text-primary/70 sm:text-sm">
            كاتب جديد في قبس؟{" "}
            <Link
              href="/register"
              className="font-bold text-primary underline hover:text-accent transition-colors"
            >
              سجل حسابك الآن وابدأ النشر
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
