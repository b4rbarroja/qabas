"use client";

import { API_BASE_URL, apiFetch } from "@/lib/api";
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
  LogOut,
  AlertTriangle,
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
  snippet?: string;
  createdAt?: string;
  submittedDate?: string;
  views?: number;
  author?:
    | {
        id?: string | number;
        name?: string;
        specialization?: string;
        userImage?: string;
      }
    | string;
  user?: {
    id?: string | number;
    name?: string;
    specialization?: string;
    userImage?: string;
  };
  [key: string]: any;
}

interface Report {
  id: string | number;
  postId: string | number;
  reason?: string;
  createdAt?: string;
  [key: string]: any;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending"); // 'pending', 'articles', 'users', 'reports'
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pendingArticles, setPendingArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingPending, setLoadingPending] = useState<boolean>(true);
  const [loadingReports, setLoadingReports] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // 1. جلب بيانات الأعضاء
    const getAllUsers = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/users`, {
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

    // 2. جلب جميع المقالات المنشورة
    const getAllPosts = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/posts`, {
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

    // 3. جلب المقالات المعلقة
    const getPendingPosts = async () => {
      setLoadingPending(true);
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/pendingPosts`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`خطأ في السيرفر: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setPendingArticles(data);
        } else if (data.pendingPosts && Array.isArray(data.pendingPosts)) {
          setPendingArticles(data.pendingPosts);
        } else if (data.posts && Array.isArray(data.posts)) {
          setPendingArticles(data.posts);
        } else if (data.data && Array.isArray(data.data)) {
          setPendingArticles(data.data);
        }
      } catch (error) {
        console.error("خطأ في جلب المقالات المعلقة:", error);
      } finally {
        setLoadingPending(false);
      }
    };

    // 4. جلب المنشورات المبلغ عنها (البلاغات)
    const getReports = async () => {
      setLoadingReports(true);
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/report`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setReports(data);
        } else if (data.reports && Array.isArray(data.reports)) {
          setReports(data.reports);
        }
      } catch (error) {
        console.error("خطأ في جلب البلاغات:", error);
      } finally {
        setLoadingReports(false);
      }
    };

    // 5. التحقق من صلاحية الأدمن ثم تشغيل جلب البيانات
    const checkAdmin = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/auth/me`, {
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
        getPendingPosts();
        getReports();
      } catch (error) {
        console.error("خطأ أثناء التحقق من الأدمن:", error);
        router.push("/dashboard");
      }
    };

    checkAdmin();
  }, [router]);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      await apiFetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
      router.push("/login");
    }
  };

  // دالة قبول المقال
  const handleApprovePost = async (postId: string | number) => {
    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/posts/${postId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "APPROVED" }),
        },
      );

      if (response.ok) {
        const approvedArticle = pendingArticles.find(
          (art) => art.id === postId,
        );
        setPendingArticles((prev) => prev.filter((art) => art.id !== postId));
        if (approvedArticle) {
          setArticles((prev) => [approvedArticle, ...prev]);
        }
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || errorData.error || "حدث خطأ أثناء قبول المقال",
        );
      }
    } catch (error) {
      console.error("خطأ في قبول المقال:", error);
      alert("تعذر الاتصال بالسيرفر لقبول المقال");
    }
  };

  // دالة رفض المقال
  const handleRejectPost = async (postId: string | number) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في رفض هذا المقال؟")) {
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/posts/${postId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "REJECTED" }),
        },
      );

      if (response.ok) {
        setPendingArticles((prev) => prev.filter((art) => art.id !== postId));
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || errorData.error || "حدث خطأ أثناء رفض المقال",
        );
      }
    } catch (error) {
      console.error("خطأ في رفض المقال:", error);
      alert("تعذر الاتصال بالسيرفر لرفض المقال");
    }
  };

  // دالة حذف العضو
  const handleDeleteUser = async (userId: string | number) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في حذف هذا العضو؟")) {
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/users/${userId}`,
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

  // دالة حذف المقال العام
  const handleDeletePost = async (postId: string | number) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في حذف هذا المقال؟")) {
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setArticles((prevPosts) =>
          prevPosts.filter((art) => String(art.id) !== String(postId)),
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

  // دالة حذف البلاغ الفردي (باستخدام معرف البلاغ id - الطريقة الثانية)
  const handleDeleteReport = async (reportId: string | number) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/api/report`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: reportId }),
      });

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.filter((rep) => String(rep.id) !== String(reportId)),
        );
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || errorData.error || "حدث خطأ أثناء حذف البلاغ",
        );
      }
    } catch (error) {
      console.error("خطأ في حذف البلاغ:", error);
      alert("تعذر الاتصال بالسيرفر لحذف البلاغ");
    }
  };

  // دالة حذف المقال من قسم البلاغات (تحذف المقال ومعه البلاغ)
  const handleDeletePostFromReport = async (
    postId: string | number,
    reportId: string | number,
  ) => {
    if (
      !window.confirm(
        "هل أنت تأكد من رغبتك في حذف المقال الأصلي بناءً على هذا البلاغ؟",
      )
    ) {
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        // حذف المقال من الـ state للمقالات العامة
        setArticles((prev) =>
          prev.filter((art) => String(art.id) !== String(postId)),
        );
        // حذف البلاغ الخاص بهذا المقال
        await handleDeleteReport(reportId);
        alert("تم حذف المقال والبلاغ المرتبط به بنجاح.");
      } else {
        const errorData = await response.json();
        alert(
          errorData.error || errorData.message || "حدث خطأ أثناء حذف المقال",
        );
      }
    } catch (error) {
      console.error("خطأ أثناء حذف المقال:", error);
      alert("تعذر الاتصال بالسيرفر لحذف المقال");
    }
  };

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
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold"
          >
            <LogOut size={14} />
            تسجيل الخروج
          </button>
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
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-medium transition-all duration-200 ${
              activeTab === "reports"
                ? "bg-[#111111] text-white shadow-sm"
                : "hover:bg-[#f0eee6] text-[#444444]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={18} />
              <span>المنشورات المبلغ عنها</span>
            </div>
            {reports.length > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "reports"
                    ? "bg-white text-[#111111]"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {reports.length}
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

              {loadingPending ? (
                <div className="text-center py-16 text-[#777777]">
                  <p className="font-medium animate-pulse">
                    جاري تحميل المقالات المعلقة...
                  </p>
                </div>
              ) : pendingArticles.length === 0 ? (
                <div className="text-center py-16 text-[#777777]">
                  <CheckCircle2
                    size={40}
                    className="mx-auto mb-3 stroke-1 text-emerald-600"
                  />
                  <p className="font-medium">لا توجد مقالات معلقة حالياً.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map((article) => {
                    const authorObj = article.author || article.user;
                    const authorName =
                      typeof authorObj === "object"
                        ? authorObj?.name
                        : typeof article.author === "string"
                          ? article.author
                          : "غير محدد";

                    const dateDisplay =
                      article.createdAt || article.submittedDate
                        ? new Date(
                            article.createdAt || article.submittedDate || "",
                          ).toLocaleDateString("ar-EG")
                        : "غير محدد";

                    return (
                      <div
                        key={article.id}
                        className="bg-[#ffffff] border border-[#e5e3db] p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-[#cccccc] transition-all shadow-xs"
                      >
                        <div className="space-y-1.5 max-w-xl">
                          <h3 className="font-bold text-lg text-[#111111]">
                            {article.title}
                          </h3>
                          <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed">
                            {article.description ||
                              article.snippet ||
                              article.content}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#777777] pt-2">
                            <span>
                              الكاتب:{" "}
                              <strong className="text-[#222222]">
                                {authorName}
                              </strong>
                            </span>
                            <span>•</span>
                            <span>تاريخ التقديم: {dateDisplay}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 border-t md:border-t-0 border-[#f0eee6] pt-3 md:pt-0">
                          <button
                            onClick={() => handleApprovePost(article.id)}
                            className="flex items-center gap-1.5 bg-[#111111] hover:bg-[#333333] text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all shadow-xs cursor-pointer"
                          >
                            <Check size={15} /> قبول
                          </button>
                          <button
                            onClick={() => handleRejectPost(article.id)}
                            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
                          >
                            <X size={15} /> رفض
                          </button>
                          <button
                            onClick={() => router.push(`/posts/${article.id}`)}
                            title="معاينة"
                            className="p-2 text-[#555555] hover:text-[#111111] hover:bg-[#f0eee6] rounded-lg transition-all cursor-pointer"
                          >
                            <Eye size={17} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
                      {articles.map((art) => {
                        const authorObj = art.author || art.user;
                        const authorName =
                          typeof authorObj === "object"
                            ? authorObj?.name
                            : typeof art.author === "string"
                              ? art.author
                              : "غير معروف";

                        return (
                          <tr
                            key={art.id}
                            className="hover:bg-[#faf9f5] transition-colors"
                          >
                            <td className="p-3.5 px-4 font-semibold text-[#111111]">
                              {art.title}
                            </td>
                            <td className="p-3.5 text-[#444444]">
                              {authorName}
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
                                className="p-1.5 text-[#555555] hover:text-[#111111] hover:bg-[#f0eee6] rounded-md transition-all cursor-pointer"
                                title="عرض المقال"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDeletePost(art.id)}
                                className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
                                title="حذف المقال"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 3. قسم المنشورات المبلغ عنها (البلاغات) */}
          {activeTab === "reports" && (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-[#e8e6de] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">
                    المنشورات المبلغ عنها ({reports.length})
                  </h2>
                  <p className="text-sm text-[#666666] mt-0.5">
                    مراجعة البلاغات والشكاوى المقدمة ضد المنشورات
                  </p>
                </div>
              </div>

              {loadingReports ? (
                <div className="text-center py-16 text-[#777777]">
                  <p className="font-medium animate-pulse">
                    جاري تحميل البلاغات...
                  </p>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-16 text-[#777777]">
                  <CheckCircle2
                    size={40}
                    className="mx-auto mb-3 stroke-1 text-emerald-600"
                  />
                  <p className="font-medium">لا توجد بلاغات حالياً.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#e5e3db] rounded-xl bg-white">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-[#f7f6f2] text-[#555555] border-b border-[#e5e3db] font-medium">
                      <tr>
                        <th className="p-3.5 px-4">رقم البلاغ</th>
                        <th className="p-3.5">معرف المنشور (Post ID)</th>
                        <th className="p-3.5">سبب البلاغ</th>
                        <th className="p-3.5">التاريخ</th>
                        <th className="p-3.5 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0eee6]">
                      {reports.map((report) => (
                        <tr
                          key={report.id}
                          className="hover:bg-[#faf9f5] transition-colors"
                        >
                          <td className="p-3.5 px-4 font-semibold text-[#111111]">
                            #{report.id}
                          </td>
                          <td className="p-3.5 text-[#444444] font-mono">
                            {report.postId}
                          </td>
                          <td className="p-3.5 text-[#555555]">
                            {report.reason || "لم يذكر سبب"}
                          </td>
                          <td className="p-3.5 text-[#666666]">
                            {report.createdAt
                              ? new Date(report.createdAt).toLocaleDateString(
                                  "ar-EG",
                                )
                              : "-"}
                          </td>
                          <td className="p-3.5 flex justify-center items-center gap-2">
                            {/* زر معاينة المقال */}
                            <a
                              href={`/posts/${report.postId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 bg-[#111111] hover:bg-[#333333] text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                              title="عرض المقال"
                            >
                              <Eye size={14} /> عرض
                            </a>

                            {/* زر حذف المقال الأصلي بناءً على البلاغ */}
                            <button
                              onClick={() =>
                                handleDeletePostFromReport(
                                  report.postId,
                                  report.id,
                                )
                              }
                              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                              title="حذف المقال الأصلي"
                            >
                              <Trash2 size={14} /> حذف المقال
                            </button>

                            {/* زر حذف البلاغ فقط (تجاهل الشكوى) */}
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                              title="تجاهل البلاغ وحذفه"
                            >
                              <X size={14} /> إغلاق البلاغ
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

          {/* 4. قسم جميع الأعضاء */}
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
                              src={u.userImage}
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
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
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
