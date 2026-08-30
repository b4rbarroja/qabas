"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-background px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 lg:py-20 font-thamaniyah text-dark">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        <div className="w-full lg:w-5/12 text-right">
          <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider block mb-2">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
            يسعدنا التحدث إليك في قبس
          </h2>
          <p className="text-primary/70 text-base lg:text-lg leading-relaxed mb-8">
            هل لديك استفسار، اقتراح، أو رغبة في المشاركة بالكتابة؟ يسعدنا دائماً
            استلام رسائلك والتواصل مع الكتاب والمفكرين.
          </p>

          <div className="flex flex-col gap-6 border-t border-primary/10 pt-8">
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-accent group-hover:bg-accent group-hover:text-light group-hover:border-accent transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  البريد الإلكتروني
                </h4>
                <p className="text-sm text-primary/70 font-sans mt-0.5">
                  contact@qabas.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-accent group-hover:bg-accent group-hover:text-light group-hover:border-accent transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  النشر والمشاركات
                </h4>
                <p className="text-sm text-primary/70 mt-0.5">
                  نرحب بجميع المقالات والأبحاث اللغوية والأدبية.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 bg-transparent rounded-2xl border border-primary/10 p-6 sm:p-10 shadow-sm hover:border-primary/25 transition-all duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-primary"
                >
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 focus:border-accent focus:bg-background focus:outline-none transition-all text-sm text-primary placeholder:text-primary/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-primary"
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 focus:border-accent focus:bg-background focus:outline-none transition-all text-sm text-primary placeholder:text-primary/40 dir-ltr text-right"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-primary"
              >
                موضوع الرسالة
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="عن ماذا تود التحدث؟"
                className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 focus:border-accent focus:bg-background focus:outline-none transition-all text-sm text-primary placeholder:text-primary/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-primary"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="اكتب رسالتك هنا..."
                className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 focus:border-accent focus:bg-background focus:outline-none transition-all text-sm text-primary placeholder:text-primary/40 resize-none"
              ></textarea>
            </div>

            {/* أزرار الإرسال والنص الخاص بسياسة الخصوصية */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                className="border bg-gold text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-accent hover:text-light transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm cursor-pointer active:translate-y-0"
              >
                إرسال الرسالة
              </button>
              <p className="text-xs text-primary/60 leading-relaxed">
                بإرسالك هذه الرسالة، فإنك توافق على{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline underline-offset-2 hover:text-primary transition-colors font-medium"
                >
                  سياسة الخصوصية
                </Link>{" "}
                وشروط الاستخدام الخاصة بنا.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
