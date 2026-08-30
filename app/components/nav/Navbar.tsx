"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#", label: "الرئيسية" },
  { href: "#", label: "التدوينات" },
  { href: "#", label: "من نحن" },
  { href: "#", label: "سجل معنا", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="font-thamaniyah relative px-6 md:px-30 py-4 bg-background h-[66px] min-h-[66px] flex items-center justify-between">
      {/* Logo - centered on mobile, left on desktop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:left-0 z-10">
        <Image src="/qabaLogo.png" height={70} width={70} alt="qabas" />
      </div>

      {/* Burger button - mobile only */}
      <button
        onClick={toggleMenu}
        className="md:hidden z-20 p-2 text-dark"
        aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Desktop navigation - hidden on mobile */}
      <nav className="hidden md:flex gap-6 items-center text-dark">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={link.isPrimary
              ? "bg-primary text-light px-5 py-2 rounded-[5px] hover:brightness-125 transition-all duration-200"
              : "hover:text-accent transition-colors duration-200"}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile overlay menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[50] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-dark"
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <nav className="flex flex-col items-center gap-6 text-2xl font-medium">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={closeMenu}
                className={link.isPrimary
                  ? "bg-primary text-light px-8 py-3 rounded-[8px] hover:brightness-125 transition-all duration-200 w-full text-center"
                  : "hover:text-accent transition-colors duration-200"}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={closeMenu}
            className="absolute top-6 left-6 md:top-8 md:left-8 text-dark hover:text-accent transition-colors"
            aria-label="إغلاق القائمة"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
