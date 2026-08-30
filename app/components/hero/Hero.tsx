import Image from "next/image";
import Link from "next/link";

// بيانات المقالات
const LATEST_POSTS = [
  {
    id: 1,
    title: "أصالة النص العربي في عصر الذكاء الاصطناعي",
    excerpt:
      "كيف نحافظ على الهوية اللغوية والبلاغية للنصوص العربية مع التطور المتسارع لخوارزميات التوليد اللغوي؟",
    category: "اللغويات والتقنية",
    date: "٢٨ أغسطس ٢٠٢٦",
    readTime: "٥ دقائق",
    image: "/herobg.png",
    slug: "#",
  },
  {
    id: 2,
    title: "تطور البنيوية في اللسانيات الحديثة",
    excerpt:
      "قراءة نقدية في الانتقال من النظرية التوزيعية إلى النحو التوليدي وتحليل المكونات المباشرة.",
    category: "لسانيات",
    date: "٢٥ أغسطس ٢٠٢٦",
    readTime: "٧ دقائق",
    image: "/mahbara2.webp",
    slug: "#",
  },
  {
    id: 3,
    title: "مناهج البحث العلمي عند علماء المشرق",
    excerpt:
      "استعراض لأبرز الأدوات التحليلية التي اعتمدها الجاحظ وابن خلدون في توثيق العلوم وتفنيد الآراء.",
    category: "تاريخ العلوم",
    date: "٢٠ أغسطس ٢٠٢٦",
    readTime: "٦ دقائق",
    image: "/herobg.png",
    slug: "#",
  },
];

export default function Hero() {
  return (
    <main className="font-thamaniyah w-full overflow-x-hidden" dir="rtl">
      {/* =========================
          HERO
      ========================== */}
      <section className="relative isolate w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src="/quill.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-primary/70" />

        {/* إضافية لتحسين وضوح المحتوى */}
        <div className="absolute inset-0 -z-10 bg-black/60" />

        {/* Hero Container */}
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:grid lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-24 xl:px-24 xl:py-28">
          {/* =========================
              TEXT
          ========================== */}
          <div className="order-1  w-full max-w-2xl text-center lg:text-right">
            <h1
              className="
                font-bold text-white
                text-[clamp(2.25rem,6vw,5.5rem)]
                leading-[1.15]
                tracking-tight
              "
            >
              أطلق العنان لقلمك!
            </h1>

            <p
              className="
                mx-auto mt-6 max-w-xl
                text-base sm:text-lg md:text-xl lg:text-[1.35rem] xl:text-2xl
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
                href="#"
                className="
                  inline-flex min-h-14 w-full items-center justify-center
                  rounded-lg bg-accent px-6 py-3
                  text-base font-semibold text-light
                  shadow-lg
                  transition-all duration-300
                  hover:brightness-110 hover:-translate-y-0.5
                  sm:w-auto sm:min-w-[170px]
                "
              >
                تصفح المقالات
              </Link>

              <Link
                href="#"
                className="
                  inline-flex min-h-14 w-full items-center justify-center
                  rounded-lg border border-accent
                  bg-accent/20 px-6 py-3
                  text-base font-semibold text-light
                  shadow-lg backdrop-blur-sm
                  transition-all duration-300
                  hover:bg-accent/30 hover:-translate-y-0.5
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
          <div className="order-2 flex w-full items-center justify-center">
            <div
              className="
      relative
      w-full
      max-w-[300px]
      sm:max-w-[380px]
      md:max-w-[480px]
      lg:max-w-[550px]
      xl:max-w-[600px]
      aspect-square
      overflow-hidden
      rounded-2xl
    "
            >
              <Image
                src="/heroBg.png"
                alt="رسم توضيحي للكتابة والقراءة"
                fill
                priority
                sizes="
        (max-width: 640px) 85vw,
        (max-width: 1024px) 55vw,
        (max-width: 1280px) 45vw,
        600px
      "
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          LATEST POSTS
      ========================== */}
      <section className="w-full bg-background px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Section Header */}
          <div
            className="
              mb-10 flex flex-col gap-5
              border-b border-primary/10 pb-6
              sm:mb-12
              md:flex-row md:items-end md:justify-between
            "
          >
            <div>
              <span className="mb-2 block text-sm font-semibold tracking-wider text-accent sm:text-base">
                جديد المنصة
              </span>

              <h2
                className="
                  text-3xl font-bold leading-tight text-primary
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                أحدث المقالات
              </h2>
            </div>

            <Link
              href="/articles"
              className="
                w-fit border-b border-transparent pb-1
                text-sm font-medium text-primary/70
                transition-colors
                hover:border-accent hover:text-accent
                sm:text-base md:text-lg
              "
            >
              عرض الكل
            </Link>
          </div>

          {/* Posts Grid */}
          <div
            className="
              grid grid-cols-1 gap-6
              sm:gap-7
              md:grid-cols-2
              lg:grid-cols-3
              xl:gap-8
            "
          >
            {LATEST_POSTS.map((post) => (
              <article
                key={post.id}
                className="
                  group flex h-full flex-col overflow-hidden
                  rounded-2xl
                  border border-primary/10
                  bg-transparent
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary/5 p-2.5 sm:p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                      "
                      className="
                        object-cover
                        transition-transform duration-500
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                  <div className="p-5 sm:p-6">
                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-primary/60 sm:text-sm">
                      <span className="font-semibold text-accent">
                        {post.category}
                      </span>

                      <span>•</span>

                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        mb-3
                        text-xl font-bold leading-snug text-primary
                        sm:text-2xl
                      "
                    >
                      <Link
                        href={post.slug}
                        className="
                          transition-colors
                          hover:text-accent
                          focus:outline-none
                        "
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="
                        line-clamp-3
                        text-sm leading-[1.9]
                        text-primary/70
                        sm:text-base md:text-lg
                      "
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div
                    className="
                      mt-auto flex items-center justify-between
                      gap-4
                      px-5 pb-5
                      text-xs text-primary/50
                      sm:px-6 sm:pb-6 sm:text-sm
                    "
                  >
                    <span>{post.date}</span>

                    <Link
                      href={post.slug}
                      className="
                        flex shrink-0 items-center gap-1.5
                        font-semibold text-primary
                        transition-colors
                        hover:text-accent
                      "
                    >
                      اقرأ المقال
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
