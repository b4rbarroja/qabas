import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="flex min-h-[70vh] w-full flex-col items-center justify-center px-5 py-16 text-center font-thamaniyah text-dark sm:px-8"
    >
      <div className="relative mb-6 h-36 w-36 sm:h-44 sm:w-44">
        <Image
          src="/blackQabas2.png"
          alt="قبس 404"
          fill
          className="object-contain opacity-80"
        />
      </div>

      <span className="rounded-md bg-accent/15 px-3 py-1 text-xs font-bold text-accent sm:text-sm">
        خطأ 404
      </span>

      <h1 className="mt-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
        الصفحة أو المقال غير موجود
      </h1>

      <p className="mx-auto mt-4 max-w-md text-base leading-[1.9] text-dark/70 sm:text-lg">
        عذراً، يبدو أن الرابط الذي تبحث عنه قد تم نقله أو أن المقال غير متوفر
        حالياً.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/posts"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-light shadow-md transition-all hover:bg-accent"
        >
          تصفح المقالات
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
        >
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
