"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    avatar: string | null;
    bio: string | null;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <div className="mb-5 flex items-center gap-3 text-sm text-dark/50">
                <span>مدونة قبس</span>
                <span className="h-px w-8 bg-primary/30" />
                <span>المقالات</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                المقالات
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-dark/60 md:text-lg">
                مساحة للقراءة والتأمل والكتابة، نشارك فيها أفكارًا ومعارف وتجارب
                تستحق أن تُقرأ.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-primary/10 bg-background px-5 py-3">
                  <span className="text-xl font-bold">{posts.length}</span>
                  <span className="mr-2 text-sm text-dark/50">مقال منشور</span>
                </div>

                <div className="rounded-2xl border border-primary/10 bg-background px-5 py-3 text-sm text-dark/50">
                  قراءة • معرفة • أثر
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-primary/70">
                أحدث ما كتبناه
              </p>

              <h2 className="text-2xl font-bold md:text-3xl">أحدث المقالات</h2>
            </div>

            {!loading && posts.length > 0 && (
              <span className="hidden text-sm text-dark/40 sm:block">
                {posts.length} مقالة
              </span>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-primary/10 bg-background"
                >
                  <div className="aspect-[16/10] animate-pulse bg-primary/5" />

                  <div className="space-y-4 p-6">
                    <div className="h-4 w-24 animate-pulse rounded-full bg-primary/5" />
                    <div className="h-7 w-4/5 animate-pulse rounded-full bg-primary/5" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-primary/5" />
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-primary/5" />

                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-2xl bg-primary/5" />
                      <div className="h-4 w-24 animate-pulse rounded-full bg-primary/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && posts.length === 0 && (
            <div className="rounded-2xl border border-primary/10 bg-primary/5 px-6 py-16 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/10 bg-background text-2xl">
                  ✦
                </div>

                <h3 className="text-xl font-bold">لا توجد مقالات حتى الآن</h3>

                <p className="mt-3 text-sm leading-7 text-dark/50">
                  يبدو أن مساحة الكتابة ما زالت تنتظر أول فكرة.
                </p>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && posts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl font-bold text-primary/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}

                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-sm font-medium text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <div className="mb-4 text-xs text-dark/40">
                      {new Date(post.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold leading-8 transition-colors duration-300 group-hover:text-primary md:text-2xl">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-dark/55">
                      {post.description}
                    </p>

                    {/* Bottom */}
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-primary/10 pt-5">
                      <div className="flex min-w-0 items-center gap-3">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-10 w-10 shrink-0 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-sm font-bold text-primary">
                            {post.author.name?.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {post.author.name}
                          </p>

                          {post.author.specialization && (
                            <p className="truncate text-xs text-dark/40">
                              {post.author.specialization}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 text-xs text-dark/40">
                        {post.readTime} دقيقة
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-primary/10 bg-primary/5 px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-medium text-primary/70">
                  مساحة للأفكار
                </p>

                <h2 className="text-2xl font-bold leading-tight md:text-4xl">
                  الكتابة تبدأ بفكرة.
                </h2>

                <p className="mt-3 text-sm leading-7 text-dark/50 md:text-base">
                  اقرأ، تأمل، اكتب، واترك أثرًا يستحق أن يبقى.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex w-fit items-center justify-center rounded-2xl border border-primary/15 bg-background px-6 py-3 text-sm font-semibold text-dark transition-all duration-300 hover:border-primary/30 hover:bg-primary hover:text-light"
              >
                استكشف مدونة قبس
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
