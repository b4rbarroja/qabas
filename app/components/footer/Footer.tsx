import Image from "next/image";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-primary text-light font-thamaniyah">
      {/* شريط النشرة البريدية */}
      <div className="border-b border-light/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-light">
                ابقَ على اطّلاع بجديدنا
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-light/70">
                انضم إلى النشرة البريدية لتصلك أحدث المقالات والأوراق البحثية
                فور نشرها، دون إزعاج.
              </p>
            </div>

            <form
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="footer-email" className="sr-only">
                  البريد الإلكتروني
                </label>
                <input
                  id="footer-email"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  className="w-full rounded-md border border-light/20 bg-light/5 px-4 py-2.5 text-right text-sm text-light placeholder:text-light/40 outline-none transition focus:border-accent focus:bg-light/10"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-light transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* روابط الفوتر */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span className="text-2xl font-bold text-light">
              <Image
                src="/qabasLight.png"
                height={70}
                width={70}
                alt="qabas"
              ></Image>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-light/60">
              مدونة علمية تهدف إلى تقديم محتوى رفيع المستوى يلامس شغف المثقف
              النهم.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-light/90">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-light/60">
              <li>
                <a href="/" className="transition hover:text-accent">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/about" className="transition hover:text-accent">
                  من نحن
                </a>
              </li>
              <li>
                <a href="/posts" className="transition hover:text-accent">
                  التدوينات
                </a>
              </li>
              <li>
                <a href="/register" className="transition hover:text-accent">
                  سجل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-light/90">
              التصنيفات
            </h4>
            <ul className="space-y-2.5 text-sm text-light/60">
              <li>
                <a
                  href="/tags/linguistics"
                  className="transition hover:text-accent"
                >
                  لسانيات
                </a>
              </li>
              <li>
                <a
                  href="/tags/history"
                  className="transition hover:text-accent"
                >
                  تاريخ العلوم
                </a>
              </li>
              <li>
                <a href="/tags/tech" className="transition hover:text-accent">
                  اللغويات والتقنية
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-light/90">
              تواصل معنا
            </h4>
            <ul className="space-y-2.5 text-sm text-light/60">
              <li dir="ltr" className="text-right">
                <a
                  href="mailto:hello@qabas.com"
                  className="transition hover:text-accent"
                >
                  hello@qabas.com
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-accent">
                  تويتر
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-accent">
                  إنستغرام
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-light/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-light/50 sm:flex-row sm:px-10">
          <p>© {new Date().getFullYear()} قبس. جميع الحقوق محفوظة.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="transition hover:text-accent">
              سياسة الخصوصية
            </a>
            <a href="/terms" className="transition hover:text-accent">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
