import { useState } from "react";
import Layout from "../components/Layout";
import { ThumbsUp, Reply, User, Filter, Plus } from "lucide-react";
import { toast } from "sonner";

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "career",
  });

  const categories = [
    { id: "all", label: "Barcha mavzular", count: 1247 },
    { id: "career", label: "Kasbiy maslahatlar", count: 234 },
    { id: "tech", label: "Texnologiya", count: 189 },
    { id: "networking", label: "Tanishuv", count: 156 },
    { id: "skills", label: "Ko‘nikmalarni rivojlantirish", count: 98 },
  ];

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Junior dasturchi sifatida maoshni qanday kelishish mumkin?",
      content:
        "Frontend bo‘yicha ilk ish taklifini oldim. Maosh internetda ko‘rgan narxlarga qaraganda pastroq. Maoshni qanday qilib minnatdorchilik bildirmasdan kelishsam bo‘ladi?",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
        title: "Junior dasturchi",
      },
      category: "career",
      timestamp: "2 soat oldin",
      likes: 23,
      replies: 8,
      liked: false,
    },
    {
      id: 2,
      title: "2024-yilda React’ni o‘rganish uchun eng yaxshi resurslar?",
      content:
        "Vanilla JavaScript’dan React’ga o‘tmoqchiman. React’ni o‘rganish uchun eng samarali va dolzarb manbalarni tavsiya qilasizmi?",
      author: {
        name: "Mike Rodriguez",
        avatar:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
        title: "Dasturchilikka qiziqayotgan",
      },
      category: "tech",
      timestamp: "4 soat oldin",
      likes: 45,
      replies: 12,
      liked: true,
    },
    {
      id: 3,
      title: "San-Fransiskodagi foydali networking tadbirlari?",
      content:
        "Yaqinda San-Fransiskoga yangi ish uchun ko‘chib o‘taman. Texnologiya sohasi uchun haqiqatan foydali bo‘lgan tadbirlar bormi?",
      author: {
        name: "Emily Park",
        avatar:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        title: "Mahsulot menejeri",
      },
      category: "networking",
      timestamp: "6 soat oldin",
      likes: 18,
      replies: 6,
      liked: false,
    },
    {
      id: 4,
      title: "Imposter sindromi: Qanday yengish mumkin?",
      content:
        "2 yildan beri UX dizayner bo‘lib ishlayman, lekin haligacha o‘zimni bilmayotgandek his qilaman. Ishonchni qanday oshirish mumkin?",
      author: {
        name: "David Kim",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        title: "UX dizayner",
      },
      category: "career",
      timestamp: "1 kun oldin",
      likes: 67,
      replies: 24,
      liked: true,
    },
  ]);

  const trendingTopics = [
    { tag: "#MasofaviyIsh", posts: 234 },
    { tag: "#KasbniO‘zgartirish", posts: 189 },
    { tag: "#TexnoSuhbat", posts: 156 },
    { tag: "#Freelance", posts: 123 },
    { tag: "#StartupHayoti", posts: 98 },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Iltimos, majburiy maydonlarni to‘ldiring");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title: formData.title,
      content: formData.content,
      author: {
        name: "Foydalanuvchi",
        avatar:
          "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150",
        title: "Hamjamiyat a’zosi",
      },
      category: formData.category,
      timestamp: "Hozir",
      likes: 0,
      replies: 0,
      liked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setShowPostModal(false);
    setFormData({
      title: "",
      content: "",
      category: "career",
    });
    toast.success("Post muvaffaqiyatli joylandi!");
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
    const post = posts.find((post) => post.id === id);
    toast.success(
      post.liked ? `"${post.title}" yoqtirilmadi` : `"${post.title}" yoqtirildi`
    );

    // Update selectedPost if it matches the toggled post
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost((prev) => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
      }));
    }
  };

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <Layout>
      <div className="space-y-8 px-4 my-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Hamjamiyat forumlari
            </h1>
            <p className="text-gray-600">
              Bilim ulashing va birgalikda rivojlaning
            </p>
          </div>

          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi post</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Asosiy qism */}
          <div className="lg:col-span-3 space-y-6">
            {/* Kategoriyalar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm font-medium ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Postlar */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div className="flex-1">
                      {/* Muallif */}
                      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500 mb-2">
                        <span className="font-medium text-gray-800">
                          {post.author.name}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{post.author.title}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{post.timestamp}</span>
                      </div>

                      {/* Sarlavha */}
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                        {post.title}
                      </h2>

                      {/* Matn */}
                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
                        {post.content}
                      </p>

                      {/* Harakatlar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1 p-2 rounded-full transition-all duration-200 transform ${
                              post.liked
                                ? "text-blue-600 bg-blue-50 scale-110"
                                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 scale-100"
                            } hover:scale-125`}
                          >
                            <ThumbsUp
                              className={`w-4 h-4 ${
                                post.liked ? "fill-blue-600" : ""
                              }`}
                            />
                            <span>{post.likes}</span>
                          </button>

                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                            <Reply className="w-4 h-4" />
                            <span>{post.replies} ta javob</span>
                          </button>

                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.category === "career"
                                ? "bg-green-100 text-green-800"
                                : post.category === "tech"
                                ? "bg-blue-100 text-blue-800"
                                : post.category === "networking"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {
                              categories.find((c) => c.id === post.category)
                                ?.label
                            }
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Batafsil o‘qish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ko‘proq yuklash */}
            <div className="text-center">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                Yana postlarni yuklash
              </button>
            </div>
          </div>

          {/* Yon panel */}
          <div className="space-y-6">
            {/* Trenddagi mavzular */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Trenddagi mavzular
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-blue-600 font-medium">
                      {topic.tag}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {topic.posts} post
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qoidalar */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Hamjamiyat qoidalari
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Hurmatli va professionallikni saqlang</li>
                <li>• Bilimingizni ulashing va boshqalarga yordam bering</li>
                <li>• Mavzudan chetga chiqmang</li>
                <li>• Spam yoki reklama taqiqlanadi</li>
                <li>• Tegishli til ishlating</li>
              </ul>
            </div>

            {/* Faol foydalanuvchilar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Faol ishtirokchilar
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Foydalanuvchi {i}
                      </p>
                      <p className="text-xs text-gray-500">
                        Shu hafta {20 + i} ta post
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showPostModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative">
              <button
                onClick={() => setShowPostModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-4">
                Yangi post yaratish
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sarlavha *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="Masalan, Ish suhbatiga tayyorgarlik bo‘yicha maslahatlar"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Matn *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="Sizning savolingiz yoki muhokamangiz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kategoriya *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Post joylash
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {showDetailModal && selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative">
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  已被
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm shrink-0"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-800">
                      {selectedPost.author.name}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{selectedPost.author.title}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{selectedPost.timestamp}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {selectedPost.content}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPost.category === "career"
                      ? "bg-green-100 text-green-800"
                      : selectedPost.category === "tech"
                      ? "bg-blue-100 text-blue-800"
                      : selectedPost.category === "networking"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {
                    categories.find((c) => c.id === selectedPost.category)
                      ?.label
                  }
                </span>
                <span className="text-gray-500">
                  {selectedPost.likes} yoqtirish • {selectedPost.replies} ta
                  javob
                </span>
              </div>
              <button
                onClick={() => toggleLike(selectedPost.id)}
                className={`flex items-center gap-1 p-2 rounded-full transition-all duration-200 transform ${
                  selectedPost.liked
                    ? "text-blue-600 bg-blue-50 scale-110"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 scale-100"
                } hover:scale-125`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    selectedPost.liked ? "fill-blue-600" : ""
                  }`}
                />
                <span>Yoqtirish ({selectedPost.likes})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Community;
