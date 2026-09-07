import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-background font-thamaniyah text-dark"
    >
      {/* Header */}
      <section className="px-4 pt-4 md:px-6 md:pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-primary/10 bg-primary/5 px-6 py-10 md:px-10 md:py-14">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center gap-3 text-sm text-dark/45">
                <Link href="/" className="transition-colors hover:text-primary">
                  مدونة قبس
                </Link>

                <span className="h-px w-8 bg-primary/30" />

                <span>سياسة الخصوصية</span>
              </div>

              <p className="mb-3 text-sm font-medium text-primary/70">
                الخصوصية والثقة
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                سياسة الخصوصية
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-dark/60 md:text-lg">
                نؤمن أن الخصوصية جزء أساسي من تجربة استخدام آمنة وموثوقة. توضح
                هذه الصفحة كيف نتعامل مع بياناتك عند استخدام مدونة قبس.
              </p>

              <div className="mt-8 inline-flex rounded-2xl border border-primary/10 bg-background px-5 py-3 text-sm text-dark/50">
                آخر تحديث: سبتمبر 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-6 rounded-2xl border border-primary/10 bg-primary/5 p-5">
              <p className="mb-4 text-sm font-semibold text-dark">
                في هذه الصفحة
              </p>

              <nav className="space-y-1">
                {[
                  ["01", "البيانات التي نجمعها", "data"],
                  ["02", "كيف نستخدم بياناتك؟", "usage"],
                  ["03", "المعلومات الظاهرة للعامة", "public"],
                  ["04", "أمان الحساب", "security"],
                  ["05", "ملفات تعريف الارتباط", "cookies"],
                  ["06", "مشاركة البيانات", "sharing"],
                  ["07", "حقوقك", "rights"],
                  ["08", "حذف الحساب", "deletion"],
                  ["09", "الروابط الخارجية", "external"],
                  ["10", "التغييرات", "changes"],
                  ["11", "التواصل معنا", "contact"],
                ].map(([number, title, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-dark/50 transition-all duration-200 hover:bg-background hover:text-primary"
                  >
                    <span className="text-xs text-primary/50">{number}</span>

                    <span>{title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-9">
            <div className="rounded-2xl border border-primary/10 bg-background p-6 shadow-xs md:p-10 lg:p-12">
              <div className="max-w-3xl">
                {/* Intro */}
                <div className="mb-12 border-b border-primary/10 pb-10">
                  <p className="text-base leading-9 text-dark/65 md:text-lg">
                    مرحبًا بك في{" "}
                    <strong className="text-dark">مدونة قبس</strong>. نحن نقدر
                    خصوصيتك ونلتزم بالتعامل مع بياناتك الشخصية بمسؤولية وشفافية.
                    توضح سياسة الخصوصية هذه نوع المعلومات التي قد نجمعها عند
                    استخدامك للمدونة، وكيف نستخدمها، والخيارات المتاحة لك بشأن
                    بياناتك.
                  </p>

                  <p className="mt-5 text-base leading-9 text-dark/65 md:text-lg">
                    باستخدامك لمدونة قبس، فإنك توافق على الممارسات الموضحة في
                    هذه السياسة.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="data" className="scroll-mt-8">
                  <SectionHeader number="01" title="البيانات التي نجمعها" />

                  <p>
                    نحن نجمع فقط البيانات اللازمة لتوفير وظائف المدونة وتحسين
                    تجربة استخدامها.
                  </p>

                  <h3>عند إنشاء حساب</h3>

                  <p>قد نطلب منك بعض المعلومات، مثل:</p>

                  <ul>
                    <li>الاسم.</li>
                    <li>البريد الإلكتروني.</li>
                    <li>كلمة المرور.</li>
                    <li>الصورة الشخصية، إذا اخترت إضافتها.</li>
                    <li>التخصص، إذا اخترت إضافته.</li>
                    <li>النبذة الشخصية، إذا اخترت إضافتها.</li>
                  </ul>

                  <p>
                    كما يتم حفظ المحتوى الذي تنشره من خلال حسابك، مثل المقالات
                    والوسوم المرتبطة بها.
                  </p>

                  <h3>بيانات الاستخدام</h3>

                  <p>
                    في الوقت الحالي، لا تعتمد مدونة قبس على جمع عنوان IP أو
                    بيانات التصفح التفصيلية لأغراض التحليل الإحصائي.
                  </p>

                  <p>
                    قد تتغير هذه الممارسات مستقبلًا إذا تمت إضافة خدمات أو أدوات
                    جديدة، وسيتم تحديث سياسة الخصوصية عند الحاجة.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="usage" className="scroll-mt-8">
                  <SectionHeader number="02" title="كيف نستخدم بياناتك؟" />

                  <p>نستخدم البيانات التي تقدمها للأغراض التالية:</p>

                  <ul>
                    <li>إنشاء حسابك وإدارته.</li>
                    <li>الحفاظ على تسجيل دخولك إلى المنصة.</li>
                    <li>تمكينك من إنشاء ونشر وإدارة مقالاتك.</li>
                    <li>عرض معلومات الكاتب المرتبطة بالمقالات المنشورة.</li>
                    <li>تحسين تجربة استخدام المدونة.</li>
                    <li>
                      حماية المنصة من الاستخدام غير المصرح به أو إساءة
                      الاستخدام.
                    </li>
                    <li>
                      التواصل معك عند الحاجة فيما يتعلق بحسابك أو الخدمات
                      المقدمة.
                    </li>
                  </ul>

                  <p>
                    نحن لا نستخدم بياناتك الشخصية لأغراض لا تتوافق مع الغرض الذي
                    جُمعت من أجله بتاتا.
                  </p>
                </section>

                {/* Section 3 */}
                <section id="public" className="scroll-mt-8">
                  <SectionHeader number="03" title="المعلومات الظاهرة للعامة" />

                  <p>
                    عند إنشاء حساب ونشر محتوى على مدونة قبس، قد تظهر بعض
                    المعلومات المرتبطة بملفك الشخصي للعامة، مثل:
                  </p>

                  <ul>
                    <li>اسمك.</li>
                    <li>صورتك الشخصية.</li>
                    <li>تخصصك.</li>
                    <li>نبذتك الشخصية.</li>
                    <li>المقالات التي تنشرها.</li>
                    <li>المعلومات التي تختار إضافتها إلى المحتوى المنشور.</li>
                  </ul>

                  <div className="my-7 rounded-2xl border border-primary/10 bg-primary/5 p-5 text-sm leading-8 text-dark/60">
                    ننصحك بعدم إضافة أي معلومات شخصية حساسة إلى ملفك الشخصي أو
                    مقالاتك إذا كنت لا ترغب في أن تكون متاحة للزوار.
                  </div>
                </section>

                {/* Section 4 */}
                <section id="security" className="scroll-mt-8">
                  <SectionHeader
                    number="04"
                    title="كلمات المرور وأمان الحساب"
                  />

                  <p>
                    نحن نتعامل مع كلمات المرور باعتبارها معلومات حساسة، ولا
                    ينبغي تخزين كلمات المرور بصورتها النصية الأصلية في قاعدة
                    البيانات.
                  </p>

                  <p>
                    نتخذ إجراءات تقنية مناسبة للمساعدة في حماية حسابات
                    المستخدمين وبياناتهم من الوصول غير المصرح به أو التعديل أو
                    الاستخدام غير المشروع.
                  </p>

                  <p>
                    ومع ذلك، لا يمكن ضمان أمان أي نظام متصل بالإنترنت بشكل مطلق.
                    لذلك ننصحك باستخدام كلمة مرور قوية وعدم مشاركتها مع أي شخص.
                  </p>
                </section>

                {/* Section 5 */}
                <section id="cookies" className="scroll-mt-8">
                  <SectionHeader
                    number="05"
                    title="ملفات تعريف الارتباط (Cookies)"
                  />

                  <p>
                    تستخدم مدونة قبس ملفات تعريف الارتباط (Cookies) اللازمة
                    للحفاظ على جلسة تسجيل الدخول الخاصة بك وتمكين بعض وظائف
                    الحساب.
                  </p>

                  <p>
                    قد يتم استخدام Cookie مرتبطة بجلسة المستخدم للتأكد من أن
                    الطلبات التي ترسلها المنصة مرتبطة بحسابك.
                  </p>

                  <p>
                    لا نستخدم Cookies حاليًا لأغراض الإعلانات أو تتبع نشاطك عبر
                    مواقع أخرى.
                  </p>

                  <p>
                    إذا تمت إضافة خدمات خارجية تستخدم Cookies مستقبلًا، فسيتم
                    تحديث هذه السياسة لتوضيح استخدامها.
                  </p>
                </section>

                {/* Section 6 */}
                <section id="sharing" className="scroll-mt-8">
                  <SectionHeader
                    number="06"
                    title="مشاركة البيانات مع أطراف أخرى"
                  />

                  <p>
                    نحن لا نبيع بيانات المستخدمين الشخصية ولا نشاركها مع أطراف
                    أخرى لأغراض تسويقية.
                  </p>

                  <p>
                    قد تتم معالجة بعض البيانات من خلال مزودي خدمات تقنيين إذا
                    كان ذلك ضروريًا لتشغيل المدونة أو توفير إحدى وظائفها، وذلك
                    بالقدر اللازم لتقديم الخدمة.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="rights" className="scroll-mt-8">
                  <SectionHeader number="07" title="حقوقك" />

                  <p>
                    يمكنك التحكم في المعلومات المرتبطة بحسابك، ويشمل ذلك — بحسب
                    الوظائف المتاحة في المنصة —:
                  </p>

                  <ul>
                    <li>الاطلاع على بيانات حسابك.</li>
                    <li>تعديل معلومات ملفك الشخصي.</li>
                    <li>تعديل أو إدارة المحتوى الذي نشرته.</li>
                    <li>طلب حذف حسابك وبياناتك المرتبطة به.</li>
                  </ul>

                  <p>
                    إذا لم تكن إحدى هذه الخيارات متاحة مباشرة من خلال إعدادات
                    الحساب، يمكنك التواصل معنا لطلب المساعدة.
                  </p>
                </section>

                {/* Section 8 */}
                <section id="deletion" className="scroll-mt-8">
                  <SectionHeader number="08" title="حذف الحساب والبيانات" />

                  <p>
                    عند طلب حذف حسابك، قد يتم حذف البيانات المرتبطة بالحساب
                    وفقًا لآلية الحذف المعتمدة في المنصة.
                  </p>

                  <p>
                    قد نحتفظ ببعض المعلومات لفترة محدودة إذا كان الاحتفاظ بها
                    ضروريًا للامتثال لالتزام قانوني، أو لحل نزاع، أو لمنع إساءة
                    الاستخدام، أو لحماية حقوق المنصة والمستخدمين.
                  </p>
                </section>

                {/* Section 9 */}
                <section id="external" className="scroll-mt-8">
                  <SectionHeader number="09" title="الروابط الخارجية" />

                  <p>قد تحتوي مدونة قبس على روابط لمواقع أو خدمات خارجية.</p>

                  <p>
                    عند الانتقال إلى موقع خارجي، تصبح خاضعًا لسياسة الخصوصية
                    والشروط الخاصة بذلك الموقع. نحن لا نتحكم في ممارسات الخصوصية
                    أو المحتوى الخاص بالمواقع الخارجية.
                  </p>

                  <p>
                    ننصحك بمراجعة سياسات الخصوصية الخاصة بهذه المواقع قبل تقديم
                    أي معلومات شخصية إليها.
                  </p>
                </section>

                {/* Section 10 */}
                <section id="changes" className="scroll-mt-8">
                  <SectionHeader
                    number="10"
                    title="التغييرات على سياسة الخصوصية"
                  />

                  <p>
                    قد نقوم بتحديث سياسة الخصوصية من وقت لآخر نتيجة لتطور
                    المدونة أو إضافة وظائف وخدمات جديدة.
                  </p>

                  <p>
                    عند إجراء تغييرات جوهرية، سنقوم بتحديث تاريخ "آخر تحديث"
                    الظاهر في أعلى هذه الصفحة، وقد نستخدم وسائل إضافية لإبلاغ
                    المستخدمين عندما يكون ذلك مناسبًا.
                  </p>

                  <p>
                    ننصحك بمراجعة هذه الصفحة بشكل دوري للاطلاع على أحدث نسخة من
                    سياسة الخصوصية.
                  </p>
                </section>

                {/* Section 11 */}
                <section id="contact" className="scroll-mt-8">
                  <SectionHeader number="11" title="التواصل معنا" />

                  <p>
                    إذا كان لديك سؤال حول سياسة الخصوصية أو طريقة التعامل مع
                    بياناتك، يمكنك التواصل معنا من خلال وسيلة التواصل الرسمية
                    التي توفرها مدونة قبس.
                  </p>

                  <p>
                    سيتم إضافة بيانات التواصل الرسمية إلى هذه الصفحة عند توفرها.
                  </p>
                </section>

                {/* Conclusion */}
                <div className="mt-14 rounded-2xl border border-primary/10 bg-primary/5 p-6 md:p-8">
                  <p className="mb-3 text-sm font-semibold text-primary/70">
                    أخيرًا
                  </p>

                  <h2 className="text-2xl font-bold md:text-3xl">
                    الخصوصية جزء من الثقة.
                  </h2>

                  <p className="mt-4 text-sm leading-8 text-dark/55 md:text-base">
                    هدفنا في مدونة قبس هو توفير مساحة للقراءة والكتابة ومشاركة
                    المعرفة، مع التعامل مع بيانات مستخدمينا بطريقة مسؤولة
                    وواضحة.
                  </p>

                  <p className="mt-3 text-sm leading-8 text-dark/55 md:text-base">
                    نحن نسعى إلى جمع الحد الأدنى من البيانات اللازمة لتشغيل
                    الخدمات، وحماية حسابات المستخدمين، ومنحك قدرًا مناسبًا من
                    التحكم في معلوماتك.
                  </p>
                </div>

                {/* Back */}
                <div className="mt-8 border-t border-primary/10 pt-8">
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-2xl border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-semibold text-dark transition-all duration-300 hover:border-primary/20 hover:bg-primary hover:text-light"
                  >
                    العودة إلى مدونة قبس
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* Section Header                     */
/* ---------------------------------- */

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 mt-12 flex items-start gap-4 first:mt-0">
      <span className="flex h-10 min-w-10 items-center justify-center rounded-2xl bg-primary/5 text-xs font-semibold text-primary">
        {number}
      </span>

      <h2 className="pt-1 text-2xl font-bold leading-tight md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
