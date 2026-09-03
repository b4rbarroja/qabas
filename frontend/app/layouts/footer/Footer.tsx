import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="w-full overflow-hidden bg-primary font-thamaniyah text-light"
    >
      {/* =====================================================
          NEWSLETTER
      ====================================================== */}
      <div className="border-b border-light/10">
        <div
          className="
            mx-auto w-full max-w-[1600px]
            px-5 py-12
            sm:px-8 sm:py-14
            md:px-12 md:py-16
            lg:px-16
            xl:px-24
          "
        >
          <div
            className="
              flex flex-col
              gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-12
            "
          >
            {/* Newsletter Text */}
            <div className="w-full max-w-2xl">
              <h3
                className="
                  text-2xl
                  font-semibold
                  leading-tight
                  text-light
                  sm:text-3xl
                  md:text-4xl
                "
              >
                ابقَ على اطّلاع بجديدنا
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-[1.9]
                  text-light/70
                  sm:text-base
                  md:text-lg
                "
              >
                انضم إلى النشرة البريدية لتصلك أحدث المقالات والأوراق البحثية
                فور نشرها، دون إزعاج.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              className="
                flex w-full
                max-w-2xl
                flex-col gap-3
                sm:flex-row
                sm:gap-4
                lg:max-w-xl
                xl:max-w-2xl
              "
              noValidate
            >
              <div className="min-w-0 flex-1">
                <label htmlFor="footer-email" className="sr-only">
                  البريد الإلكتروني
                </label>

                <input
                  id="footer-email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="
                    block w-full
                    min-w-0
                    rounded-lg
                    border border-light/20
                    bg-light/5
                    px-4 py-3.5
                    text-left
                    font-sans
                    text-sm text-light
                    outline-none
                    transition-all duration-300
                    placeholder:text-light/40
                    hover:border-light/30
                    focus:border-accent
                    focus:bg-light/10
                    sm:px-5
                    sm:text-base
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  inline-flex
                  min-h-12
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-accent
                  px-7 py-3.5
                  text-sm font-medium
                  text-light
                  transition-all duration-300
                  hover:opacity-90
                  hover:shadow-lg
                  hover:shadow-accent/30
                  active:scale-[0.98]
                  sm:w-auto
                  sm:min-w-[120px]
                  sm:text-base
                "
              >
                اشترك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER LINKS
      ====================================================== */}
      <div
        className="
          mx-auto w-full max-w-[1600px]
          px-5 py-12
          sm:px-8 sm:py-14
          md:px-12 md:py-16
          lg:px-16
          xl:px-24
        "
      >
        <div
          className="
            grid grid-cols-1
            gap-10
            sm:grid-cols-2
            sm:gap-12
            lg:grid-cols-4
            lg:gap-10
            xl:gap-16
          "
        >
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
              aria-label="قبس - الصفحة الرئيسية"
            >
              <Image
                src="/whiteQabas1.png"
                width={80}
                height={80}
                alt="قبس"
                className="
                  h-auto w-[65px]
                  sm:w-[75px]
                  md:w-[80px]
                "
              />
            </Link>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-[1.9]
                text-light/60
                sm:text-base
              "
            >
              قبس هي مدونة ناشئة تهدف لاقتباس مختلف العلوم وعرضها في صور مبسطة
              مع المراجعة والدقة في النشر.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="
                mb-4
                text-base font-semibold
                text-light/90
                sm:mb-5
                sm:text-lg
              "
            >
              روابط سريعة
            </h4>

            <ul className="space-y-3 text-sm text-light/60 sm:text-base">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  الرئيسية
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-accent"
                >
                  من نحن
                </Link>
              </li>

              <li>
                <Link
                  href="/posts"
                  className="transition-colors hover:text-accent"
                >
                  التدوينات
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-accent"
                >
                  سجل معنا
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-accent"
                >
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="
                mb-4
                text-base font-semibold
                text-light/90
                sm:mb-5
                sm:text-lg
              "
            >
              التصنيفات
            </h4>

            <ul className="space-y-3 text-sm text-light/60 sm:text-base">
              <li>
                <Link
                  href="/tags/linguistics"
                  className="transition-colors hover:text-accent"
                >
                  لسانيات
                </Link>
              </li>

              <li>
                <Link
                  href="/tags/history"
                  className="transition-colors hover:text-accent"
                >
                  تاريخ العلوم
                </Link>
              </li>

              <li>
                <Link
                  href="/tags/tech"
                  className="transition-colors hover:text-accent"
                >
                  اللغويات والتقنية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="
                mb-4
                text-base font-semibold
                text-light/90
                sm:mb-5
                sm:text-lg
              "
            >
              تواصل معنا
            </h4>

            <ul className="space-y-3 text-sm text-light/60 sm:text-base">
              <li>
                <a
                  href="mailto:hello@qabas.com"
                  dir="ltr"
                  className="
                    inline-block
                    max-w-full
                    break-all
                    font-sans
                    transition-colors
                    hover:text-accent
                  "
                >
                  hello@qabas.com
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-accent">
                  تويتر
                </a>
              </li>

              <li>
                <a href="#" className="transition-colors hover:text-accent">
                  إنستغرام
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}
      <div className="border-t border-light/10">
        <div
          className="
            mx-auto flex w-full max-w-[1600px]
            flex-col
            items-center
            gap-4
            px-5 py-6
            text-center
            text-xs
            text-light/50
            sm:px-8 sm:py-7
            sm:text-sm
            md:px-12
            lg:flex-row
            lg:justify-between
            lg:text-right
            lg:px-16
            xl:px-24
          "
        >
          <p>© {new Date().getFullYear()} قبس. جميع الحقوق محفوظة.</p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
              sm:gap-x-7
              lg:justify-end
            "
          >
            <Link
              href="/privacy"
              className="
                whitespace-nowrap
                transition-colors
                hover:text-accent
              "
            >
              سياسة الخصوصية
            </Link>

            <Link
              href="/terms"
              className="
                whitespace-nowrap
                transition-colors
                hover:text-accent
              "
            >
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
