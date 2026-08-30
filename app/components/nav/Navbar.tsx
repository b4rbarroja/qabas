"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/posts", label: "التدوينات" },
  { href: "/about", label: "من نحن" },
  { href: "/register", label: "سجل معنا", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* =========================
     قراءة الثيم الحالي فقط
  ========================= */
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    // لو الثيم اتغير من مكان تاني في الموقع
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* =========================
     Scroll
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-[100]
        w-full
        font-thamaniyah

        transition-all
        duration-500

        ${
          isScrolled
            ? `
              bg-background/90
              backdrop-blur-xl
              shadow-lg
              border-b
              border-primary/10
            `
            : `
              bg-transparent
              border-transparent
            `
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          h-[76px]
          w-full
          max-w-[1400px]
          items-center
          justify-between

          px-4
          sm:px-6
          md:px-10
          lg:px-20
          xl:px-32
        "
      >
        {/* =========================
            Logo
        ========================= */}

        <Link href="/" className="relative z-[110] shrink-0">
          <Image
            src={isDark ? "/qabaLogo.png" : "/qabasLight.png"}
            width={70}
            height={70}
            alt="قبس"
            priority
            className="
    h-auto
    w-14
    sm:w-16
    md:w-[70px]
    transition-all
    duration-300
  "
          />
        </Link>

        {/* =========================
            Desktop Navigation
        ========================= */}

        <nav
          className={`
            hidden
            md:flex
            items-center
            gap-6
            transition-colors
            duration-300

            ${isScrolled ? "text-dark" : "text-white"}
          `}
        >
          {navLinks.map((link) => (
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
                    duration-300

                    hover:brightness-110
                    hover:-translate-y-0.5
                  `
                  : `
                    transition-colors
                    duration-300
                    hover:text-accent
                  `
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* =========================
            Mobile Burger
        ========================= */}

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`
            relative
            z-[110]
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg

            transition-all
            duration-300

            ${isScrolled ? "text-dark" : "text-white"}

            md:hidden
          `}
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
                strokeLinejoin="round"
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
          fixed
          inset-0
          z-[90]

          flex
          items-center
          justify-center

          bg-background/90
          backdrop-blur-2xl

          md:hidden

          transition-all
          duration-500

          ${
            isMenuOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
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
          {navLinks.map((link) => (
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
          ))}
        </nav>
      </div>
    </header>
  );
}
