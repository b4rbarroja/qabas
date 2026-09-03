"use client";

import { useState } from "react";

interface PostActionsProps {
  title: string;
}

export default function PostActions({ title }: PostActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`قراءة ممتعة: "${title}" عبر مدونة قبس`);
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${title}" - مدونة قبس:\n${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-background px-3.5 py-2 text-xs font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-primary/5 active:scale-95"
        title="نسخ الرابط"
      >
        <svg
          className="h-4 w-4 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span>{copied ? "تم نسخ الرابط! ✓" : "نسخ الرابط"}</span>
      </button>

      {/* Twitter / X */}
      <button
        onClick={handleShareTwitter}
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/10 bg-background text-primary transition-all duration-200 hover:bg-primary hover:text-light active:scale-95"
        title="مشاركة على X"
        aria-label="مشاركة على منصة إكس"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleShareWhatsApp}
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/10 bg-background text-primary transition-all duration-200 hover:bg-emerald-700 hover:text-white active:scale-95"
        title="مشاركة على واتساب"
        aria-label="مشاركة على واتساب"
      >
        <svg
          className="h-4 w-4 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleShareLinkedIn}
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/10 bg-background text-primary transition-all duration-200 hover:bg-[#0077b5] hover:text-white active:scale-95"
        title="مشاركة على لينكدإن"
        aria-label="مشاركة على لينكدإن"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
        </svg>
      </button>
    </div>
  );
}
