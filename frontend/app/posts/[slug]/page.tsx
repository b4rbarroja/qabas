import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/posts";
import PostActions from "./PostActions";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "المقال غير موجود | قبس",
      description: "المقال المطلوب غير متوفر حالياً.",
    };
  }

  return {
    title: `${post.title} | مدونة قبس`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, post.category, 3);
  const { prev, next } = getAdjacentPosts(post.id);

  return (
    <article className="w-full bg-background font-thamaniyah text-dark" dir="rtl">
      {/* =========================
          HERO / HEADER
      ========================== */}
      <header className="relative isolate w-full border-b border-primary/10 bg-primary/5 py-10 sm:py-14 md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 md:px-12">
          {/* Breadcrumb */}
          <nav
            aria-label="مسار التصفح"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-primary/60 sm:text-sm"
          >
            <Link
              href="/"
              className="transition-colors hover:text-accent"
            >
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              href="/posts"
              className="transition-colors hover:text-accent"
            >
              التدوينات
            </Link>
            <span>/</span>
            <span className="truncate text-primary/80 font-bold max-w-[200px] sm:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Category Badge & Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-light shadow-xs">
              {post.category}
            </span>
            <span className="text-xs font-medium text-primary/60 sm:text-sm">
              {post.date}
            </span>
            <span className="text-primary/30">•</span>
            <span className="text-xs font-medium text-primary/60 sm:text-sm">
              وقت القراءة: {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-2xl font-bold leading-[1.3] text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 max-w-3xl text-base leading-[2] text-dark/80 sm:text-lg md:text-xl">
            {post.excerpt}
          </p>

          {/* Author info & Actions bar */}
          <div className="flex flex-col gap-5 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Author */}
            <div className="flex items-center gap-3.5">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="h-9 w-9 object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-primary sm:text-base">
                  {post.author.name}
                </h2>
                <p className="text-xs text-primary/60">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Post Actions (Share / Copy) */}
            <PostActions title={post.title} />
          </div>
        </div>
      </header>

      {/* =========================
          FEATURED IMAGE
      ========================== */}
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-8 sm:px-8 sm:pt-10 md:px-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/10 shadow-lg md:aspect-[21/9]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* =========================
          MAIN ARTICLE BODY
      ========================== */}
      <main className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Content Column */}
          <div className="lg:col-span-8">
            <div className="space-y-10">
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-5">
                  {section.heading && (
                    <h2 className="relative pt-2 text-xl font-bold leading-snug text-primary sm:text-2xl md:text-3xl">
                      <span className="absolute -right-4 top-4.5 h-4 w-1.5 rounded-full bg-accent sm:-right-5" />
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base leading-[2.2] text-dark/90 sm:text-lg sm:leading-[2.3]"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Blockquote */}
                  {section.quote && (
                    <blockquote className="relative my-6 overflow-hidden rounded-xl border-r-4 border-accent bg-accent/10 p-6 sm:p-7">
                      <p className="font-semibold leading-[2] text-primary sm:text-lg">
                        &ldquo;{section.quote.text}&rdquo;
                      </p>
                      {section.quote.author && (
                        <footer className="mt-3 text-xs font-bold text-accent sm:text-sm">
                          — {section.quote.author}
                        </footer>
                      )}
                    </blockquote>
                  )}

                  {/* Bullet points */}
                  {section.bullets && (
                    <ul className="my-4 space-y-3 pr-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-base leading-[2] text-dark/85 sm:text-lg"
                        >
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Callout box */}
                  {section.callout && (
                    <div className="my-6 rounded-xl border border-accent/30 bg-primary/5 p-5 sm:p-6">
                      <div className="flex items-start gap-3.5">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-light">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium leading-[1.9] text-primary sm:text-base">
                          {section.callout}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-primary/10 pt-6">
              <span className="text-xs font-bold text-primary/70 sm:text-sm">
                الوسوم:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Box */}
            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:flex-row sm:items-start sm:p-8">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary shadow-sm">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain p-1"
                />
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  عن الكاتب
                </span>
                <h3 className="mt-1 text-lg font-bold text-primary sm:text-xl">
                  {post.author.name}
                </h3>
                <p className="text-xs font-semibold text-primary/60">
                  {post.author.role}
                </p>
                <p className="mt-3 text-sm leading-[1.9] text-dark/80 sm:text-base">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            <nav
              aria-label="التنقل بين المقالات"
              className="mt-12 grid grid-cols-1 gap-4 border-t border-primary/10 pt-8 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="group flex flex-col rounded-xl border border-primary/10 bg-background p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="text-xs font-medium text-accent">
                    « المقال السابق
                  </span>
                  <span className="mt-1.5 text-sm font-bold text-primary transition-colors group-hover:text-accent sm:text-base">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group flex flex-col items-end text-left rounded-xl border border-primary/10 bg-background p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:text-right"
                >
                  <span className="text-xs font-medium text-accent">
                    المقال التالي »
                  </span>
                  <span className="mt-1.5 text-sm font-bold text-primary transition-colors group-hover:text-accent sm:text-base">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>

          {/* =========================
              SIDEBAR
          ========================== */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Summary Card */}
              <div className="rounded-2xl border border-primary/10 bg-background p-6 shadow-xs">
                <h3 className="mb-4 text-base font-bold text-primary sm:text-lg">
                  معلومات التدوينة
                </h3>
                <dl className="space-y-3.5 text-xs text-primary/70 sm:text-sm">
                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">القسم</dt>
                    <dd className="font-bold text-primary">{post.category}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">تاريخ النشر</dt>
                    <dd className="font-semibold text-primary">{post.date}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">زمن القراءة</dt>
                    <dd className="font-semibold text-primary">{post.readTime}</dd>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <dt className="text-primary/50">الكاتب</dt>
                    <dd className="font-bold text-primary">{post.author.name}</dd>
                  </div>
                </dl>

                {/* Share within sidebar */}
                <div className="mt-6 border-t border-primary/10 pt-5">
                  <span className="mb-3 block text-xs font-semibold text-primary/70">
                    شارك المقال:
                  </span>
                  <PostActions title={post.title} />
                </div>
              </div>

              {/* Back to all posts */}
              <Link
                href="/posts"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-light shadow-md transition-all duration-200 hover:bg-accent hover:shadow-lg"
              >
                <span>تصفح جميع التدوينات</span>
                <span>←</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================
          RELATED POSTS SECTION
      ========================== */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-primary/10 bg-primary/5 px-5 py-14 sm:px-8 sm:py-16 md:px-12">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                  قراءات مقترحة
                </span>
                <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
                  مقالات ذات صلة
                </h2>
              </div>

              <Link
                href="/posts"
                className="text-xs font-bold text-primary/70 transition-colors hover:text-accent sm:text-sm"
              >
                عرض كل التدوينات ←
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/posts/${rPost.slug}`}
                  className="group block"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-background shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={rPost.image}
                        alt={rPost.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 rounded-md bg-primary/90 px-2.5 py-1 text-xs font-medium text-light backdrop-blur-xs">
                        {rPost.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center justify-between text-xs text-primary/60">
                        <span>{rPost.date}</span>
                        <span>{rPost.readTime}</span>
                      </div>

                      <h3 className="mb-2 text-base font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                        {rPost.title}
                      </h3>

                      <p className="line-clamp-2 text-xs leading-relaxed text-primary/70 sm:text-sm">
                        {rPost.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-end pt-4">
                        <span className="text-xs font-bold text-primary transition-colors group-hover:text-accent">
                          قراءة المقال ←
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
