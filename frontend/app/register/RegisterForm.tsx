"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "لسانيات",
  "اللغويات والتقنية",
  "ذكاء اصطناعي",
  "تاريخ العلوم",
  "فلسفة وتاريخ",
  "ترجمة وتقنية",
  "بلاغة وأدب",
  "معاجم وتقنية",
  "فنون وتصميم",
  "نقد أدبي",
];

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    bio: "",
    selectedCategories: [] as string[],
    portfolioUrl: "",
    agreeTerms: false,
    agreeOriginality: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(category);
      if (exists) {
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter(
            (c) => c !== category,
          ),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, category],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("يرجى إدخال اسم الكاتب الكامل.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني.");
      return;
    }
    if (formData.password.length < 8) {
      setErrorMessage("يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (!formData.role.trim()) {
      setErrorMessage("يرجى إدخال المسمى والتخصص الأكاديمي أو المهني.");
      return;
    }
    if (formData.selectedCategories.length === 0) {
      setErrorMessage("يرجى اختيار مجال كتابة واحد على الأقل.");
      return;
    }
    if (!formData.bio.trim()) {
      setErrorMessage("يرجى كتابة نبذة تعريفية مختصرة عن الكاتب.");
      return;
    }
    if (!formData.agreeTerms || !formData.agreeOriginality) {
      setErrorMessage("يرجى الموافقة على شروط النشر وميثاق الأصالة المعرفية.");
      return;
    }

    setIsSubmitting(true);
    // Simulate server action
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto my-12 w-full max-w-xl rounded-2xl border border-primary/10 bg-background p-8 text-center shadow-xl sm:p-10"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <svg
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-primary sm:text-3xl">
          أهلاً بك في قبس، {formData.name}!
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-dark/75 sm:text-base">
          تم إنشاء حساب الكاتب الخاص بك بنجاح. يمكنك الآن الدخول إلى لوحة التحكم
          والبدء في تحرير مقالاتك وتجهيزها للاعتماد والنشر.
        </p>

        {/* Preview of author badge */}
        <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-5 text-right">
          <span className="text-xs font-bold text-accent">
            بطاقتك كما ستظهر في المقالات:
          </span>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-light font-bold">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary">{formData.name}</h3>
              <p className="text-xs text-primary/60">{formData.role}</p>
            </div>
          </div>
          <p className="mt-2.5 text-xs text-dark/80 line-clamp-2">
            {formData.bio}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-light shadow-md transition-all hover:bg-accent"
          >
            تسجيل الدخول الآن
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
          >
            تصفح المقالات
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1300px] px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* =========================================================
            FORM COLUMN (7 cols)
        ========================================================== */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-primary/10 bg-background p-6 shadow-sm sm:p-8 md:p-10">
            {/* Header */}
            <div className="mb-8 border-b border-primary/10 pb-6">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                انضمام الكتّاب والباحثين
              </span>
              <h1 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                إنشاء حساب كاتب جديد
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-dark/70 sm:text-sm">
                شارك خلاصة فكرك وبحوثك في منصة قبس، ووثق مقالاتك بصفحة كاتب مخصصة
                تظهر مع كل تدوينة.
              </p>
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-600 sm:text-sm"
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: ACCOUNT DETAILS */}
              <div>
                <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary sm:text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-light">
                    ١
                  </span>
                  <span>بيانات الحساب الشخصي</span>
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      الاسم الكامل (كما سيظهر ككاتب للمقالات) *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="مثال: د. ريان القحطاني"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      البريد الإلكتروني *
                    </label>
                    <input
                      id="email"
                      type="email"
                      dir="ltr"
                      required
                      placeholder="author@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      كلمة المرور *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        dir="ltr"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors text-xs"
                      >
                        {showPassword ? "إخفاء" : "إظهار"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      تأكيد كلمة المرور *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        dir="ltr"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors text-xs"
                      >
                        {showConfirmPassword ? "إخفاء" : "إظهار"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: WRITER PROFILE DETAILS */}
              <div className="border-t border-primary/10 pt-6">
                <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary sm:text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-light">
                    ٢
                  </span>
                  <span>ملف وهوية الكاتب (تفاصيل بطاقة المقال)</span>
                </h2>

                <div className="space-y-4">
                  {/* Role / Specialization */}
                  <div>
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      المسمى والتخصص الأكاديمي أو المهني *
                    </label>
                    <input
                      id="role"
                      type="text"
                      required
                      placeholder="مثال: أستاذ اللسانيات المقارنة / باحث في معالجة اللغات الطبيعية / مترجم أدبي"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-primary sm:text-sm">
                      مجالات واهتمامات الكتابة (اختر ما يناسبك) *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => {
                        const isSelected =
                          formData.selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategoryToggle(cat)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-primary text-light shadow-xs"
                                : "border border-primary/15 bg-background text-primary/80 hover:border-primary/40 hover:bg-primary/5"
                            }`}
                          >
                            {isSelected ? `✓ ${cat}` : cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label
                      htmlFor="bio"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      النبذة التعريفية (تظهر في صندوق الكاتب أسفل المقالات) *
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      required
                      placeholder="اكتب سيرة موجزة تشمل اهتماماتك البحثية وإسهاماتك الفكرية..."
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all resize-none"
                    />
                    <span className="text-[11px] text-primary/50">
                      موصى به: من 80 إلى 180 حرفاً.
                    </span>
                  </div>

                  {/* Portfolio / Website */}
                  <div>
                    <label
                      htmlFor="portfolioUrl"
                      className="mb-1.5 block text-xs font-semibold text-primary sm:text-sm"
                    >
                      رابط موقعك الشخصي أو عينة من أعمالك (اختياري)
                    </label>
                    <input
                      id="portfolioUrl"
                      type="url"
                      dir="ltr"
                      placeholder="https://yourwebsite.com or https://x.com/username"
                      value={formData.portfolioUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          portfolioUrl: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-left text-dark placeholder:text-primary/40 focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: TERMS & COMMITMENT */}
              <div className="border-t border-primary/10 pt-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeOriginality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreeOriginality: e.target.checked,
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-primary/20 accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-dark/80 sm:text-sm">
                    أقرّ بالالتزام بـ{" "}
                    <strong className="text-primary font-bold">
                      ميثاق الأصالة المعرفية
                    </strong>{" "}
                    لقبس؛ بأن تكون المقالات خالية من التوليد الآلي غير المحرر،
                    وموثقة بالمراجع والمصادر الرصينة.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, agreeTerms: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded border-primary/20 accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-dark/80 sm:text-sm">
                    أوافق على{" "}
                    <Link
                      href="/terms"
                      className="text-primary underline hover:text-accent font-semibold"
                    >
                      شروط النشر
                    </Link>{" "}
                    و{" "}
                    <Link
                      href="/privacy"
                      className="text-primary underline hover:text-accent font-semibold"
                    >
                      سياسة الخصوصية
                    </Link>{" "}
                    لمنصة قبس.
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary py-4 text-center text-sm font-bold text-light shadow-lg transition-all duration-200 hover:bg-accent hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed sm:text-base"
                >
                  {isSubmitting ? "جارٍ تسجيل الحساب..." : "إنشاء حساب الكاتب"}
                </button>
              </div>

              {/* LOGIN LINK */}
              <div className="text-center pt-2">
                <p className="text-xs text-primary/70 sm:text-sm">
                  لديك حساب كاتب بالفعل؟{" "}
                  <Link
                    href="/login"
                    className="font-bold text-primary underline hover:text-accent transition-colors"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* =========================================================
            PREVIEW & INFO COLUMN (5 cols)
        ========================================================== */}
        <div className="space-y-6 lg:col-span-5">
          {/* Live Preview Card */}
          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                معاينة حية
              </span>
              <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-primary">
                بطاقتك في المقال
              </span>
            </div>

            <p className="mb-4 text-xs text-primary/60">
              هكذا سيظهر اسمك ومسماك وسيرتك للقراء في أسفل كل مقالة تنشرها عبر
              قبس:
            </p>

            {/* Author box mockup identical to post slug */}
            <div className="rounded-xl border border-primary/10 bg-background p-5 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary text-light font-bold text-lg shadow-sm">
                  {formData.name ? (
                    formData.name.charAt(0)
                  ) : (
                    <Image
                      src="/whiteQabas1.png"
                      alt="قبس"
                      width={40}
                      height={40}
                      className="h-8 w-8 object-contain p-1"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-primary">
                    {formData.name || "اسم الكاتب / الباحث"}
                  </h3>
                  <p className="truncate text-xs font-medium text-primary/60">
                    {formData.role || "المسمى والتخصص الأكاديمي"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-dark/80">
                {formData.bio ||
                  "النبذة التعريفية التي تلخص مسيرتك واهتماماتك البحثية ستظهر هنا لتمنح القارئ خلفية موثوقة عن كاتب المقال."}
              </p>

              {formData.selectedCategories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-primary/5 pt-3">
                  {formData.selectedCategories.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Publishing Steps info box */}
          <div className="rounded-2xl border border-primary/10 bg-background p-6 shadow-sm sm:p-7">
            <h3 className="mb-3 text-base font-bold text-primary sm:text-lg">
              مراحل النشر في قبس
            </h3>

            <ol className="space-y-3.5 text-xs text-dark/80 sm:text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-primary">
                  ١
                </span>
                <div>
                  <strong className="text-primary">إعداد المسودة:</strong> كتابة
                  المقال بتنسيق Markdown مع الحرص على المصادر والمراجع.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-primary">
                  ٢
                </span>
                <div>
                  <strong className="text-primary">المراجعة والتمحيص:</strong>{" "}
                  يقوم فريق التحرير بمراجعة المحتوى واللغة والتحقق من التوثيق.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-primary">
                  ٣
                </span>
                <div>
                  <strong className="text-primary">الاعتماد والنشر:</strong> نشر
                  المقال رسمياً وربطه بملف الكاتب ومشاركته مع مجتمع قبس.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
