import Link from "next/link";

export default function TermsPage() {
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

                <span>الشروط والأحكام</span>
              </div>

              <p className="mb-3 text-sm font-medium text-primary/70">
                الاستخدام والنشر
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                الشروط والأحكام
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-dark/60 md:text-lg">
                توضح هذه الشروط القواعد العامة لاستخدام مدونة قبس وإنشاء
                الحسابات ونشر وإدارة المحتوى داخل المنصة.
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
                  ["01", "قبول الشروط", "acceptance"],
                  ["02", "استخدام المنصة", "usage"],
                  ["03", "الحسابات", "accounts"],
                  ["04", "نشر المقالات", "content"],
                  ["05", "الملكية الفكرية", "intellectual"],
                  ["06", "إدارة المحتوى", "moderation"],
                  ["07", "الروابط الخارجية", "external"],
                  ["08", "إخلاء المسؤولية", "disclaimer"],
                  ["09", "توافر الخدمة", "availability"],
                  ["10", "تحديد المسؤولية", "liability"],
                  ["11", "تعديل الشروط", "changes"],
                  ["12", "إنهاء الحساب", "termination"],
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
                    <strong className="text-dark">مدونة قبس</strong>. باستخدامك
                    للمدونة أو إنشاء حساب أو نشر محتوى من خلالها، فإنك توافق على
                    الالتزام بهذه الشروط والأحكام.
                  </p>

                  <p className="mt-5 text-base leading-9 text-dark/65 md:text-lg">
                    تهدف هذه الشروط إلى توضيح حقوق ومسؤوليات المستخدمين والمنصة،
                    وتنظيم طريقة استخدام الخدمات المتاحة داخل قبس.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="acceptance" className="scroll-mt-8">
                  <SectionHeader number="01" title="قبول الشروط" />

                  <p>
                    عند استخدامك لمدونة قبس، فإنك تقر بأنك قرأت هذه الشروط
                    وفهمتها وتوافق على الالتزام بها.
                  </p>

                  <p>
                    إذا كنت لا توافق على أي من هذه الشروط، فيرجى عدم استخدام
                    الخدمات التي تتطلب الموافقة عليها.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="usage" className="scroll-mt-8">
                  <SectionHeader number="02" title="استخدام المنصة" />

                  <p>
                    يمكنك استخدام مدونة قبس لقراءة المقالات وإنشاء حساب
                    والاستفادة من الوظائف المتاحة للمستخدمين المسجلين.
                  </p>

                  <p>
                    يجب استخدام المنصة بطريقة تحافظ على استقرارها وسلامة حسابات
                    المستخدمين والخدمات المقدمة.
                  </p>

                  <p>
                    لا يجوز محاولة الوصول إلى حسابات أو بيانات مستخدمين آخرين،
                    أو استخدام المنصة بطريقة تتجاوز الوظائف والصلاحيات المتاحة
                    لحسابك.
                  </p>
                </section>

                {/* Section 3 */}
                <section id="accounts" className="scroll-mt-8">
                  <SectionHeader number="03" title="الحسابات" />

                  <p>
                    بعض وظائف مدونة قبس تتطلب إنشاء حساب. عند إنشاء حساب، فإنك
                    توافق على تقديم معلومات صحيحة ومحدثة قدر الإمكان.
                  </p>

                  <p>
                    أنت مسؤول عن الحفاظ على سرية بيانات تسجيل الدخول الخاصة بك،
                    وعن جميع الأنشطة التي تتم من خلال حسابك.
                  </p>

                  <p>
                    في حال اعتقادك أن حسابك تعرض للوصول غير المصرح به، ينبغي
                    اتخاذ الإجراءات المناسبة لتأمينه في أقرب وقت ممكن.
                  </p>

                  <p>
                    لا يجوز إنشاء حسابات بهدف انتحال شخصية أشخاص آخرين أو
                    استخدام بياناتهم دون إذن.
                  </p>
                </section>

                {/* Section 4 */}
                <section id="content" className="scroll-mt-8">
                  <SectionHeader number="04" title="نشر المقالات والمحتوى" />

                  <p>
                    تتيح مدونة قبس للمستخدمين إنشاء ونشر المقالات والمحتوى من
                    خلال حساباتهم.
                  </p>

                  <p>
                    تظل ملكية المحتوى الأصلي الذي تنشئه وتنشره من خلال المنصة
                    لك، ولا تنتقل ملكيته إلى مدونة قبس لمجرد نشره عليها.
                  </p>

                  <p>
                    عند نشر المحتوى، تمنح مدونة قبس إذنًا باستخدامه وعرضه ونشره
                    داخل المنصة بالقدر اللازم لتوفير خدمات المدونة وتشغيلها.
                  </p>

                  <p>
                    أنت مسؤول عن المحتوى الذي تنشره وعن امتلاكك للحقوق اللازمة
                    لاستخدامه ونشره.
                  </p>
                </section>

                {/* Section 5 */}
                <section id="intellectual" className="scroll-mt-8">
                  <SectionHeader number="05" title="حقوق الملكية الفكرية" />

                  <p>
                    تظل حقوق الملكية الفكرية المتعلقة بالمقالات والمحتوى الأصلي
                    الذي ينشئه المستخدم مملوكة لصاحبها، ما لم يتم الاتفاق على
                    خلاف ذلك.
                  </p>

                  <p>
                    أما اسم مدونة قبس وشعارها وتصميمها وواجهاتها والعناصر
                    البرمجية والمحتوى الأصلي الذي توفره المنصة، فهي مملوكة
                    لمدونة قبس أو مستخدمة بموجب حقوق أو تراخيص مناسبة.
                  </p>

                  <p>
                    لا يجوز نسخ أو إعادة نشر أو توزيع أجزاء من المنصة أو
                    استخدامها تجاريًا دون الحصول على الإذن المناسب.
                  </p>
                </section>

                {/* Section 6 */}
                <section id="moderation" className="scroll-mt-8">
                  <SectionHeader number="06" title="إدارة المحتوى" />

                  <p>
                    تحتفظ مدونة قبس بالحق في مراجعة المحتوى المنشور على المنصة
                    واتخاذ الإجراءات المناسبة تجاه المحتوى الذي يخالف هذه الشروط
                    أو يؤثر على تشغيل المنصة.
                  </p>

                  <p>
                    قد تشمل هذه الإجراءات إخفاء المحتوى أو حذفه أو تقييد إمكانية
                    الوصول إليه، كما قد تشمل تعليق الحساب أو إنهاءه في الحالات
                    المناسبة.
                  </p>

                  <p>
                    تهدف هذه الإجراءات إلى الحفاظ على جودة المنصة وسلامة تجربة
                    استخدامها.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="external" className="scroll-mt-8">
                  <SectionHeader number="07" title="الروابط الخارجية" />

                  <p>قد تحتوي مدونة قبس على روابط لمواقع أو خدمات خارجية.</p>

                  <p>
                    هذه الروابط قد تكون مقدمة لتوفير مصادر أو معلومات إضافية،
                    ولا تعني بالضرورة أن قبس تؤيد محتوى أو خدمات المواقع
                    المرتبطة بها.
                  </p>

                  <p>
                    عند استخدامك لموقع خارجي، فإنك تصبح خاضعًا للشروط والسياسات
                    الخاصة بذلك الموقع.
                  </p>
                </section>

                {/* Section 8 */}
                <section id="disclaimer" className="scroll-mt-8">
                  <SectionHeader number="08" title="إخلاء المسؤولية" />

                  <p>
                    المقالات والمحتوى المنشور بواسطة المستخدمين يعبر عن آراء
                    وتجارب أصحابها، ولا يمثل بالضرورة رأي مدونة قبس.
                  </p>

                  <p>
                    يتم تقديم المحتوى المنشور على المدونة لأغراض معرفية وثقافية،
                    ولا ينبغي اعتباره بديلًا عن الاستشارة المتخصصة عندما تكون
                    هناك حاجة إليها.
                  </p>
                </section>

                {/* Section 9 */}
                <section id="availability" className="scroll-mt-8">
                  <SectionHeader number="09" title="توافر الخدمة" />

                  <p>
                    نسعى إلى إبقاء مدونة قبس وخدماتها متاحة بصورة مستقرة قدر
                    الإمكان، لكننا لا نضمن أن تكون المنصة متاحة دون انقطاع أو
                    خالية من الأخطاء في جميع الأوقات.
                  </p>

                  <p>
                    قد يتم إيقاف الموقع أو بعض وظائفه مؤقتًا لأغراض الصيانة أو
                    التحديث أو التطوير أو لأي أسباب تقنية أخرى.
                  </p>
                </section>

                {/* Section 10 */}
                <section id="liability" className="scroll-mt-8">
                  <SectionHeader number="10" title="تحديد المسؤولية" />

                  <p>
                    يتحمل المستخدم مسؤولية استخدامه للمنصة والمحتوى الذي ينشره
                    من خلال حسابه.
                  </p>

                  <p>
                    لا تتحمل مدونة قبس مسؤولية القرارات أو التصرفات التي يتخذها
                    المستخدم اعتمادًا على المحتوى المنشور من قبل مستخدمين آخرين.
                  </p>

                  <p>
                    يتم تقديم المنصة وخدماتها بالشكل المتاح، ونسعى باستمرار إلى
                    تحسينها ومعالجة المشكلات التقنية التي قد تظهر.
                  </p>
                </section>

                {/* Section 11 */}
                <section id="changes" className="scroll-mt-8">
                  <SectionHeader number="11" title="تعديل الشروط" />

                  <p>
                    قد نقوم بتحديث هذه الشروط من وقت لآخر نتيجة لتطور المدونة أو
                    إضافة وظائف وخدمات جديدة.
                  </p>

                  <p>
                    عند إجراء تغييرات على الشروط، سيتم تحديث تاريخ "آخر تحديث"
                    الظاهر في أعلى هذه الصفحة.
                  </p>

                  <p>
                    استمرارك في استخدام مدونة قبس بعد نشر التعديلات يعني موافقتك
                    على الشروط المحدثة.
                  </p>
                </section>

                {/* Section 12 */}
                <section id="termination" className="scroll-mt-8">
                  <SectionHeader number="12" title="إنهاء الحساب" />

                  <p>
                    يمكنك طلب حذف حسابك في أي وقت وفقًا للخيارات المتاحة داخل
                    المنصة.
                  </p>

                  <p>
                    تحتفظ مدونة قبس بالحق في تعليق أو إنهاء الحسابات التي تخالف
                    هذه الشروط، خصوصًا في حالات المخالفات المتكررة أو التي تؤثر
                    على المنصة أو المستخدمين الآخرين.
                  </p>

                  <p>
                    لا يعني حذف الحساب بالضرورة إزالة جميع النسخ أو السجلات التي
                    قد يكون الاحتفاظ بها مطلوبًا لأسباب تقنية أو قانونية.
                  </p>
                </section>

                {/* Conclusion */}
                <div className="mt-14 rounded-2xl border border-primary/10 bg-primary/5 p-6 md:p-8">
                  <p className="mb-3 text-sm font-semibold text-primary/70">
                    استخدام مسؤول
                  </p>

                  <h2 className="text-2xl font-bold md:text-3xl">
                    اقرأ، اكتب، واترك أثرًا.
                  </h2>

                  <p className="mt-4 text-sm leading-8 text-dark/55 md:text-base">
                    نريد أن تظل مدونة قبس مساحة بسيطة ومريحة للقراءة والكتابة
                    ومشاركة المعرفة. الالتزام بهذه الشروط يساعدنا على الحفاظ على
                    هذه التجربة للجميع.
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
    <div className="mb-6 mt-12 flex items-start gap-4">
      <span className="flex h-10 min-w-10 items-center justify-center rounded-2xl bg-primary/5 text-xs font-semibold text-primary">
        {number}
      </span>

      <h2 className="pt-1 text-2xl font-bold leading-tight md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
