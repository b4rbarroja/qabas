"use client";
import {
  PenTool,
  BookOpen,
  Compass,
  UserCheck,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  interface User {
    uid: string;
    role: string;
    name?: string;
  }
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "my-posts" | "create" | "explore" | "settings"
  >("my-posts");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookieCheck = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    cookieCheck();
  }, [router]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      alert(error);
    }
  };
  const myPosts = [
    {
      id: 1,
      title: "مناهج البحث العلمي عند علماء المشرق",
      date: "20 أغسطس 2026",
      category: "تاريخ العلوم",
      readTime: "6 دقائق",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "تأثير الترجمة الذكية على البلاغة العربية",
      date: "15 أغسطس 2026",
      category: "ترجمة ونقد",
      readTime: "4 دقائق",
      image: "/api/placeholder/400/250",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f4f4f4] font-thamaniyah text-[#1a1a1a] font-sans"
    >
      {/* الشريط العلوي - Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              ق
            </div>
            <span className="font-semibold text-lg tracking-tight">
              قَبَسْ | لوحة التحكم
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings size={16} />
              <span>إعدادات الحساب</span>
            </button>
            <button
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
              onClick={handleLogOut}
            >
              <LogOut size={16} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي - Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* القائمة الجانبية - Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("my-posts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "my-posts"
                ? "bg-black text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen size={18} />
            <span>مقالاتي</span>
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "create"
                ? "bg-black text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PenTool size={18} />
            <span>نشر مقالة جديدة</span>
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "explore"
                ? "bg-black text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Compass size={18} />
            <span>تصفح المقالات</span>
          </button>
        </aside>

        {/* منطقة عرض المحتوى - Content Area */}
        <main className="flex-1 space-y-6">
          {/* رسالة الترحيب بالمستخدم */}
          {user && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  مرحباً بك مجدداً، {user.name || "عضو قبس"} 👋
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  معرّف الحساب:{" "}
                  <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {user.uid}
                  </span>{" "}
                  | الصلاحية: {user.role}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* تبويب: مقالاتي */}
            {activeTab === "my-posts" && (
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold">مقالاتي المكتوبة</h2>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} />
                    <span>كتابة مقال</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">
                          وقت القراءة: {post.readTime}
                        </p>
                        <div className="flex gap-2 border-t border-gray-100 pt-3">
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                            <Edit3 size={14} /> تعديل
                          </button>
                          <button className="flex items-center justify-center p-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تبويب: نشر مقالة */}
            {activeTab === "create" && (
              <div>
                <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">
                  نشر مقالة جديدة
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عنوان المقال
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل عنوان المقال هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        التصنيف
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                        <option>تاريخ العلوم</option>
                        <option>لسانيات</option>
                        <option>ترجمة ونقد</option>
                        <option>الذكاء الاصطناعي</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        صورة الغلاف (رابط)
                      </label>
                      <input
                        type="text"
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      محتوى المقال
                    </label>
                    <textarea
                      rows={8}
                      placeholder="اكتب نص المقال هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
                  >
                    نشر المقال الآن
                  </button>
                </form>
              </div>
            )}

            {/* تبويب: تصفح المقالات */}
            {activeTab === "explore" && (
              <div>
                <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">
                  تصفح جميع المقالات
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="w-full sm:w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                            لسانيات
                          </span>
                          <span>• 25 أغسطس 2026</span>
                        </div>
                        <h3 className="font-bold text-base mb-1">
                          تطور البنيوية في اللسانيات الحديثة
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          قراءة نقدية في الانتقال من النظرية التوزيعية إلى النحو
                          التوليدي...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تبويب: إعدادات الحساب */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">
                  تعديل معلومات الحساب
                </h2>
                <form
                  className="space-y-4 max-w-lg"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      placeholder="أدخل اسمك..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الوصف القصير (Bio)
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل وصفاً قصيراً..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
                  >
                    حفظ التغييرات
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
