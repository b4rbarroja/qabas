"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/posts", label: "التدوينات" },
  { href: "/about", label: "من نحن" },
  { href: "/register", label: "سجل معنا", isPrimary: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /* منع Scroll الصفحة أثناء فتح القائمة */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* إغلاق القائمة عند الضغط على Escape */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header
      dir="rtl"
      className="
        relative z-[100]
        flex h-[68px] min-h-[68px]
        items-center justify-between
        bg-background
        px-4
        sm:px-6
        md:px-10
        lg:px-16
        xl:px-24
        2xl:px-32
        font-thamaniyah
      "
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <Link
        href="/"
        onClick={closeMenu}
        aria-label="الصفحة الرئيسية"
        className="
          relative z-[110]
          flex
          h-[58px] w-[58px]
          sm:h-[62px] sm:w-[62px]
          md:h-[66px] md:w-[66px]
          shrink-0
          items-center justify-center
        "
      >
        {/* Light Logo */}
        <Image
          src="/qabaLogo.png"
          width={70}
          height={70}
          alt="قبس"
          priority
          className="
            logo-light
            h-auto
            w-[55px]
            sm:w-[60px]
            md:w-[65px]
            object-contain
          "
        />

        {/* Dark Logo */}
        <Image
          src="/qabasLight.png"
          width={70}
          height={70}
          alt="قبس"
          priority
          className="
            logo-dark
            h-auto
            w-[55px]
            sm:w-[60px]
            md:w-[65px]
            object-contain
          "
        />
      </Link>

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <nav
        aria-label="التنقل الرئيسي"
        className="
          hidden
          md:flex
          items-center
          gap-5
          lg:gap-7
          xl:gap-9
          text-dark
        "
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
                  lg:px-6
                  lg:py-3
                  text-sm
                  lg:text-base
                  text-light
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:brightness-110
                `
                : `
                  relative
                  py-2
                  text-sm
                  lg:text-base
                  transition-colors
                  duration-200
                  hover:text-accent
                  after:absolute
                  after:bottom-0
                  after:right-0
                  after:h-[1px]
                  after:w-0
                  after:bg-accent
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                `
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* =====================================================
          MOBILE BURGER
      ====================================================== */}

      <button
        type="button"
        onClick={toggleMenu}
        className="
          relative z-[110]
          flex
          h-11 w-11
          sm:h-12 sm:w-12
          items-center
          justify-center
          rounded-xl
          text-dark
          transition-all
          duration-200
          hover:bg-primary/5
          hover:text-accent
          active:scale-95
          md:hidden
        "
        aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMenuOpen ? (
            <motion.svg
              key="close"
              initial={{
                opacity: 0,
                rotate: -90,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 90,
                scale: 0.7,
              }}
              transition={{
                duration: 0.2,
              }}
              className="h-7 w-7 sm:h-8 sm:w-8"
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
              initial={{
                opacity: 0,
                rotate: 90,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: -90,
                scale: 0.7,
              }}
              transition={{
                duration: 0.2,
              }}
              className="h-7 w-7 sm:h-8 sm:w-8"
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

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="
              fixed
              inset-0
              z-[100]
              flex
              min-h-[100dvh]
              items-center
              justify-center
              overflow-hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={closeMenu}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            {/* =================================================
                BLUR BACKGROUND
            ================================================== */}

            <motion.div
              className="
                absolute
                inset-0
                bg-background/80
                backdrop-blur-2xl
              "
              initial={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(24px)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              transition={{
                duration: 0.35,
              }}
            />

            {/* لون خفيف فوق الـ Blur */}
            <motion.div
              className="
                absolute
                inset-0
                bg-primary/[0.04]
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* =================================================
                MENU CONTENT
            ================================================== */}

            <motion.div
              className="
                relative
                z-10
                flex
                w-full
                max-w-[420px]
                flex-col
                items-center
                px-5
                sm:px-8
              "
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* =================================================
                  MOBILE LOGO
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.05,
                  duration: 0.35,
                }}
                className="
                  mb-8
                  sm:mb-10
                "
              >
                <div className="relative flex h-20 w-20 items-center justify-center">
                  {/* Light */}
                  <Image
                    src="/qabaLogo.png"
                    width={90}
                    height={90}
                    alt="قبس"
                    className="
                      logo-light
                      h-auto
                      w-[75px]
                      sm:w-[85px]
                      object-contain
                    "
                  />

                  {/* Dark */}
                  <Image
                    src="/qabasLight.png"
                    width={90}
                    height={90}
                    alt="قبس"
                    className="
                      logo-dark
                      h-auto
                      w-[75px]
                      sm:w-[85px]
                      object-contain
                    "
                  />
                </div>
              </motion.div>

              {/* =================================================
                  LINKS
              ================================================== */}

              <nav
                aria-label="قائمة الهاتف"
                className="
                  flex
                  w-full
                  flex-col
                  items-center
                  gap-2.5
                  sm:gap-3
                "
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    className="w-full"
                    initial={{
                      opacity: 0,
                      y: 18,
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
                      delay: 0.1 + index * 0.06,
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
                            flex
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary
                            px-6
                            py-3.5
                            sm:py-4
                            text-base
                            sm:text-lg
                            font-medium
                            text-light
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:brightness-110
                            active:scale-[0.98]
                          `
                          : `
                            flex
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            px-6
                            py-3.5
                            sm:py-4
                            text-lg
                            sm:text-xl
                            font-medium
                            text-dark
                            transition-all
                            duration-300
                            hover:bg-primary/5
                            hover:text-accent
                            active:scale-[0.98]
                          `
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* =================================================
                CLOSE BUTTON
            ================================================== */}

            <motion.button
              type="button"
              onClick={closeMenu}
              aria-label="إغلاق القائمة"
              className="
                absolute
                left-4
                top-4
                sm:left-7
                sm:top-7
                z-[120]
                flex
                h-11
                w-11
                sm:h-12
                sm:w-12
                items-center
                justify-center
                rounded-full
                text-dark
                transition-all
                duration-200
                hover:bg-primary/5
                hover:text-accent
                active:scale-95
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
                delay: 0.1,
                duration: 0.3,
              }}
            >
              <svg
                className="h-7 w-7 sm:h-8 sm:w-8"
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
