"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#", label: "الرئيسية" },
  { href: "#", label: "التدوينات" },
  { href: "#", label: "من نحن" },
  { href: "#", label: "سجل معنا", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="
        relative z-[100]
        flex h-[66px] min-h-[66px]
        items-center justify-between
        bg-background
        px-5 py-4
        font-thamaniyah
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-24
      "
    >
      {/* Logo */}
      <div
        className="
          absolute left-1/2 top-1/2
          z-10
          -translate-x-1/2 -translate-y-1/2
          md:static
          md:translate-x-0
          md:translate-y-0
        "
      >
        <Image
          src="/qabaLogo.png"
          height={70}
          width={70}
          alt="قبس"
          className="h-auto w-[58px] sm:w-[65px] md:w-[70px]"
          priority
        />
      </div>

      {/* Burger */}
      <button
        type="button"
        onClick={toggleMenu}
        className="
          relative z-[110]
          flex items-center justify-center
          rounded-lg
          p-2
          text-dark
          transition-colors
          hover:text-accent
          md:hidden
        "
        aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isMenuOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMenuOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.2 }}
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
            </motion.svg>
          ) : (
            <motion.svg
              key="menu"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.2 }}
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
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-6 text-dark md:flex">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={
              link.isPrimary
                ? "rounded-[5px] bg-primary px-5 py-2 text-light transition-all duration-200 hover:brightness-125"
                : "transition-colors duration-200 hover:text-accent"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="
              fixed inset-0
              z-[100]
              flex
              items-center
              justify-center
              overflow-hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeMenu}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            {/* Blur Background */}
            <motion.div
              className="
                absolute inset-0
                bg-background/75
                backdrop-blur-xl
              "
              initial={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(20px)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            />

            {/* Soft overlay */}
            <motion.div
              className="absolute inset-0 bg-primary/[0.03]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Content */}
            <motion.div
              className="
                relative
                z-10
                flex
                w-full
                flex-col
                items-center
                px-6
              "
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Logo */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 0.35,
                }}
                className="mb-10"
              >
                <Image
                  src="/qabaLogo.png"
                  width={90}
                  height={90}
                  alt="قبس"
                  className="h-auto w-[75px]"
                />
              </motion.div>

              {/* Links */}
              <nav className="flex w-full max-w-sm flex-col items-center gap-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    className="w-full"
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      filter: "blur(5px)",
                    }}
                    transition={{
                      delay: 0.12 + index * 0.07,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={
                        link.isPrimary
                          ? `
                            flex w-full
                            items-center justify-center
                            rounded-xl
                            bg-primary
                            px-8 py-4
                            text-lg font-medium
                            text-light
                            shadow-lg
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:brightness-125
                          `
                          : `
                            flex w-full
                            items-center justify-center
                            rounded-xl
                            px-8 py-4
                            text-xl font-medium
                            text-dark
                            transition-all duration-300
                            hover:bg-primary/5
                            hover:text-accent
                          `
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={closeMenu}
              aria-label="إغلاق القائمة"
              className="
                absolute
                left-5 top-5
                z-20
                rounded-full
                p-2
                text-dark
                transition-colors
                hover:text-accent
                sm:left-8 sm:top-8
              "
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: -45,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                rotate: 45,
              }}
              transition={{
                delay: 0.15,
                duration: 0.3,
              }}
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
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
