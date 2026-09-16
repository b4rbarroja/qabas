"use client";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Users,
  Clock,
  Check,
  X,
  Trash2,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  specialization?: string;
  userImage?: string;
  [key: string]: any;
}

interface Article {
  id: string | number;
  title: string;
  content?: string;
  description?: string;
  createdAt?: string;
  views?: number;
  author?: {
    id?: string | number;
    name?: string;
    specialization?: string;
    userImage?: string;
  };
  [key: string]: any;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending"); // 'pending', 'articles', 'users'
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 1. جلب بيانات الأعضاء
    const getAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الأعضاء:", error);
      }
    };

    // 2. جلب جميع المقالات
    const getAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data.posts && Array.isArray(data.posts)) {
          setArticles(data.posts);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المقالات:", error);
      }
    };

    // 3. التحقق من صلاحية الأدمن ثم تشغيل جلب البيانات
    const checkAdmin = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        const role = data?.user?.role;

        if (!response.ok || role !== "ADMIN") {
          router.push("/dashboard");
          return;
        }

        getAllUsers();
        getAllPosts();
      } catch (error) {
        console.error("خطأ أثناء التحقق من الأدمن:", error);
        router.push("/dashboard");
      }
    };

    checkAdmin();
  }, [router]);

  // دالة حذف العضو
  const handleDeleteUser = async (userId: string | number) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في حذف هذا العضو؟")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || errorData.error || "حدث خطأ أثناء حذف العضو",
        );
      }
    } catch (error) {
      console.error("خطأ في حذف العضو:", error);
      alert("تعذر الاتصال بالسيرفر لحذف العضو");
    }
  };

  // دالة حذف المقال
  const handleDeletePost = async (postId: string | number) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في حذف هذا المقال؟")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setArticles((prevPosts) =>
          prevPosts.filter((art) => art.id !== postId),
        );
      } else {
        const errorData = await response.json();
        alert(
          errorData.error || errorData.message || "حدث خطأ أثناء حذف المقال",
        );
      }
    } catch (error) {
      console.error("خطأ في حذف المقال:", error);
      alert("تعذر الاتصال بالسيرفر لحذف المقال");
    }
  };

  // بيانات المنشورات المعلقة للمراجعة
  const [pendingArticles, setPendingArticles] = useState([
    {
      id: 101,
      title: "فلسفة البراغماتية في الفكر المعاصر",
      author: "علي حسن",
      submittedDate: "2026-09-15",
      snippet:
        "تناقش هذه المقالة الجذور التاريخية للبراغماتية وكيف أثرت في فلسفة العلوم واللغة والتفكير المعاصر...",
    },
    {
      id: 102,
      title: "أساسيات البرمجة الكائنية بلغة TypeScript",
      author: "ياسمين خليل",
      submittedDate: "2026-09-16",
      snippet:
        "شرح مفصل لمفاهيم Classes و Interfaces وكيفية التعامل معها في المشرعات الضخمة بلغة TypeScript...",
    },
  ]);

  return (
    <div
      dir="rtl"
      className="min-h-screen font-thamaniyah bg-[#f7f6f2] text-[#1a1a1a] font-sans antialiased selection:bg-[#222222] selection:text-white"
    >
      {/* الهيدر العلوي */}
      <header className="border-b border-[#e2e0d8] bg-[#fbfbfa] px-6 py-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#111111] flex items-center gap-2">
            قَبَسْ
            <span className="text-xs font-medium text-[#444444] bg-[#eeeeea] border border-[#e0ded6] px-2.5 py-0.5 rounded-full">
              لوحة التحكم
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-[#555555]">
          <span>مرحباً، الأدمن</span>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* الشريط الجانبي (Sidebar) */}
        <aside className="md:col-span-1 bg-[#fbfbfa] border border-[#e2e0d8] rounded-2xl p-3 h-fit space-y-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("pending")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-medium transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-[#111111] text-white shadow-sm"
                : "hover:bg-[#f0eee6] text-[#444444]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock size={18} />
              <span>المنشورات المعلقة</span>
            </div>
            {pendingArticles.length > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "pending"
                    ? "bg-white text-[#111111]"
                    : "bg-[#e5e3db] text-[#111111]"
                }`}
              >
                {pendingArticles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-medium transition-all duration-200 ${
              activeTab === "articles"
                ? "bg-[#111111] text-white shadow-sm"
                : "hover:bg-[#f0eee6] text-[#444444]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText size={18} />
              <span>جميع المقالات</span>
            </div>
            {articles.length > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "articles"
                    ? "bg-white text-[#111111]"
                    : "bg-[#e5e3db] text-[#111111]"
                }`}
              >
                {articles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-medium transition-all duration-200 ${
              activeTab === "users"
                ? "bg-[#111111] text-white shadow-sm"
                : "hover:bg-[#f0eee6] text-[#444444]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users size={18} />
              <span>إدارة الأعضاء</span>
            </div>
            {users.length > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "users"
                    ? "bg-white text-[#111111]"
                    : "bg-[#e5e3db] text-[#111111]"
                }`}
              >
                {users.length}
              </span>
            )}
          </button>
        </aside>

        {/* منطقة العمل الرئيسية */}
        <main className="md:col-span-3 bg-[#fbfbfa] border border-[#e2e0d8] rounded-2xl p-6 shadow-sm">
          {/* 1. قسم المنشورات المعلقة */}
          {activeTab === "pending" && (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-[#e8e6de] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">
                    المنشورات المعلقة للمراجعة
                  </h2>
                  <p className="text-sm text-[#666666] mt-0.5">
                    المقالات التي تنتظر مراجعتك للموافقة على نشرها للعموم
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#333333] bg-[#f0eee6] border border-[#e0ded6] px-3 py-1.5 rounded-full">
                  {pendingArticles.length} تنتظر القرار
                </span>
              </div>

              {pendingArticles.length === 0 ? (
                <div className="text-center py-16 text-[#777777]">
                  <CheckCircle2
                    size={40}
                    className="mx-auto mb-3 stroke-1 text-emerald-600"
                  />
                  <p className="font-medium">لا توجد مقالات معلقة حالياً.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-[#ffffff] border border-[#e5e3db] p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-[#cccccc] transition-all shadow-xs"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <h3 className="font-bold text-lg text-[#111111]">
                          {article.title}
                        </h3>
                        <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed">
                          {article.snippet}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#777777] pt-2">
                          <span>
                            الكاتب:{" "}
                            <strong className="text-[#222222]">
                              {article.author}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>تاريخ التقديم: {article.submittedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t md:border-t-0 border-[#f0eee6] pt-3 md:pt-0">
                        <button className="flex items-center gap-1.5 bg-[#111111] hover:bg-[#333333] text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all shadow-xs">
                          <Check size={15} /> قبول
                        </button>
                        <button className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-2 rounded-lg text-xs font-medium transition-all">
                          <X size={15} /> رفض
                        </button>
                        <button
                          title="معاينة"
                          className="p-2 text-[#555555] hover:text-[#111111] hover:bg-[#f0eee6] rounded-lg transition-all"
                        >
                          <Eye size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. قسم جميع المقالات الجالب من السيرفر */}
          {activeTab === "articles" && (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-[#e8e6de] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">
                    جميع المقالات المنشورة ({articles.length})
                  </h2>
                  <p className="text-sm text-[#666666] mt-0.5">
                    عرض واستعراض المقالات المنشورة على منصة قَبَسْ
                  </p>
                </div>
              </div>

              {articles.length === 0 ? (
                <div className="text-center py-16 text-[#777777]">
                  <p className="font-medium">لا توجد مقالات منشورة حالياً.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#e5e3db] rounded-xl bg-white">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-[#f7f6f2] text-[#555555] border-b border-[#e5e3db] font-medium">
                      <tr>
                        <th className="p-3.5 px-4">العنوان</th>
                        <th className="p-3.5">الكاتب</th>
                        <th className="p-3.5">تاريخ النشر</th>
                        <th className="p-3.5">المشاهدات</th>
                        <th className="p-3.5 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0eee6]">
                      {articles.map((art) => (
                        <tr
                          key={art.id}
                          className="hover:bg-[#faf9f5] transition-colors"
                        >
                          <td className="p-3.5 px-4 font-semibold text-[#111111]">
                            {art.title}
                          </td>
                          <td className="p-3.5 text-[#444444]">
                            {art.author?.name || "غير معروف"}
                          </td>
                          <td className="p-3.5 text-[#666666]">
                            {art.createdAt
                              ? new Date(art.createdAt).toLocaleDateString(
                                  "ar-EG",
                                )
                              : "-"}
                          </td>
                          <td className="p-3.5 text-[#666666]">
                            {art.views || 0}
                          </td>
                          <td className="p-3.5 flex justify-center gap-2">
                            <button
                              onClick={() => router.push(`/posts/${art.id}`)}
                              className="p-1.5 text-[#555555] hover:text-[#111111] hover:bg-[#f0eee6] rounded-md transition-all"
                              title="عرض المقال"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePost(art.id)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-all"
                              title="حذف المقال"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 3. قسم جميع الأعضاء */}
          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-[#e8e6de] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">
                    قائمة الأعضاء ({users.length})
                  </h2>
                  <p className="text-sm text-[#666666] mt-0.5">
                    إدارة الأعضاء المسجلين وأدوارهم في المنصة
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#e5e3db] rounded-xl bg-white">
                <table className="w-full text-right text-sm">
                  <thead className="bg-[#f7f6f2] text-[#555555] border-b border-[#e5e3db] font-medium">
                    <tr>
                      <th className="p-3.5 px-4">الاسم</th>
                      <th className="p-3.5">البريد الإلكتروني</th>
                      <th className="p-3.5">التخصص</th>
                      <th className="p-3.5">الدور</th>
                      <th className="p-3.5 text-center">حذف/حظر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eee6]">
                    {users.map((u) => (
                      <tr
                        key={u.id || u._id}
                        className="hover:bg-[#faf9f5] transition-colors"
                      >
                        <td className="p-3.5 px-4 font-semibold text-[#111111] flex items-center gap-2.5">
                          {u.userImage && (
                            <img
                              src={
                                u.userImage.startsWith("http")
                                  ? u.userImage
                                  : `http://localhost:5000${u.userImage}`
                              }
                              alt={u.name}
                              className="w-8 h-8 rounded-full object-cover border border-[#e0ded6]"
                            />
                          )}
                          <span>{u.name}</span>
                        </td>
                        <td className="p-3.5 text-[#555555]">{u.email}</td>
                        <td className="p-3.5 text-[#666666]">
                          {u.specialization || "غير محدد"}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                              u.role === "ADMIN"
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-[#f0eee6] text-[#222222] border-[#e0ded6]"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteUser(u.id || u._id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-all"
                            title="حذف العضو"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
