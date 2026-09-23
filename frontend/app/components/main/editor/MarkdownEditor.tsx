"use client";

import { useRef } from "react";
import {
  Bold,
  Code,
  FileCode2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  name?: string;
  placeholder?: string;
}

const HEADING_PREFIX = /^#{1,6}\s+/;

export default function MarkdownEditor({
  value,
  onChange,
  rows = 8,
  required,
  name,
  placeholder = "اكتب نص المقال هنا... استخدم شريط الأدوات أعلاه لتنسيق العناوين والنص",
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const restoreSelection = (start: number, end: number) => {
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(start, end);
    });
  };

  const applyLinePrefix = (mode: "h1" | "h2" | "h3" | "quote" | "ul" | "ol") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    const blockStart = value.lastIndexOf("\n", start - 1) + 1;
    let blockEnd = value.indexOf("\n", end);
    if (blockEnd === -1) blockEnd = value.length;

    const block = value.slice(blockStart, blockEnd);
    const lines = block.split("\n");

    const transformed = lines.map((line) => {
      switch (mode) {
        case "h1":
        case "h2":
        case "h3": {
          const target = mode === "h1" ? "# " : mode === "h2" ? "## " : "### ";
          if (line.startsWith(target)) return line.slice(target.length);
          return target + line.replace(HEADING_PREFIX, "");
        }
        case "quote":
          return line.startsWith("> ") ? line.slice(2) : "> " + line;
        case "ul":
          return line.startsWith("- ") ? line.slice(2) : "- " + line;
        case "ol":
          return /^\d+\.\s/.test(line)
            ? line.replace(/^\d+\.\s/, "")
            : "1. " + line;
      }
    });

    const newBlock = transformed.join("\n");
    const newValue = value.slice(0, blockStart) + newBlock + value.slice(blockEnd);
    onChange(newValue);
    restoreSelection(blockStart, blockStart + newBlock.length);
  };

  const wrapSelection = (mark: string, placeholderText: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholderText;
    const inner = value.slice(start, end) ? selected : "";
    const insert = mark + (inner || placeholderText) + mark;
    const newValue = value.slice(0, start) + insert + value.slice(end);
    onChange(newValue);
    if (start === end) {
      restoreSelection(start + mark.length, start + mark.length + placeholderText.length);
    } else {
      restoreSelection(start, start + insert.length);
    }
  };

  const insertCodeBlock = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const insert = selected
      ? "\n```\n" + selected + "\n```\n"
      : "\n```\n\n```\n";
    const newValue = value.slice(0, start) + insert + value.slice(end);
    onChange(newValue);
    if (selected) {
      restoreSelection(start, start + insert.length);
    } else {
      restoreSelection(start + 5, start + 6);
    }
  };

  const insertLink = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const linkText = selected || "نص الرابط";
    const insert = "[" + linkText + "](https://)";
    const newValue = value.slice(0, start) + insert + value.slice(end);
    onChange(newValue);
    const urlStart = start + linkText.length + 3;
    restoreSelection(urlStart, urlStart + 8);
  };

  const btn =
    "p-1.5 rounded-lg text-gray-500 hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center justify-center";

  return (
    <div className="rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-black/5 overflow-hidden bg-white">
      <div
        dir="ltr"
        className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5"
      >
        <button type="button" title="عنوان رئيسي H1" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("h1")}>
          <Heading1 size={16} />
        </button>
        <button type="button" title="عنوان فرعي H2" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("h2")}>
          <Heading2 size={16} />
        </button>
        <button type="button" title="عنوان H3" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("h3")}>
          <Heading3 size={16} />
        </button>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <button type="button" title="غامق (Bold)" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("**", "نص غامق")}>
          <Bold size={16} />
        </button>
        <button type="button" title="مائل (Italic)" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("*", "نص مائل")}>
          <Italic size={16} />
        </button>
        <button type="button" title="يتوسطه خط (Strikethrough)" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("~~", "نص مشطوب")}>
          <Strikethrough size={16} />
        </button>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <button type="button" title="كود داخل السطر" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("`", "code")}>
          <Code size={16} />
        </button>
        <button type="button" title="كتلة كود" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={insertCodeBlock}>
          <FileCode2 size={16} />
        </button>
        <button type="button" title="رابط" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={insertLink}>
          <Link2 size={16} />
        </button>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <button type="button" title="اقتباس" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("quote")}>
          <Quote size={16} />
        </button>
        <button type="button" title="قائمة نقطية" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("ul")}>
          <List size={16} />
        </button>
        <button type="button" title="قائمة مرقمة" className={btn} onMouseDown={(e) => e.preventDefault()} onClick={() => applyLinePrefix("ol")}>
          <ListOrdered size={16} />
        </button>
      </div>

      <textarea
        ref={textareaRef}
        rows={rows}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 resize-none border-0 focus:outline-none bg-white text-sm leading-7"
      />
    </div>
  );
}
