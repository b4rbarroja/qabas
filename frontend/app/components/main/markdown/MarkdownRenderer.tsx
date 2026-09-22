"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div
      dir="auto"
      className={[
        "prose prose-neutral max-w-none",
        "prose-headings:font-bold prose-headings:text-primary prose-headings:scroll-mt-24",
        "prose-h1:mt-0 prose-h1:text-2xl sm:prose-h1:text-3xl",
        "prose-p:text-base prose-p:leading-[2.2] prose-p:text-dark/90 sm:prose-p:text-lg sm:prose-p:leading-[2.3]",
        "prose-strong:text-primary",
        "prose-a:text-accent prose-a:underline prose-a:decoration-accent/40 prose-a:underline-offset-4 prose-a:transition-colors prose-a:hover:decoration-accent",
        "prose-blockquote:border-accent/40 prose-blockquote:text-dark/70",
        "prose-li:text-base prose-li:leading-[2.1] prose-li:text-dark/90",
        "prose-code:text-primary",
        "prose-pre:rounded-2xl prose-pre:border prose-pre:border-primary/10 prose-pre:bg-[#0d1117] prose-pre:text-[#e6edf3]",
        "prose-table:border-collapse prose-th:border prose-th:border-primary/15 prose-td:border prose-td:border-primary/15",
        "prose-img:rounded-2xl prose-img:border prose-img:border-primary/10",
        "prose-hr:border-primary/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target={/^https?:\/\//.test(href ?? "") ? "_blank" : undefined}
              rel={
                /^https?:\/\//.test(href ?? "")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt ?? ""} loading="lazy" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
