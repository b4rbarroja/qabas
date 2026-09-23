import type { Metadata } from "next";
import Link from "next/link";
import {
  PenLine,
  BookOpen,
  Rocket,
  ShieldCheck,
  Sparkles,
  ClipboardCopy,
  Image as ImageIcon,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "دليل الاستخدام | مدونة قبس",
  description:
    "دليل بسيط خطوة بخطوة يشرح كيف تنشئ حسابك، تكتب مقالتك، وتنشرها على منصة قبس المعرفية.",
};

const STEPS = [
  {
    number: "01",
    title: "أنشئ حسابك مجاناً",
    description:
      "افتح صفحة «سجل معنا» وأدخل اسمك وبريدك وكلمة المرور وتخصصك. في أقل من دقيقة يكون حسابك جاهزاً، وتحصل على لوحة تحكمك الخاصة.",
    href: "/register",
    hrefLabel: "أنشئ حسابك الآن",
  },
  {
    number: "02",
    title: "قم بتنسيق مقالتك بصيغة Md",
    description:
      "بعد كتابة مقالتك قم بالاستعانة بالذكاء الاصطناعي وقل له : أريد تنسيق هذه المقالة بصيغة Md ثم قم بنسخ النص لنشره في منصتنا بكل أريحية.",
    href: null,
    hrefLabel: null,
  },
  {
    number: "03",
    title: "الصق المحتوى وأضف صورة الغلاف",
    description:
      "من لوحة التحكم اضغط «إنشاء مقال»، ثم الصق نص Markdown في حقل المحتوى، وأضف العنوان والوسوم. لصق رابط صورة الغلاف (رابط مباشر ينتهي بـ ‎.png أو ‎.jpg)، ثم احفظ المقال.",
    href: "/dashboard",
    hrefLabel: "اذهب إلى لوحة التحكم",
  },
  {
    number: "04",
    title: "انشر وشارك مقالتك",
    description:
      "بعد نشر المقالة ووضع رابط الصورة يمكنك نشر المقالة وستظهر مباشرة في صفحة المقالات، ولكن سوف تخضع للمراجعة العلمية حتى يتم الحصول على شارة Approved",
    href: "/posts",
    hrefLabel: "تصفح المقالات",
  },
];

const MARKDOWN_SAMPLE = `# عنوان رئيسي
## عنوان فرعي

**نص غامق** و *نص مائل* و \`كود قصير\`

- عنصر أول في القائمة
- عنصر ثانٍ في القائمة

> اقتباس يبرز فكرة مهمة

\`\`\`
مثال على كود برمجي
\`\`\``;

export default function GuidePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-background font-thamaniyah text-dark"
    >
      {/* Header */}
      <section className="px-4 pt-4 md:px-6 md:pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-primary/10 bg-primary/5 px-6 py-10 md:px-10 md:py-14">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center gap-3 text-sm text-dark/45">
                <Link href="/" className="transition-colors hover:text-primary">
                  مدونة قبس
                </Link>
                <span className="h-px w-8 bg-primary/30" />
                <span>دليل الاستخدام</span>
              </div>

              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/70">
                <ClipboardCopy className="h-4 w-4" />
                دليل المستخدم
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                كيف تعمل منصة قبس؟
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-dark/60 md:text-lg">
                دليل بسيط يأخذك خطوة بخطوة — من إنشاء حسابك حتى نشر أول مقالة لك
                — دون الحاجة إلى أي خبرة تقنية. اقرأ الصفحة كاملة، أو انتقل
                مباشرة إلى الخطوة التي تريدها.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-light shadow-sm transition-all duration-200 hover:bg-accent hover:shadow-md"
                >
                  سجل مجاناً
                </Link>
                <Link
                  href="#steps"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
                >
                  ابدأ الخطوات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="px-4 pb-12 md:px-6 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl md:mb-10">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              خطوة بخطوة حتى النشر
            </h2>
            <p className="mt-3 text-base leading-8 text-dark/60">
              أربع خطوات فقط تفصلك عن أول مقالة منشورة باسمك.
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((step) => {
              return (
                <div
                  key={step.number}
                  className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-background p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md sm:flex-row sm:gap-6 sm:p-8"
                >
                  {/* Number */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-light">
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-bold text-primary sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-base leading-8 text-dark/70">
                      {step.description}
                    </p>

                    {step.href && (
                      <Link
                        href={step.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {step.hrefLabel}
                        <span>←</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Markdown sample */}
          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-bold text-primary sm:text-xl">
                كيف يبدو نص Markdown؟
              </h3>
            </div>
            <p className="mb-4 text-sm leading-7 text-dark/60 sm:text-base">
              هذا مثال صغير على الصيغة التي ستطلبها من أداة الذكاء الاصطناعي.
              لاحظ أن العناوين تبدأ بـ ‎#‎، والغامق بين ‎**‎، والقوائم بشرطة ‎-‎
              — والمنصة تحوّلها تلقائياً إلى شكل جميل عند العرض:
            </p>
            <pre
              dir="ltr"
              className="overflow-x-auto rounded-2xl border border-primary/10 bg-[#0d1117] p-5 text-left text-sm leading-7 text-[#e6edf3]"
            >
              <code>{MARKDOWN_SAMPLE}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-14 text-light md:px-6 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-right">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.25]">
              جاهز لنشر أول مقالة لك؟
            </h2>
            <p className="mt-4 text-base leading-8 opacity-90 sm:text-lg">
              أنشئ حسابك الآن، اكتب مقالتك، وانضم إلى ناشري قبس المعرفيين.
              التسجيل مجاني ويستغرق أقل من دقيقة.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Link
              href="/register"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-background px-7 py-3 text-base font-semibold text-dark shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
            >
              أنشئ حسابك مجاناً
            </Link>
            <Link
              href="/posts"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-lg border border-accent bg-accent/20 px-7 py-3 text-base font-semibold text-light shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/30 sm:w-auto"
            >
              تصفح المقالات أولاً
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
