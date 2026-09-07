import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const pillars = [
    {
      number: "01",
      title: "دقة ومراجعة المحتوى",
      description:
        "نحرص على تقديم مقالات علمية وفكرية موثوقة المصادر وخالية من الصياغة الآلية السطحية لضمان جودة المعلومة.",
    },
    {
      number: "02",
      title: "تنسيق مريح للقراءة",
      description:
        "اعتماد تنسيق Markdown وهيكلة بصرية مريحة للعين تساعدك على استيعاب العلوم المعقدة بأبسط صورة ممكنة.",
    },
    {
      number: "03",
      title: "مجتمع معرفي مفتوح",
      description:
        "مساحة ميسرة للكتّاب والباحثين لنشر إبداعاتهم في مجالات البرمجة، الفلسفة، اللغات، والعلوم الإنسانية.",
    },
  ];
  return (
    <main className="font-thamaniyah w-full overflow-x-hidden" dir="rtl">
      {/* =========================
          HERO
      ========================== */}
      <section className="relative isolate w-full overflow-hidden">
        {/* Background */}
        <Image
          src="/herobg.jpg"
          fill
          priority
          alt="background"
          className="object-cover -z-20"
        />

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-primary/70" />
        <div className="absolute inset-0 -z-10 bg-black/80" />

        {/* Hero Container */}
        <div
          className="
      mx-auto flex w-full max-w-[1600px]
      flex-col items-center
      gap-8
      px-5 py-12
      sm:px-8 sm:py-16
      md:px-12 md:py-20
      lg:grid lg:grid-cols-2
      lg:gap-30
      lg:px-16 lg:py-20
      xl:px-10 xl:py-24
    "
        >
          {/* =========================
              TEXT
          ========================== */}
          <div
            className="
        order-1 w-full max-w-2xl
        text-center
        lg:text-right
      "
          >
            <h1
              className="
          font-bold text-white
          text-[clamp(2.25rem,6vw,5.5rem)]
          leading-[1.15]
          tracking-tight
        "
            >
              أطــلــق العــنان لقلــمــك!
            </h1>

            <p
              className="
          mx-auto mt-6 max-w-xl
          text-base sm:text-lg md:text-xl
          lg:text-[1.35rem] xl:text-2xl
          leading-[1.9]
          text-white/90
          lg:mx-0
        "
            >
              قبس هي مدونة ناشئة تهدف لاقتباس مختلف العلوم وعرضها في صور مبسطة
              مع المراجعة والدقة في النشر.
            </p>

            {/* Buttons */}
            <div
              className="
          mt-8 flex w-full flex-col gap-3
          sm:flex-row sm:justify-center
          lg:mt-10 lg:justify-start
        "
            >
              <Link
                href="/posts"
                className="
            inline-flex min-h-14 w-full items-center justify-center
            rounded-lg bg-background px-6 py-3
             font-semibold text-dark
            shadow-lg
            transition-all duration-300
            hover:-translate-y-0.5 hover:brightness-110
            sm:w-auto sm:min-w-[170px]
          "
              >
                تصفح المقالات
              </Link>

              <Link
                href="/register"
                className="
            inline-flex min-h-14 w-full items-center justify-center
            rounded-lg border border-accent
            bg-accent/20 px-6 py-3
            text-base font-semibold text-light
            shadow-lg backdrop-blur-sm
            transition-all duration-300
            hover:-translate-y-0.5 hover:bg-accent/30
            sm:w-auto sm:min-w-[170px]
          "
              >
                انشر مقالتك
              </Link>
            </div>
          </div>

          {/* =========================
              HERO IMAGE
          ========================== */}
          <div
            className="
    order-2 flex w-full
    items-center justify-center
    lg:justify-start
  "
          >
            <div
              className="
      relative
      h-[320px] w-[320px]
      sm:h-[400px] sm:w-[400px]
      md:h-[500px] md:w-[500px]
      lg:h-[620px] lg:w-[760px]
      xl:h-[680px] xl:w-[850px]
    "
            >
              <Image
                src="/pngHero1.png"
                alt="رسم توضيحي للكتابة والقراءة"
                fill
                priority
                sizes="
        (max-width: 640px) 320px,
        (max-width: 768px) 400px,
        (max-width: 1024px) 500px,
        (max-width: 1280px) 760px,
        850px
      "
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-full bg-background px-5 py-20 font-thamaniyah sm:px-8 sm:py-24 md:px-12 lg:px-16 xl:px-24"
        dir="rtl"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Header */}
          <div className="mb-14 flex flex-col gap-4 border-b border-primary/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 block text-sm font-semibold tracking-wider text-accent sm:text-base">
                لماذا تقرأ وتكتب معنا؟
              </span>
              <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                ركائز منصة قبس
              </h2>
            </div>
            <p className="max-w-md text-sm leading-[1.8] text-primary/70 sm:text-base">
              نسعى لإنشاء بيئة معرفية عربية تجمع بين رصانة الطرح وجمال العرض
              لتثري المحتوى العربي.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-primary/10 hover:shadow-xl"
              >
                <div>
                  <span className="mb-6 block font-mono text-3xl font-bold text-accent/80 sm:text-4xl">
                    {pillar.number}
                  </span>

                  <h3 className="mb-3 text-xl font-bold text-primary sm:text-2xl">
                    {pillar.title}
                  </h3>

                  <p className="text-sm leading-[2] text-primary/70 sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call To Action Banner */}
          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/10 bg-primary p-8 text-center text-light sm:p-12 md:flex-row md:text-right">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">
                هل لديك معرفة ترغب في مشاركتها؟
              </h3>
              <p className="mt-2 text-sm text-light/70 sm:text-base">
                انضم إلى نخبة الكُتّاب وساهم في إثراء المحتوى العربي اليوم.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-light px-7 py-3.5 text-sm font-bold text-dark transition-all duration-200 hover:bg-accent/80 hover:shadow-lg"
            >
              ابدأ التدوين الآن
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
