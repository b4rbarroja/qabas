import Link from "next/link";
import PostActions from "../PostActions";
import { Metadata } from "next";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  hashtags: string[];
  readTime: number;
  imageUrl: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    specialization: string | null;
    userImage: string | null;
    bio: string | null;
  };
}

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

// ==========================================
// 1. إضافة دالة generateMetadata ديناميكية للـ WhatsApp & Social Media
// ==========================================
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        title: "المقال غير موجود | قبس",
        description: "المقال الذي تبحث عنه غير متوفر.",
      };
    }

    const post: Post = await response.json();

    // تجهيز رابط الصورة المطلق (مهم جداً للواتساب)
    let ogImageUrl = post.imageUrl;
    if (ogImageUrl && !ogImageUrl.startsWith("http")) {
      ogImageUrl = `http://localhost:5000${ogImageUrl}`;
    }

    return {
      title: `${post.title} | قبس`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.createdAt,
        authors: [post.author?.name || "قبس"],
        images: ogImageUrl
          ? [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: ogImageUrl ? [ogImageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "قبس | منصة المقالات",
      description: "اقرأ أحدث المقالات على منصة قبس",
    };
  }
}

// ==========================================
// 2. المكون الرئيسي للصفحة
// ==========================================
export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <main
        dir="rtl"
        className="min-h-screen w-full bg-background font-thamaniyah text-dark"
      >
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center px-5 sm:px-8 md:px-12">
          <div className="w-full max-w-lg rounded-2xl border border-primary/10 bg-primary/5 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-light">
              !
            </div>

            <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
              المقال غير موجود
            </h1>

            <p className="mt-3 text-sm leading-7 text-dark/60">
              المقال الذي تبحث عنه غير متوفر حالياً.
            </p>

            <Link
              href="/posts"
              className="mt-7 inline-flex items-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-light transition-all duration-200 hover:bg-accent hover:shadow-md"
            >
              العودة إلى المقالات
              <span className="mr-3">←</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const post: Post = await response.json();

  return (
    <article
      className="w-full bg-background font-thamaniyah text-dark"
      dir="rtl"
    >
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
            <Link href="/" className="transition-colors hover:text-accent">
              الرئيسية
            </Link>

            <span>/</span>

            <Link href="/posts" className="transition-colors hover:text-accent">
              المقالات
            </Link>

            <span>/</span>

            <span className="max-w-[200px] truncate font-bold text-primary/80 sm:max-w-md">
              المقال
            </span>
          </nav>

          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-2xl bg-primary px-3 py-1 text-xs font-semibold text-light shadow-xs">
              مقال
            </span>

            <span className="text-xs font-medium text-primary/60 sm:text-sm">
              {new Date(post.createdAt).toLocaleDateString("ar-EG")}
            </span>

            <span className="text-primary/30">•</span>

            <span className="text-xs font-medium text-primary/60 sm:text-sm">
              وقت القراءة: {post.readTime} دقائق
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 max-w-5xl text-2xl font-bold leading-[1.4] text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-3xl text-base leading-[2] text-dark/80 sm:text-lg md:text-xl">
            {post.description}
          </p>

          {/* Author */}
          <div className="flex flex-col gap-5 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              {post.author?.userImage ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-primary/20 bg-primary">
                  <img
                    src={post.author.userImage}
                    alt={post.author.name}
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary text-sm font-bold text-light">
                  {post.author?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h2 className="text-sm font-bold text-primary sm:text-base">
                  {post.author?.name || "كاتب غير معروف"}
                </h2>

                <p className="text-xs text-primary/60">
                  {post.author?.specialization || "كاتب في مدونة قبس"}
                </p>
              </div>
            </div>

            {/* Share */}
            <PostActions title={post.title} />
          </div>
        </div>
      </header>

      {/* =========================
          FEATURED IMAGE
      ========================== */}
      {post.imageUrl && (
        <div className="mx-auto w-full max-w-[1200px] px-5 pt-8 sm:px-8 sm:pt-10 md:px-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/10 shadow-lg md:aspect-[21/9]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      )}

      {/* =========================
          MAIN ARTICLE BODY
      ========================== */}
      <main className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Content */}
          <div className="lg:col-span-8">
            <div className="space-y-10">
              {post.content.split("\n").map((paragraph, index) => {
                if (!paragraph.trim()) return null;

                return (
                  <p
                    key={index}
                    className="text-base leading-[2.2] text-dark/90 sm:text-lg sm:leading-[2.3]"
                  >
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            {post.hashtags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-primary/10 pt-6">
                <span className="text-xs font-bold text-primary/70 sm:text-sm">
                  الوسوم:
                </span>

                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-2xl border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Box */}
            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:flex-row sm:items-start sm:p-8">
              {post.author?.userImage ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/20 bg-primary shadow-sm">
                  <img
                    src={post.author.userImage}
                    alt={post.author.name}
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary text-lg font-bold text-light shadow-sm">
                  {post.author?.name?.charAt(0)}
                </div>
              )}

              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  عن الكاتب
                </span>

                <h3 className="mt-1 text-lg font-bold text-primary sm:text-xl">
                  {post.author?.name || "كاتب غير معروف"}
                </h3>

                <p className="text-xs font-semibold text-primary/60">
                  {post.author?.specialization || "كاتب في مدونة قبس"}
                </p>

                {post.author?.bio && (
                  <p className="mt-3 text-sm leading-[1.9] text-dark/80 sm:text-base">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Back Navigation */}
            <nav
              aria-label="التنقل بين المقالات"
              className="mt-12 border-t border-primary/10 pt-8"
            >
              <Link
                href="/posts"
                className="group flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-medium text-accent">
                    العودة
                  </span>

                  <span className="mt-1.5 block text-sm font-bold text-primary transition-colors group-hover:text-accent sm:text-base">
                    تصفح جميع المقالات
                  </span>
                </div>
              </Link>
            </nav>
          </div>

          {/* =========================
              SIDEBAR
          ========================== */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Post Information */}
              <div className="rounded-2xl border border-primary/10 bg-background p-6 shadow-xs">
                <h3 className="mb-4 text-base font-bold text-primary sm:text-lg">
                  معلومات المقال
                </h3>

                <dl className="space-y-3.5 text-xs text-primary/70 sm:text-sm">
                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">النوع</dt>
                    <dd className="font-bold text-primary">مقال</dd>
                  </div>

                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">تاريخ النشر</dt>
                    <dd className="font-semibold text-primary">
                      {new Date(post.createdAt).toLocaleDateString("ar-EG")}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-b border-primary/5 pb-2.5">
                    <dt className="text-primary/50">زمن القراءة</dt>
                    <dd className="font-semibold text-primary">
                      {post.readTime} دقائق
                    </dd>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <dt className="text-primary/50">الكاتب</dt>
                    <dd className="max-w-[150px] truncate font-bold text-primary">
                      {post.author?.name || "كاتب غير معروف"}
                    </dd>
                  </div>
                </dl>

                {/* Share */}
                <div className="mt-6 border-t border-primary/10 pt-5">
                  <span className="mb-3 block text-xs font-semibold text-primary/70">
                    شارك المقال:
                  </span>

                  <PostActions title={post.title} />
                </div>
              </div>

              {/* All Posts */}
              <Link
                href="/posts"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-light shadow-md transition-all duration-200 hover:bg-accent hover:shadow-lg"
              >
                <span>تصفح جميع المقالات</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </article>
  );
}
