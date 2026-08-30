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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      dir="rtl"
      className="
        w-full
        overflow-hidden
        bg-background
        px-5 py-14
        font-thamaniyah text-dark
        sm:px-8 sm:py-16
        md:px-12 md:py-20
        lg:px-16 lg:py-24
        xl:px-24 xl:py-28
      "
    >
      <div
        className="
          mx-auto grid w-full max-w-[1600px]
          grid-cols-1
          items-start
          gap-12
          lg:grid-cols-12
          lg:gap-14
          xl:gap-20
        "
      >
        {/* =====================================================
            CONTACT INFO
        ====================================================== */}
        <div
          className="
            w-full
            text-center
            lg:col-span-5
            lg:text-right
          "
        >
          <span
            className="
              mb-3 block
              text-sm font-semibold
              tracking-wider text-accent
              sm:text-base
            "
          >
            تواصل معنا
          </span>

          <h2
            className="
              mb-6
              text-[clamp(2.25rem,5.5vw,5rem)]
              font-bold
              leading-[1.15]
              text-primary
              sm:mb-8
            "
          >
            صدرنا رحب لتلقي الاستفسارات
          </h2>

          <p
            className="
              mx-auto mb-8
              max-w-2xl
              text-base
              leading-[1.9]
              text-primary/70
              sm:text-lg
              md:text-xl
              lg:mx-0
              lg:text-[1.35rem]
            "
          >
            هل لديك استفسار، اقتراح، أو رغبة في المشاركة بالكتابة؟ يسعدنا دائماً
            استلام رسائلك والتواصل مع الكتاب والمفكرين.
          </p>

          {/* Contact Details */}
          <div
            className="
              flex flex-col gap-7
              border-t border-primary/10
              pt-8
              text-right
              sm:gap-8 sm:pt-10
            "
          >
            {/* Email */}
            <div className="group flex items-start gap-4 sm:gap-5">
              <div
                className="
                  flex shrink-0 items-center justify-center
                  rounded-xl
                  border border-primary/10
                  bg-primary/5
                  p-3
                  text-accent
                  transition-all duration-300
                  group-hover:border-accent
                  group-hover:bg-accent
                  group-hover:text-light
                  sm:p-4
                "
              >
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h4
                  className="
                    text-base font-bold
                    text-primary
                    transition-colors duration-300
                    group-hover:text-accent
                    sm:text-lg
                  "
                >
                  البريد الإلكتروني
                </h4>

                <a
                  href="mailto:contact@qabas.com"
                  dir="ltr"
                  className="
                    mt-1 block
                    w-fit
                    max-w-full
                    break-all
                    text-left
                    font-sans
                    text-sm text-primary/70
                    transition-colors
                    hover:text-accent
                    sm:text-base
                  "
                >
                  contact@qabas.com
                </a>
              </div>
            </div>

            {/* Publishing */}
            <div className="group flex items-start gap-4 sm:gap-5">
              <div
                className="
                  flex shrink-0 items-center justify-center
                  rounded-xl
                  border border-primary/10
                  bg-primary/5
                  p-3
                  text-accent
                  transition-all duration-300
                  group-hover:border-accent
                  group-hover:bg-accent
                  group-hover:text-light
                  sm:p-4
                "
              >
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h4
                  className="
                    text-base font-bold
                    text-primary
                    transition-colors duration-300
                    group-hover:text-accent
                    sm:text-lg
                  "
                >
                  النشر والمشاركات
                </h4>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-[1.8]
                    text-primary/70
                    sm:text-base
                  "
                >
                  نرحب بجميع المقالات والأبحاث اللغوية والأدبية.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}
        <div
          className="
            w-full
            rounded-2xl
            border border-primary/10
            bg-transparent
            p-5
            shadow-sm
            transition-all duration-300
            hover:border-primary/25
            sm:p-7
            md:p-8
            lg:col-span-7
            lg:p-10
            xl:p-12
          "
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6 md:gap-7"
          >
            {/* Name + Email */}
            <div
              className="
                grid grid-cols-1 gap-5
                sm:grid-cols-2
                sm:gap-6
                md:gap-7
              "
            >
              {/* Name */}
              <div className="flex min-w-0 flex-col gap-2.5">
                <label
                  htmlFor="name"
                  className="text-base font-medium text-primary sm:text-lg"
                >
                  الاسم الكامل
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك"
                  className="
                    min-w-0 w-full
                    rounded-xl
                    border border-primary/10
                    bg-primary/5
                    px-4 py-3.5
                    text-sm text-primary
                    outline-none
                    transition-all
                    placeholder:text-primary/40
                    hover:border-primary/30
                    focus:border-accent
                    focus:bg-background
                    sm:px-5 sm:py-4
                    sm:text-base
                  "
                />
              </div>

              {/* Email */}
              <div className="flex min-w-0 flex-col gap-2.5">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-primary sm:text-lg"
                >
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  dir="ltr"
                  className="
                    min-w-0 w-full
                    rounded-xl
                    border border-primary/10
                    bg-primary/5
                    px-4 py-3.5
                    text-left
                    font-sans
                    text-sm text-primary
                    outline-none
                    transition-all
                    placeholder:text-primary/40
                    hover:border-primary/30
                    focus:border-accent
                    focus:bg-background
                    sm:px-5 sm:py-4
                    sm:text-base
                  "
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex min-w-0 flex-col gap-2.5">
              <label
                htmlFor="subject"
                className="text-base font-medium text-primary sm:text-lg"
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
                className="
                  min-w-0 w-full
                  rounded-xl
                  border border-primary/10
                  bg-primary/5
                  px-4 py-3.5
                  text-sm text-primary
                  outline-none
                  transition-all
                  placeholder:text-primary/40
                  hover:border-primary/30
                  focus:border-accent
                  focus:bg-background
                  sm:px-5 sm:py-4
                  sm:text-base
                "
              />
            </div>

            {/* Message */}
            <div className="flex min-w-0 flex-col gap-2.5">
              <label
                htmlFor="message"
                className="text-base font-medium text-primary sm:text-lg"
              >
                الرسالة
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="اكتب رسالتك هنا..."
                className="
                  min-h-[160px] w-full
                  resize-none
                  rounded-xl
                  border border-primary/10
                  bg-primary/5
                  px-4 py-3.5
                  text-sm text-primary
                  outline-none
                  transition-all
                  placeholder:text-primary/40
                  hover:border-primary/30
                  focus:border-accent
                  focus:bg-background
                  sm:min-h-[180px]
                  sm:px-5 sm:py-4
                  sm:text-base
                "
              />
            </div>

            {/* Submit */}
            <div
              className="
                mt-2 flex flex-col gap-4
                sm:mt-3
                sm:flex-row
                sm:items-center
                sm:gap-5
              "
            >
              <button
                type="submit"
                className="
                  inline-flex
                  min-h-14
                  w-full
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border
                  bg-gold
                  px-7 py-3.5
                  text-base font-bold
                  text-primary
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-accent
                  hover:text-light
                  hover:shadow-lg
                  active:translate-y-0
                  sm:w-auto
                  sm:min-w-[180px]
                  sm:px-10
                  sm:text-lg
                "
              >
                إرسال الرسالة
              </button>

              <p
                className="
                  text-center
                  text-xs
                  leading-[1.8]
                  text-primary/60
                  sm:text-right
                  sm:text-sm
                  md:text-base
                "
              >
                بإرسالك هذه الرسالة، فإنك توافق على{" "}
                <Link
                  href="/privacy"
                  className="
                    font-medium
                    text-accent
                    underline
                    underline-offset-2
                    transition-colors
                    hover:text-primary
                  "
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
