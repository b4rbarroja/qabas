"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "تصفح المقالات والعلوم",
    description:
      "انطلق في رحلة معرفية واستكشف مكتبتنا من المقالات العلمية الرصينة المصاغة بلغة سلسة وتصميم جذاب.",
  },
  {
    number: "02",
    title: "انضم إلى مجتمع القراء",
    description:
      "اشترك في نشرتنا البريدية لتصلك أحدث التدوينات والتحليلات الأكاديمية فور نشرها مباشرة في بريدك.",
  },
  {
    number: "03",
    title: "شارك بقلمك وفكرك",
    description:
      "إذا كنت تمتلك شغف الكتابة والبحث العلمي، يمكنك تقديم مقالاتك لنشرها عبر منبر قبس ليصل صوتك للمثقفين.",
  },
  {
    number: "04",
    title: "تفاعل وانشر المعرفة",
    description:
      "ساهم في إثراء المحتوى العربي من خلال مشاركة المقالات والأفكار مع مجتمعك وتوسيع دائرة النقاش المعرفي.",
  },
];

export default function AboutPage() {
  return (
    <div className="font-thamaniyah">
      {/* Hero Section */}
      <section className="bg-primary px-6 md:px-50 min-h-[420px] flex justify-between items-center flex-col md:flex-row py-12 gap-8">
        {/* Text first on mobile */}
        <div className="w-full md:w-full max-w-[550px] text-light order-1 md:order-2">
          <h1 className="text-4xl lg:text-5xl font-bold pb-6 leading-tight">
            من نحن؟
          </h1>
          <p className="text-lg lg:text-[20px] leading-relaxed opacity-90">
            قبس هي منصة معرفية رصينة انطلقت لتكون جسراً بين عمق البحث العلمي
            وسلاسة القراءة اليومية. نهدف إلى تقديم محتوى رفيع المستوى يلامس شغف
            العقل العربي النهم، ونجمع بين أصالة الفكر وحداثة العرض لتجريد العلوم
            من تعقيدها وضخها في شرايين الثقافة العامة.
          </p>

          <div className="mt-8 text-light flex flex-row gap-4 items-center font-medium">
            <Link
              href="#"
              className="bg-accent/90 text-light hover:brightness-110 transition-all rounded-[6px] px-5 py-2.5 shadow-sm"
            >
              استكشف المقالات
            </Link>
            <Link
              href="#"
              className="bg-accent/20 border-accent border text-light hover:brightness-110 transition-all rounded-[6px] px-5 py-2.5 shadow-sm"
            >
              انضم للمجتمع
            </Link>
          </div>
        </div>

        {/* Image second on mobile */}
        <div className="flex justify-center items-center order-2 md:order-1 w-full">
          <Image
            src="/qabaFull.png"
            className="rounded-2xl object-cover shadow-lg max-w-[90%] md:max-w-full"
            alt="عن قبس"
            height={400}
            width={450}
            priority
          />
        </div>
      </section>

      {/* Animated Process Section */}
      <section className="bg-background px-6 md:px-20 lg:px-30 py-20 text-dark overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* الجانب الأيمن */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <span className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase">
                رحلتك المعرفية
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
                ابدأ الآن !
              </h2>
              <p className="text-dark/70 text-base md:text-lg leading-relaxed mb-8">
                خطوات بسيطة تفصلك عن الانغماس في تجربة معرفية فريدة تليق بشغفك
                وتثري حصيلتك العلمية يومياً.
              </p>
            </div>

            <div className="relative w-full h-[380px] rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-md">
              <Image
                src="/startFull.png"
                alt="ابدأ الآن"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* الجانب الأيسر: الخط العمودي والأنيميشن */}
          <div className="lg:col-span-7 relative pt-4 pr-6 md:pr-10">
            {/* 1. الخط الخلفي الباهت */}
            <div className="absolute right-[27px] md:right-[43px] top-6 bottom-6 w-[2px] bg-accent/20" />

            {/* 2. الخط العمودي الحيوي (ينزل تدريجياً مع السكرول) */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute right-[27px] md:right-[43px] top-6 w-[2px] bg-accent origin-top"
            />

            {/* 3. قائمة الخطوات مع التأثيرات */}
            <div className="space-y-12 relative">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2, // يظهر كل عنصر بعد الآخر بالتتابع
                  }}
                  className="flex items-start gap-6 md:gap-8 group"
                >
                  {/* الدائرة المرقّمة (تضيء وتتوسع قليلاً عند الوصول إليها) */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-accent bg-background text-accent group-hover:bg-accent group-hover:text-dark transition-colors duration-300 flex items-center justify-center text-sm md:text-base font-bold shadow-sm"
                  >
                    {step.number}
                  </motion.div>

                  {/* المحتوى النصي للخطوة */}
                  <div className="pt-1 md:pt-2">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-dark/70 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
