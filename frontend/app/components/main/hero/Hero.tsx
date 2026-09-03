import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/lib/posts";

export default function Hero() {
  const latestPosts = POSTS.slice(0, 3);

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
              href="/posts"
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
            {latestPosts.map((post) => (
              <article
                key={post.id}
                className="
      group flex h-full flex-col overflow-hidden
      rounded-2xl
      bg-background
      border border-primary/10
      shadow-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
              >
                {/* Image */}
                <Link
                  href={`/posts/${post.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl block"
                >
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

                  {/* Category Badge */}
                  <span
                    className="
          absolute bottom-2.5 right-2.5
          rounded-md
          bg-primary/90
          px-3 py-1.5
          text-xs font-medium
          text-light
          backdrop-blur-sm
          sm:text-sm
        "
                  >
                    {post.category}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
                  {/* Meta */}
                  <div
                    className="
          mb-2.5 flex items-center justify-between
          gap-3
          text-xs font-medium
          text-primary/50
          sm:text-sm
        "
                  >
                    <span>{post.date}</span>

                    <span className="flex items-center gap-1.5">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
          mb-2.5
          text-lg font-bold leading-snug
          text-primary
          sm:text-xl
        "
                  >
                    <Link
                      href={`/posts/${post.slug}`}
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
          sm:text-base
        "
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="mt-auto flex justify-end items-center pt-3">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="
      inline-flex items-center justify-center
      self-start
      rounded-md
      bg-primary
      px-5 py-2.5
      text-sm font-semibold
      text-light
      transition-all duration-200
      hover:bg-accent
    "
                    >
                      أكمل القراءة «
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
