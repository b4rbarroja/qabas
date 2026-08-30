"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "إعداد المقالة",
    description:
      "يتم كتابة المقالة مع الحرص على تقديم محتوى خال من صياغة الذكاء الاصطناعي، وموثوق من حيث المصادر",
  },
  {
    number: "02",
    title: "تنسيق المقالة",
    description: "يجب عليك تنسيق المقالة بصيغة Md قبل نشرها في الموقع",
  },
  {
    number: "03",
    title: "مراجعة ما كتبته",
    description:
      "قبل النشر نحيطك علما بأهمية مراجعة ما كتبته من مصادر وتناسق هيكلي للمقال الخاص بك",
  },
  {
    number: "04",
    title: "النشر",
    description:
      "وهي المرحلة الأخيرة ، تقوم بنشر مقالتك من حسابك الشخصي ثم تنتظر حتى يتم مراجعتها والموافقة عليها",
  },
];

export default function AboutPage() {
  return (
    <main dir="rtl" className="font-thamaniyah w-full overflow-x-hidden">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="w-full bg-primary">
        <div
          className="
            mx-auto flex w-full max-w-[1600px]
            flex-col items-center
            gap-10
            px-5 py-14
            sm:px-8 sm:py-16
            md:px-12 md:py-20
            lg:grid lg:grid-cols-2
            lg:gap-14
            lg:px-16 lg:py-24
            xl:px-24 xl:py-28
          "
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="
              order-1 w-full max-w-2xl
              text-light
              text-center
              lg:text-right
            "
          >
            <h1
              className="
                text-[clamp(2.25rem,6vw,5.5rem)]
                font-bold
                leading-[1.15]
                tracking-tight
              "
            >
              من نحن؟
            </h1>

            <p
              className="
                mx-auto mt-6 max-w-xl
                text-base
                leading-[1.9]
                opacity-90
                sm:text-lg
                md:text-xl
                lg:mx-0 lg:text-[1.35rem]
                xl:text-2xl
              "
            >
              تهدف هذه المدونة إلى توفير مساحة ميسرة لناشري المدونات في مختلف
              التخصصات مثل: البرمجة، الفلسفة، اللغات والعلوم التي نراها مفيدة
              عموما بعد مراجعتها وتمحيصها لتوفير بيئة ذات جودة للقراء العرب.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-8 flex w-full flex-col gap-3
                sm:flex-row sm:justify-center
                lg:mt-10 lg:justify-start
              "
            >
              <Link
                href="#"
                className="
                  inline-flex min-h-14 w-full
                  items-center justify-center
                  rounded-lg
                  bg-accent/90
                  px-6 py-3
                  text-base font-semibold text-light
                  shadow-lg
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:brightness-110
                  sm:w-auto sm:min-w-[170px]
                "
              >
                استكشف المقالات
              </Link>

              <Link
                href="#"
                className="
                  inline-flex min-h-14 w-full
                  items-center justify-center
                  rounded-lg
                  border border-accent
                  bg-accent/20
                  px-6 py-3
                  text-base font-semibold text-light
                  shadow-lg
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-accent/30
                  sm:w-auto sm:min-w-[170px]
                "
              >
                انضم للمجتمع
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="
              order-2 flex w-full
              items-center justify-center
            "
          >
            <div
              className="
                relative w-full
                max-w-[300px]
                sm:max-w-[380px]
                md:max-w-[460px]
                lg:max-w-[520px]
                xl:max-w-[580px]
              "
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/whiteabt.png"
                  alt="عن قبس"
                  fill
                  priority
                  sizes="
                    (max-width: 640px) 85vw,
                    (max-width: 768px) 70vw,
                    (max-width: 1024px) 50vw,
                    580px
                  "
                  className="
                    rounded-2xl
                    object-contain
                    drop-shadow-2xl
                  "
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          KNOWLEDGE JOURNEY
      ====================================================== */}
      <section
        className="
          w-full
          overflow-hidden
          bg-background
          px-5 py-16
          text-dark
          sm:px-8 sm:py-20
          md:px-12 md:py-24
          lg:px-16
          xl:px-24
        "
      >
        <div
          className="
            mx-auto grid w-full
            max-w-[1600px]
            grid-cols-1
            gap-14
            lg:grid-cols-12
            lg:gap-12
            xl:gap-16
          "
        >
          {/* =================================================
              INTRO + IMAGE
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="
              flex w-full flex-col
              lg:col-span-5
            "
          >
            <div>
              <span
                className="
                  text-sm font-semibold
                  tracking-widest text-accent
                  sm:text-base
                "
              >
                شاركنا الرحلة
              </span>

              <h2
                className="
                  mt-3 mb-5
                  text-[clamp(2.5rem,6vw,5.5rem)]
                  font-bold
                  leading-[1.1]
                  text-primary
                "
              >
                ابدأ الآن!
              </h2>

              <p
                className="
                  mb-8 max-w-xl
                  text-base leading-[1.9]
                  text-dark/70
                  sm:text-lg
                  md:text-xl
                "
              >
                يمكنك البدء في نشر مقالاتك معنا ، ولكن ما هي الخطوات؟{" "}
              </p>
            </div>

            {/* Image */}
            <div
              className="
                relative mt-2 w-full
                aspect-[4/5]
                overflow-hidden
                rounded-t-[80px]
                rounded-b-2xl
                shadow-xl
                sm:rounded-t-[110px]
                md:aspect-[5/6]
                md:rounded-t-[140px]
                lg:mt-auto
                lg:aspect-[4/5]
              "
            >
              <Image
                src="/blackStart.png"
                alt="ابدأ الآن"
                fill
                sizes="
                  (max-width: 1024px) 100vw,
                  42vw
                "
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* =================================================
              STEPS TIMELINE
          ================================================== */}
          <div
            className="
              relative
              lg:col-span-7
              lg:pt-6
            "
          >
            {/* Timeline */}
            <div
              className="
                absolute
                right-[23px]
                top-6
                bottom-6
                w-[2px]
                bg-accent/20
                sm:right-[27px]
                md:right-[31px]
              "
            />

            {/* Animated Timeline */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="
                absolute
                right-[23px]
                top-6
                w-[2px]
                bg-accent
                origin-top
                sm:right-[27px]
                md:right-[31px]
              "
            />

            {/* Steps */}
            <div className="relative space-y-10 sm:space-y-12 md:space-y-14">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="
                    group flex
                    items-start
                    gap-4
                    sm:gap-5
                    md:gap-6
                    lg:gap-7
                  "
                >
                  {/* Number */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="
                      relative z-10
                      flex shrink-0
                      h-12 w-12
                      items-center justify-center
                      rounded-full
                      border-2 border-accent
                      bg-background
                      text-sm font-bold
                      text-accent
                      shadow-sm
                      transition-colors duration-300
                      group-hover:bg-accent
                      group-hover:text-dark
                      sm:h-14 sm:w-14
                      sm:text-base
                      md:h-16 md:w-16
                      md:text-lg
                    "
                  >
                    {step.number}
                  </motion.div>

                  {/* Text */}
                  <div className="min-w-0 flex-1 pt-0.5 sm:pt-1 md:pt-2">
                    <h3
                      className="
                        mb-2
                        text-lg font-bold
                        leading-snug
                        text-primary
                        transition-colors duration-300
                        group-hover:text-accent
                        sm:text-xl
                        md:text-2xl
                        lg:text-3xl
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        max-w-2xl
                        text-sm
                        leading-[1.9]
                        text-dark/70
                        sm:text-base
                        md:text-lg
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
