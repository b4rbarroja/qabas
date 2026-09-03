"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/lib/posts";

export default function PostsHero() {
  // =========================
  // PAGINATION LOGIC
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;

  const totalPages = Math.ceil(POSTS.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = POSTS.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <main className="w-full overflow-x-hidden font-thamaniyah" dir="rtl">
      {/* =========================
          HERO
      ========================== */}
      <section className="relative isolate w-full overflow-hidden">
        <Image
          src="/herobg.jpg"
          fill
          priority
          alt="background"
          className="-z-20 object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-primary/70" />
        <div className="absolute inset-0 -z-10 bg-black/80" />

        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:grid lg:grid-cols-2 lg:gap-30 lg:px-16 lg:py-20 xl:px-10 xl:py-24">
          <div className="order-1 w-full max-w-2xl text-center lg:text-right">
            <h1 className="font-bold text-white text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.15] tracking-tight">
              قسم المقالات
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg md:text-xl lg:text-[1.35rem] xl:text-2xl leading-[1.9] text-white/90 lg:mx-0">
              هنا يتم نشر أحدث المقالات التي تم قبولها واعتمادها، قراءة سعيدة.
            </p>
          </div>

          <div className="order-2 flex w-full items-center justify-center lg:justify-start">
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[620px] lg:w-[760px] xl:h-[680px] xl:w-[850px]">
              <Image
                src="/pngHero1.png"
                alt="رسم توضيحي للكتابة والقراءة"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 500px, (max-width: 1280px) 760px, 850px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          POSTS SECTION
      ========================== */}
      <section className="w-full bg-background px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1700px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group block"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-background shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 rounded-md bg-primary/90 px-2.5 py-1 text-xs font-medium text-light backdrop-blur-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-primary/60">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mb-2 text-base font-bold leading-snug text-primary sm:text-lg group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-primary/70 sm:text-sm">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-end pt-2 border-t border-primary/5">
                      <span className="inline-flex items-center justify-center rounded-md bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-light">
                        أكمل القراءة «
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-primary/10 px-3 py-2 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
              >
                السابق
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-primary text-light shadow-xs"
                        : "border border-primary/10 bg-background text-primary hover:bg-primary/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-primary/10 px-3 py-2 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
