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
    "my-posts" | "create" | "explore" | "settings"
  >("my-posts");

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
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

  // حالات مودال التعديل (Edit Modal State)
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
    content: "",
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

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
      const response = await fetch("/api/posts", {
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
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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
      const response = await fetch(`/api/posts/${editingPost.id}`, {
        method: "PUT",
        credentials: "include",
        body: updatePayload,
      });

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
        const response = await fetch("/api/auth/me", {
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
    const findMyPosts = async () => {
      try {
        const response = await fetch("/api/posts/my-posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("فشل جلب المقالات");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    };
    findMyPosts();
  }, [router]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        // بدلاً من router.push('/')
        // عمل ريفريش كامل وتوجيه للرئيسية لتحديث النافبار فوراً
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

            {/* تبويب: إعدادات الحساب */}
            {activeTab === "settings" && (
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

                      const response = await fetch("/api/users/profile", {
                        method: "PUT",
                        credentials: "include",
                        body: profilePayload,
                      });

                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                          errorData.error || "فشل تحديث البيانات الشخصية",
                        );
                      }

                      const updatedUser = await response.json();
                      alert("تم تحديث الملف الشخصي بنجاح!");

                      setUser((prev: any) => ({ ...prev, ...updatedUser }));
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
                        setProfileData({ ...profileData, name: e.target.value })
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
                        setProfileData({ ...profileData, bio: e.target.value })
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
