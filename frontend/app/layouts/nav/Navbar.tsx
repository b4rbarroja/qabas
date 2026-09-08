"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// الروابط الأساسية التي تظهر للجميع
const baseNavLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/posts", label: "التدوينات" },
  { href: "/#about", label: "من نحن" },
];

// روابط تسجيل الدخول غير المسجلين
const authLinks = [
  { href: "/login", label: "تسجيل الدخول" },
  { href: "/register", label: "سجل معنا", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // التحقق من الجلسة عبر الباك إند
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // إرسال الـ Cookies مع الطلب للتأكد من التوكن
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <header className="relative z-[100] w-full bg-background font-thamaniyah">
      <div
        className="
          flex
          h-[76px]
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          md:px-10
          lg:px-15
          xl:px-20
        "
      >
        {/* =========================
            Logo
        ========================= */}
        <Link href="/" className="shrink-0">
          <Image
            src="/blackQabas2.png"
            width={70}
            height={70}
            alt="قبس"
            priority
            className="h-auto w-14 sm:w-16 md:w-[70px]"
          />
        </Link>

        {/* =========================
            Desktop Navigation
        ========================= */}
        <nav className="hidden items-center gap-6 text-dark md:flex">
          {/* الروابط الأساسية */}
          {baseNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          {/* أثناء تحميل الفحص نبقي المساحة لتفادي حدوث Layout Shift */}
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-primary/10" />
          ) : isLoggedIn ? (
            /* في حالة تسجيل الدخول: عرض أيقونة ورابط لوحة التحكم */
            <Link
              href="/dashboard"
              title="لوحة التحكم"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-4
                py-2.5
                text-light
                transition-all
                duration-200
                hover:bg-accent
                hover:shadow-md
              "
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-sm font-bold">لوحة التحكم</span>
            </Link>
          ) : (
            /* في حالة عدم تسجيل الدخول: عرض زر الدخول والتسجيل */
            authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.isPrimary
                    ? `
                      rounded-lg
                      bg-primary
                      px-5
                      py-2.5
                      text-light
                      transition-all
                      duration-200
                      hover:brightness-110
                    `
                    : `
                      transition-colors
                      duration-200
                      hover:text-accent
                    `
                }
              >
                {link.label}
              </Link>
            ))
          )}
        </nav>

        {/* =========================
            Mobile Burger
        ========================= */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-dark md:hidden"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* =========================
          Mobile Menu
        ========================= */}
      <div
        className={`
          fixed inset-0 z-[90]
          flex items-center justify-center
          bg-background/90
          backdrop-blur-2xl
          md:hidden
          transition-all duration-500
          ${
            isMenuOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      >
        <nav
          className={`
            flex
            w-full
            max-w-sm
            flex-col
            items-center
            gap-7
            px-6
            transition-all
            duration-500
            ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          {/* الروابط الأساسية للموبايل */}
          {baseNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-medium text-dark transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          {/* روابط الجلسة للموبايل */}
          {!loading &&
            (isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-primary
                  px-8
                  py-4
                  text-center
                  text-lg
                  font-bold
                  text-light
                  transition-all
                  hover:brightness-110
                "
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>لوحة التحكم</span>
              </Link>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    link.isPrimary
                      ? `
                        w-full
                        rounded-xl
                        bg-primary
                        px-8
                        py-4
                        text-center
                        text-lg
                        text-light
                        transition-all
                        hover:brightness-110
                      `
                      : `
                        text-2xl
                        font-medium
                        text-dark
                        transition-colors
                        hover:text-accent
                      `
                  }
                >
                  {link.label}
                </Link>
              ))
            ))}
        </nav>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="
            absolute
            left-6
            top-6
            text-dark
            transition-colors
            hover:text-accent
          "
          aria-label="إغلاق القائمة"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
