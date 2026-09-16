"use client";

import {
  PenTool,
  BookOpen,
  Compass,
  LogOut,
  Plus,
  XCircle,
  Edit3,
  Settings,
  X,
  Home,
  User as UserIcon,
  Globe,
  Mail,
  Briefcase,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Users,
  FileText,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  interface User {
    uid: string;
    role: string;
    name?: string;
  }

  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    | "my-posts"
    | "create"
    | "explore"
    | "settings"
    | "admin-users"
    | "admin-posts"
    | "admin-pending"
  >("my-posts");

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // بيانات لوحة تحكم الأدمن
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminPosts, setAdminPosts] = useState<any[]>([]);
  const [pendingPosts, setPendingPosts] = useState<any[]>([]);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // حالة بيانات البروفايل وصورة الشخصية
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    specialization: "",
    bio: "",
    selectedCategories: [] as string[],
    portfolioUrl: "",
    userImage: "",
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  // حالات مودال التعديل (Edit Modal State)
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
    content: "",
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  interface UserProfileData {
    id: string;
    name: string;
    email: string;
    bio?: string;
    specialization?: string;
    portfolioUrl?: string;
    userImage?: string;
  }

  const [me, setMe] = useState<UserProfileData | null>(null);
  useEffect(() => {
    const fetchingDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/cu", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setMe(data);
      } catch (error) {}
    };
    fetchingDetails();
  }, []);

  const getPostId = (post: any) => post.id || post._id;
  const getUserId = (item: any) => item.uid || item.id || item._id;

  // لوحة الأدمن - استدعاءات API فقط، والـ backend مسؤول عن التحقق من الصلاحيات
  const fetchAdminData = async () => {
    setIsAdminLoading(true);

    try {
      const [usersResponse, postsResponse, pendingResponse] = await Promise.all(
        [
          fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/admin/posts", {
            method: "GET",
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/admin/posts/pending", {
            method: "GET",
            credentials: "include",
          }),
        ],
      );

      if (!usersResponse.ok || !postsResponse.ok || !pendingResponse.ok) {
        throw new Error("فشل تحميل بيانات لوحة الأدمن");
      }

      const [usersData, postsData, pendingData] = await Promise.all([
        usersResponse.json(),
        postsResponse.json(),
        pendingResponse.json(),
      ]);

      setAdminUsers(
        Array.isArray(usersData) ? usersData : usersData.users || [],
      );
      setAdminPosts(
        Array.isArray(postsData) ? postsData : postsData.posts || [],
      );
      setPendingPosts(
        Array.isArray(pendingData)
          ? pendingData
          : pendingData.posts || pendingData.pendingPosts || [],
      );
    } catch (error: any) {
      console.error("Admin dashboard error:", error);
      alert(`خطأ في لوحة الأدمن: ${error.message || error}`);
    } finally {
      setIsAdminLoading(false);
    }
  };

  const handleAdminDeleteUser = async (userId: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا العضو؟")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || errorData.error || "فشل حذف العضو",
        );
      }

      setAdminUsers((prev) =>
        prev.filter((item) => String(getUserId(item)) !== String(userId)),
      );
    } catch (error: any) {
      alert(`خطأ أثناء حذف العضو: ${error.message || error}`);
    }
  };

  const handleAdminDeletePost = async (postId: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنشور؟")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || errorData.error || "فشل حذف المنشور",
        );
      }

      setAdminPosts((prev) =>
        prev.filter((post) => String(getPostId(post)) !== String(postId)),
      );
      setPendingPosts((prev) =>
        prev.filter((post) => String(getPostId(post)) !== String(postId)),
      );
    } catch (error: any) {
      alert(`خطأ أثناء حذف المنشور: ${error.message || error}`);
    }
  };

  const handleApprovePost = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/posts/${postId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: "approved" }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || errorData.error || "فشل الموافقة على المنشور",
        );
      }

      const approvedPost = await response.json().catch(() => null);

      setPendingPosts((prev) =>
        prev.filter((post) => String(getPostId(post)) !== String(postId)),
      );

      if (approvedPost && approvedPost.id) {
        setAdminPosts((prev) => [approvedPost, ...prev]);
      } else {
        setAdminPosts((prev) => {
          const pendingPost = pendingPosts.find(
            (post) => String(getPostId(post)) === String(postId),
          );

          return pendingPost
            ? [{ ...pendingPost, status: "approved" }, ...prev]
            : prev;
        });
      }
    } catch (error: any) {
      alert(`خطأ أثناء الموافقة: ${error.message || error}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedHashtags = formData.hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const postPayload = new FormData();
    postPayload.append("title", formData.title);
    postPayload.append("description", formData.description);
    postPayload.append("content", formData.content);
    postPayload.append("hashtags", JSON.stringify(formattedHashtags));
    if (imageFile) {
      postPayload.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        credentials: "include",
        body: postPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل نشر المقال");
      }

      const newPost = await response.json();
      setPosts((prev) => [newPost, ...prev]);
      setFormData({
        title: "",
        description: "",
        hashtags: "",
        content: "",
      });
      setImageFile(null);
      setActiveTab("my-posts");
    } catch (error: any) {
      alert(`خطأ: ${error.message || error}`);
    }
  };

  // دالة الحذف
  const handleDelete = async (postId: string) => {
    const confirmDelete = window.confirm(
      "هل أنت تأكد من رغبتك في حذف هذا المقال؟",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.error || "فشل حذف المقال",
        );
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error: any) {
      alert(`خطأ أثناء الحذف: ${error.message || error}`);
    }
  };

  // فتح نافذة التعديل وتعبئة البيانات القائمة
  const handleOpenEditModal = (post: any) => {
    setEditingPost(post);
    setEditFormData({
      title: post.title || "",
      description: post.description || "",
      hashtags: Array.isArray(post.hashtags) ? post.hashtags.join(", ") : "",
      content: post.content || "",
    });
    setEditImageFile(null);
  };

  // إرسال طلب التعديل
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const formattedHashtags = editFormData.hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const updatePayload = new FormData();
    updatePayload.append("title", editFormData.title);
    updatePayload.append("description", editFormData.description);
    updatePayload.append("content", editFormData.content);
    updatePayload.append("hashtags", JSON.stringify(formattedHashtags));
    if (editImageFile) {
      updatePayload.append("image", editImageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${editingPost.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: updatePayload,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل تحديث المقال");
      }

      const updatedPost = await response.json();

      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, ...updatedPost } : p,
        ),
      );

      setEditingPost(null);
    } catch (error: any) {
      alert(`خطأ أثناء التعديل: ${error.message || error}`);
    }
  };

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

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user?.role]);

  useEffect(() => {
    const findMyPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/posts/my-posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("فشل جلب المقالات");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    findMyPosts();
  }, [router]);

  // جلب بيانات الحساب (GET Profile) عند الانتقال لتبويب الإعدادات
  useEffect(() => {
    if (activeTab === "settings") {
      const fetchProfile = async () => {
        setIsLoadingProfile(true);
        try {
          const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            },
          );

          if (response.ok) {
            const data = await response.json();
            setProfileData({
              name: data.name || "",
              email: data.email || "",
              specialization: data.specialization || "",
              bio: data.bio || "",
              selectedCategories: data.selectedCategories || [],
              portfolioUrl: data.portfolioUrl || "",
              userImage: data.userImage || "",
            });
          }
        } catch (error) {
          console.error("فشل جلب بيانات الحساب:", error);
        } finally {
          setIsLoadingProfile(false);
        }
      };

      fetchProfile();
    }
  }, [activeTab]);

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
        window.location.href = "/";
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f4f4f4] font-thamaniyah text-[#1a1a1a] font-sans"
    >
      {/* المحتوى الرئيسي - Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* القائمة الجانبية - Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-6">
          {/* شعار المنصة ورابط الرئيسية */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ق
              </div>
              <span className="font-semibold text-lg tracking-tight">
                قَبَسْ
              </span>
            </Link>
            <Link
              href="/"
              title="العودة للرئيسية"
              className="p-2 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home size={18} />
            </Link>
          </div>

          {/* روابط التنقل الرئيسية */}
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab("my-posts")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                activeTab === "create"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <PenTool size={18} />
              <span>نشر مقالة جديدة</span>
            </button>

            <button
              onClick={() => router.push("/posts")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                activeTab === "explore"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Compass size={18} />
              <span>تصفح المقالات</span>
            </button>
          </div>

          {/* لوحة الأدمن - تظهر فقط عندما تكون role = admin */}
          {user?.role === "admin" && (
            <div className="pt-4 border-t border-gray-200/80 space-y-1.5">
              <p className="px-4 text-[11px] font-bold text-gray-400 mb-2">
                لوحة الإدارة
              </p>

              <button
                onClick={() => setActiveTab("admin-users")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                  ["admin-users", "admin-posts", "admin-pending"].includes(
                    activeTab,
                  )
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShieldCheck size={18} />
                <span>لوحة الأدمن</span>
              </button>
            </div>
          )}

          {/* خيارات الحساب والخروج */}
          <div className="pt-4 border-t border-gray-200/80 space-y-1.5">
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings size={18} />
              <span>إعدادات الحساب</span>
            </button>

            <button
              onClick={handleLogOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* منطقة عرض المحتوى - Content Area */}
        <main className="flex-1 space-y-6">
          {/* رسالة الترحيب بالمستخدم */}
          {user && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">مرحباً بك في قبس! 👋</h1>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* ================= لوحة تحكم الأدمن ================= */}
            {user?.role === "admin" &&
              ["admin-users", "admin-posts", "admin-pending"].includes(
                activeTab,
              ) && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold">لوحة تحكم الأدمن</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        إدارة الأعضاء والمنشورات والمراجعات
                      </p>
                    </div>

                    <button
                      onClick={fetchAdminData}
                      disabled={isAdminLoading}
                      className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
                    >
                      {isAdminLoading ? "جاري التحديث..." : "تحديث البيانات"}
                    </button>
                  </div>

                  {/* الأقسام الثلاثة فقط */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setActiveTab("admin-users")}
                      className={`rounded-xl border p-4 text-right transition-colors cursor-pointer ${
                        activeTab === "admin-users"
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Users size={20} className="mb-3" />
                      <p className="font-bold text-sm">الأعضاء</p>
                      <p
                        className={`text-xs mt-1 ${
                          activeTab === "admin-users"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {adminUsers.length} عضو
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab("admin-posts")}
                      className={`rounded-xl border p-4 text-right transition-colors cursor-pointer ${
                        activeTab === "admin-posts"
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <FileText size={20} className="mb-3" />
                      <p className="font-bold text-sm">كل المنشورات</p>
                      <p
                        className={`text-xs mt-1 ${
                          activeTab === "admin-posts"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {adminPosts.length} منشور
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab("admin-pending")}
                      className={`rounded-xl border p-4 text-right transition-colors cursor-pointer ${
                        activeTab === "admin-pending"
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Clock3 size={20} className="mb-3" />
                      <p className="font-bold text-sm">المنشورات المعلقة</p>
                      <p
                        className={`text-xs mt-1 ${
                          activeTab === "admin-pending"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {pendingPosts.length} بانتظار الموافقة
                      </p>
                    </button>
                  </div>

                  {isAdminLoading ? (
                    <div className="py-16 text-center text-sm text-gray-500">
                      جاري تحميل بيانات الإدارة...
                    </div>
                  ) : (
                    <>
                      {/* القسم الأول: عرض الأعضاء وحذفهم */}
                      {activeTab === "admin-users" && (
                        <section className="border border-gray-200 rounded-2xl overflow-hidden">
                          <div className="p-5 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-bold">جميع الأعضاء</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              يمكنك حذف أي عضو من المنصة.
                            </p>
                          </div>

                          {adminUsers.length === 0 ? (
                            <p className="p-8 text-center text-sm text-gray-500">
                              لا يوجد أعضاء.
                            </p>
                          ) : (
                            <div className="divide-y divide-gray-100">
                              {adminUsers.map((item) => {
                                const id = getUserId(item);
                                return (
                                  <div
                                    key={String(id)}
                                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                  >
                                    <div>
                                      <p className="font-bold text-sm">
                                        {item.name ||
                                          item.username ||
                                          "بدون اسم"}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {item.email || "لا يوجد بريد إلكتروني"}
                                      </p>
                                      {item.role && (
                                        <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                          {item.role}
                                        </span>
                                      )}
                                    </div>

                                    <button
                                      onClick={() =>
                                        handleAdminDeleteUser(String(id))
                                      }
                                      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium cursor-pointer"
                                    >
                                      <Trash2 size={15} />
                                      حذف العضو
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </section>
                      )}

                      {/* القسم الثاني: عرض كل المنشورات وحذفها */}
                      {activeTab === "admin-posts" && (
                        <section className="border border-gray-200 rounded-2xl overflow-hidden">
                          <div className="p-5 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-bold">جميع المنشورات</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              عرض جميع المنشورات مع إمكانية حذف أي منشور.
                            </p>
                          </div>

                          {adminPosts.length === 0 ? (
                            <p className="p-8 text-center text-sm text-gray-500">
                              لا يوجد منشورات.
                            </p>
                          ) : (
                            <div className="divide-y divide-gray-100">
                              {adminPosts.map((post) => {
                                const id = getPostId(post);
                                return (
                                  <div
                                    key={String(id)}
                                    className="p-5 flex flex-col lg:flex-row lg:items-start justify-between gap-5"
                                  >
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h4 className="font-bold text-base">
                                          {post.title || "بدون عنوان"}
                                        </h4>

                                        {post.status && (
                                          <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                            {post.status}
                                          </span>
                                        )}
                                      </div>

                                      <p className="text-sm text-gray-600 line-clamp-3">
                                        {post.description ||
                                          post.content ||
                                          "لا يوجد محتوى"}
                                      </p>

                                      <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-gray-400">
                                        <span>
                                          الكاتب:{" "}
                                          {post.author?.name ||
                                            post.authorName ||
                                            post.user?.name ||
                                            "غير معروف"}
                                        </span>
                                        {post.createdAt && (
                                          <span>
                                            {new Date(
                                              post.createdAt,
                                            ).toLocaleDateString("ar-EG")}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <button
                                      onClick={() =>
                                        handleAdminDeletePost(String(id))
                                      }
                                      className="shrink-0 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium cursor-pointer"
                                    >
                                      <Trash2 size={15} />
                                      حذف المنشور
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </section>
                      )}

                      {/* القسم الثالث: المنشورات المعلقة والموافقة عليها */}
                      {activeTab === "admin-pending" && (
                        <section className="border border-gray-200 rounded-2xl overflow-hidden">
                          <div className="p-5 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-bold">المنشورات المعلقة</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              راجع المنشورات ثم وافق عليها أو احذفها.
                            </p>
                          </div>

                          {pendingPosts.length === 0 ? (
                            <p className="p-8 text-center text-sm text-gray-500">
                              لا توجد منشورات معلقة حالياً.
                            </p>
                          ) : (
                            <div className="divide-y divide-gray-100">
                              {pendingPosts.map((post) => {
                                const id = getPostId(post);
                                return (
                                  <div key={String(id)} className="p-5">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Clock3
                                            size={16}
                                            className="text-amber-600"
                                          />
                                          <h4 className="font-bold text-base">
                                            {post.title || "بدون عنوان"}
                                          </h4>
                                        </div>

                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-5">
                                          {post.description ||
                                            post.content ||
                                            "لا يوجد محتوى"}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-gray-400">
                                          <span>
                                            الكاتب:{" "}
                                            {post.author?.name ||
                                              post.authorName ||
                                              post.user?.name ||
                                              "غير معروف"}
                                          </span>
                                          {post.createdAt && (
                                            <span>
                                              {new Date(
                                                post.createdAt,
                                              ).toLocaleDateString("ar-EG")}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex flex-wrap gap-2 shrink-0">
                                        <button
                                          onClick={() =>
                                            handleApprovePost(String(id))
                                          }
                                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-medium cursor-pointer"
                                        >
                                          <CheckCircle2 size={15} />
                                          الموافقة
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleAdminDeletePost(String(id))
                                          }
                                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium cursor-pointer"
                                        >
                                          <Trash2 size={15} />
                                          حذف
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </section>
                      )}
                    </>
                  )}
                </div>
              )}

            {/* تبويب: مقالاتي */}
            {activeTab === "my-posts" && (
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold">مقالاتي المكتوبة</h2>

                  <button
                    onClick={() => setActiveTab("create")}
                    className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>كتابة مقال</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">
                          {post.hashtags && post.hashtags.length > 0
                            ? post.hashtags[0]
                            : "عام"}
                        </span>

                        <span>
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "ar-EG",
                              )
                            : ""}
                        </span>

                        <Link
                          href={`http://localhost:3000/posts/${post.id}`}
                          className="text-xs text-gray-500  "
                        >
                          <p className="text-blue-700 transition-all duration-75 hover:text-blue-700/80 ">
                            الذهاب للمقالة
                          </p>
                        </Link>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-500 mb-4">
                          وقت القراءة: {post.readTime || 0} دقائق
                        </p>

                        <div className="flex gap-2 border-t border-gray-100 pt-3">
                          <button
                            onClick={() => handleOpenEditModal(post)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <Edit3 size={14} /> تعديل
                          </button>

                          <button
                            title="حذف المقال"
                            className="flex items-center justify-center p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            onClick={() => handleDelete(post.id)}
                          >
                            <XCircle size={16} />
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

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عنوان المقال <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="أدخل عنوان المقال هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      وصف قصير للمقال (Description)
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="ملخص وجيز يظهر في بطاقة المقال..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        صورة الغلاف (ملف من جهازك)
                      </label>
                      <div className="relative border border-gray-200 rounded-xl p-2 bg-white flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                        />
                      </div>
                      {imageFile && (
                        <p className="text-xs text-green-600 mt-1 font-medium">
                          ✓ تم اختيار: {imageFile.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الوسوم (Hashtags)
                      </label>
                      <input
                        type="text"
                        name="hashtags"
                        value={formData.hashtags}
                        onChange={handleChange}
                        placeholder="لسانيات, برمجة, ذكاء_اصطناعي (افصل بينها بفصلة)"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      محتوى المقال <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={8}
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      placeholder="اكتب نص المقال هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    نشر المقال الآن
                  </button>
                </form>
              </div>
            )}

            {/* تبويب: إعدادات الحساب وعرض البيانات */}
            {activeTab === "settings" && (
              <div className="space-y-8 max-w-xl">
                {/* ===== قسم عرض البيانات الحالية (GET) ===== */}
                <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                    <h3 className="text-base font-bold text-gray-900">
                      بيانات الحساب الحالية
                    </h3>
                    <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      نشط
                    </span>
                  </div>

                  {isLoadingProfile ? (
                    <p className="text-sm text-gray-500">
                      جاري تحميل البيانات...
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {/* الهيدر: الصورة + الاسم والتخصص */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-300 flex items-center justify-center">
                          {me?.userImage ? (
                            <img
                              src={`http://localhost:5000${me.userImage}`}
                              alt={me.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="text-gray-400" size={28} />
                          )}
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-gray-900">
                            {me?.name || "Undefiened"}
                          </h4>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                            <Briefcase size={12} />
                            <span>
                              {me?.specialization || "لم يتم تحديد التخصص"}
                            </span>
                          </p>
                          {profileData.email && (
                            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                              <Mail size={12} />
                              <span>{me?.email}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <span className="text-xs text-gray-400 block mb-1 font-medium">
                          النبذة الشخصية
                        </span>
                        <p className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-100 leading-relaxed">
                          {me?.bio || "لا توجد نبذة شخصية مضافة حالياً."}
                        </p>
                      </div>

                      {/* Portfolio URL */}
                      <div>
                        <span className="text-xs text-gray-400 block mb-1 font-medium">
                          معرض الأعمال
                        </span>
                        {me?.portfolioUrl ? (
                          <a
                            href={profileData.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 break-all"
                          >
                            <Globe size={12} />
                            <span>{me?.portfolioUrl}</span>
                          </a>
                        ) : (
                          <p className="text-xs text-gray-500">غير محدد</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* ===== نموذج تعديل الحساب ===== */}
                <div>
                  <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">
                    تعديل معلومات الحساب
                  </h2>

                  <form
                    className="space-y-4 max-w-lg"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const profilePayload = new FormData();
                        profilePayload.append("name", profileData.name);
                        profilePayload.append(
                          "specialization",
                          profileData.specialization,
                        );
                        profilePayload.append("bio", profileData.bio);
                        profilePayload.append(
                          "portfolioUrl",
                          profileData.portfolioUrl,
                        );

                        if (profileImageFile) {
                          profilePayload.append("userImage", profileImageFile);
                        }

                        const response = await fetch(
                          "http://localhost:5000/api/users/profile",
                          {
                            method: "PUT",
                            credentials: "include",
                            body: profilePayload,
                          },
                        );

                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(
                            errorData.error || "فشل تحديث البيانات الشخصية",
                          );
                        }

                        const updatedUser = await response.json();
                        alert("تم تحديث الملف الشخصي بنجاح!");

                        setUser((prev: any) => ({ ...prev, ...updatedUser }));
                        if (updatedUser.userImage) {
                          setProfileData((prev) => ({
                            ...prev,
                            userImage: updatedUser.userImage,
                          }));
                        }
                      } catch (error: any) {
                        alert(`خطأ أثناء التحديث: ${error.message || error}`);
                      }
                    }}
                  >
                    {/* رفع صورة البروفايل */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الصورة الشخصية (ملف من جهازك)
                      </label>
                      <div className="relative border border-gray-200 rounded-xl p-2 bg-white flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="w-full text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                        />
                      </div>
                      {profileImageFile && (
                        <p className="text-xs text-green-600 mt-1 font-medium">
                          ✓ تم اختيار: {profileImageFile.name}
                        </p>
                      )}
                    </div>

                    {/* الاسم الكامل */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        placeholder="أدخل اسمك الكامل..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>

                    {/* التخصص */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        التخصص / المسمى الوظيفي
                      </label>
                      <input
                        type="text"
                        value={profileData.specialization}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            specialization: e.target.value,
                          })
                        }
                        placeholder="مثال: كاتب محتوى / مطور ويب..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>

                    {/* الوصف القصير (Bio) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الوصف القصير (Bio)
                      </label>

                      <textarea
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        placeholder="أدخل نبذة قصيرة عنك..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                      />
                    </div>

                    {/* رابط معرض الأعمال (Portfolio) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        رابط موقعك / معرض أعمالك
                      </label>
                      <input
                        type="url"
                        value={profileData.portfolioUrl}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            portfolioUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* نافذة التعديل المنبثقة - Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold">تعديل المقال</h3>
              <button
                onClick={() => setEditingPost(null)}
                className="text-gray-400 hover:text-black p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان المقال <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف القصير (Description)
                </label>
                <input
                  type="text"
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تحديث صورة الغلاف (اختياري)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setEditImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوسوم (Hashtags)
                  </label>
                  <input
                    type="text"
                    value={editFormData.hashtags}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        hashtags: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  محتوى المقال <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={editFormData.content}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      content: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
