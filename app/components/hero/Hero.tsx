import Image from "next/image";
import Link from "next/link";

// بيانات المقالات
const LATEST_POSTS = [
  {
    id: 1,
    title: "أصالة النص العربي في عصر الذكاء الاصطناعي",
    excerpt:
      "كيف نحافظ على الهوية اللغوية والبلاغية للنصوص العربية مع التطور المتسارع لخوارزميات التوليد اللغوي؟",
    category: "اللغويات والتقنية",
    date: "٢٨ أغسطس ٢٠٢٦",
    readTime: "٥ دقائق",
    image: "/herobg.png",
    slug: "#",
  },
  {
    id: 2,
    title: "تطور البنيوية في اللسانيات الحديثة",
    excerpt:
      "قراءة نقدية في الانتقال من النظرية التوزيعية إلى النحو التوليدي وتحليل المكونات المباشرة.",
    category: "لسانيات",
    date: "٢٥ أغسطس ٢٠٢٦",
    readTime: "٧ دقائق",
    image: "/mahbara2.webp",
    slug: "#",
  },
  {
    id: 3,
    title: "مناهج البحث العلمي عند علماء المشرق",
    excerpt:
      "استعراض لأبرز الأدوات التحليلية التي اعتمدها الجاحظ وابن خلدون في توثيق العلوم وتفنيد الآراء.",
    category: "تاريخ العلوم",
    date: "٢٠ أغسطس ٢٠٢٦",
    readTime: "٦ دقائق",
    image: "/herobg.png",
    slug: "#",
  },
];

export default function Hero() {
  return (
    <div className="font-thamaniyah">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] flex items-center overflow-hidden px-6 md:px-20 lg:px-30 py-16">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/quill.mp4" type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        {/* Dark Overlay للتحكم في وضوح النصوص */}
        <div className="absolute inset-0 bg-primary/60 z-10" />

        {/* Section Content */}
        <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content - full width on mobile, centered */}
          <div className="w-full max-w-[500px] text-light text-center md:text-right">
            <h1 className="text-4xl lg:text-5xl font-bold pb-6 leading-tight text-white">
              أطلق العنان لقلمك
            </h1>
            <p className="text-lg lg:text-[20px] leading-relaxed text-gray-200 mx-auto md:mx-0 max-w-[90%]">
              مدونة علمية تهدف إلى تقديم محتوى رفيع المستوى يلامس شغف المثقف
              النهم، وينتقل بالمعرفة من تعقيد الأوراق البحثية إلى سلاسة القراءة
              اليومية.
            </p>

            <div className="text-light mt-10 flex flex-col md:flex-row gap-4 items-center font-medium justify-center md:justify-end">
              <Link
                href="#"
                className="bg-accent/90 text-light hover:brightness-110 transition-all rounded-[6px] px-6 py-3 shadow-sm w-full md:w-auto text-center"
              >
                تصفح المقالات
              </Link>
              <Link
                href="#"
                className="bg-accent/20 border-accent border text-light hover:brightness-110 transition-all rounded-[6px] px-6 py-3 shadow-sm w-full md:w-auto text-center"
              >
                انشر مقالتك
              </Link>
            </div>

            {/* Decorative element for mobile */}
            <div className="hidden md:block"></div>
          </div>

          {/* Left side (الصورة) - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex justify-center items-center w-full">
            <Image
              src="/FullHero.png"
              className="rounded-2xl object-cover shadow-2xl border border-white/10 max-w-full"
              alt="hero bg"
              height={400}
              width={460}
              priority
            />
          </div>
        </div>
      </section>

      {/* Minimalist Latest Posts Section */}
      <section className="bg-background px-6 md:px-20 lg:px-30 py-20 text-dark">
        {/* Header القسم */}
        <div className="flex flex-row items-end justify-between border-b border-primary/10 pb-5 mb-12">
          <div>
            <span className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wider block mb-1">
              جديد المنصة
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              أحدث المقالات
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-primary/70 hover:text-accent font-medium transition-colors text-sm md:text-base border-b border-transparent hover:border-accent pb-0.5"
          >
            عرض الكل
          </Link>
        </div>

        {/* Grid الكروت المينيمال */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LATEST_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-transparent rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between hover:shadow-md"
            >
              <div>
                {/* صورة المقال */}
                <div className="relative h-52 w-full overflow-hidden bg-primary/5 p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* تفاصيل المقال */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-primary/60 mb-3 font-medium">
                    <span className="text-accent font-semibold">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                    <Link href={post.slug} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-primary/70 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* أسفل الكرت */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-primary/50">
                <span>{post.date}</span>
                <Link
                  href={post.slug}
                  className="text-primary font-semibold group-hover:text-accent transition-colors flex items-center gap-1"
                >
                  اقرأ المقال
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
