import { useState, useRef } from "react";
import Layout from "../components/Layout";
import {
  Trophy,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const Challenges = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddChallengeModalOpen, setIsAddChallengeModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "30 kunlik React sinovi",
      description:
        "30 kun ichida 30 ta React loyihasini qurib, Reactning asosiy va ilg‘or tushunchalarini o‘zlashtiring.",
      category: "coding",
      difficulty: "O‘rta",
      duration: "30 kun",
      participants: 1247,
      completed: 892,
      reward: 150,
      image:
        "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=300",
      progress: 0,
      status: "available",
    },
    {
      id: 2,
      title: "UI/UX Dizayn Treningi",
      description:
        "Foydalanuvchi tajribasi va interfeys dizayn prinsiplariga qaratilgan 10 ta dizayn sinovini bajaring.",
      category: "design",
      difficulty: "Boshlang‘ich",
      duration: "14 kun",
      participants: 856,
      completed: 623,
      reward: 100,
      image:
        "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=300",
      progress: 30,
      status: "in-progress",
    },
    {
      id: 3,
      title: "Ommaviy Nutq Mahorati",
      description:
        "Kundalik nutq mashqlari va video topshiriqlar orqali taqdimot ko‘nikmalaringizni oshiring.",
      category: "soft-skills",
      difficulty: "O‘rta",
      duration: "21 kun",
      participants: 432,
      completed: 298,
      reward: 120,
      image:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300",
      progress: 100,
      status: "completed",
    },
    {
      id: 4,
      title: "Startap Taqdimotiga Tayyorgarlik",
      description:
        "Haqiqiy tadbirkorlar bilan mashq qilib, jozibali biznes taqdimotlarini yaratishni o‘rganing.",
      category: "business",
      difficulty: "Ilg‘or",
      duration: "7 kun",
      participants: 234,
      completed: 156,
      reward: 200,
      image:
        "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=300",
      progress: 0,
      status: "available",
    },
  ]);

  const [myStats, setMyStats] = useState({
    challengesCompleted: 12,
    totalPoints: 1450,
    currentStreak: 5,
    rank: "Oltin",
  });

  const [leaderboard, setLeaderboard] = useState([
    {
      rank: 1,
      name: "Sarah Kim",
      points: 2850,
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50",
    },
    {
      rank: 2,
      name: "Mike Chen",
      points: 2640,
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50",
    },
    {
      rank: 3,
      name: "Siz",
      points: 1450,
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
    },
    {
      rank: 4,
      name: "Emily Park",
      points: 1320,
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50",
    },
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Sinov Yakunlandi",
      description: "Ommaviy Nutq Mahorati",
      icon: CheckCircle,
    },
    {
      id: 2,
      title: "5 Kunlik Seriya",
      description: "Davom eting!",
      icon: Trophy,
    },
  ]);

  const [tempChallenge, setTempChallenge] = useState({
    title: "",
    description: "",
    category: "coding",
    difficulty: "Boshlang‘ich",
    duration: "",
    reward: "",
    image: "",
  });
  const [challengeImagePreview, setChallengeImagePreview] = useState("");
  const challengeFileInputRef = useRef(null);

  const categories = [
    { id: "all", label: "Barcha Sinovlar" },
    { id: "coding", label: "Dasturlash" },
    { id: "design", label: "Dizayn" },
    { id: "business", label: "Biznes" },
    { id: "soft-skills", label: "Yumshoq Ko‘nikmalar" },
  ];

  const filteredChallenges =
    selectedCategory === "all"
      ? challenges
      : challenges.filter((c) => c.category === selectedCategory);

  const handleStartChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId && challenge.status === "available"
          ? {
              ...challenge,
              status: "in-progress",
              progress: 10,
              participants: challenge.participants + 1,
            }
          : challenge
      )
    );
    toast.success("Sinov boshlandi!");
  };

  const handleContinueChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (
          challenge.id === challengeId &&
          challenge.status === "in-progress"
        ) {
          const newProgress = Math.min(challenge.progress + 10, 100);
          const isCompleted = newProgress === 100;
          if (isCompleted) {
            setMyStats((prev) => ({
              ...prev,
              challengesCompleted: prev.challengesCompleted + 1,
              totalPoints: prev.totalPoints + challenge.reward,
              currentStreak: prev.currentStreak + 1,
            }));
            setAchievements((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                title: "Sinov Yakunlandi",
                description: challenge.title,
                icon: CheckCircle,
              },
            ]);
            setLeaderboard((prev) =>
              prev
                .map((user) =>
                  user.name === "Siz"
                    ? { ...user, points: user.points + challenge.reward }
                    : user
                )
                .sort((a, b) => b.points - a.points)
                .map((user, index) => ({ ...user, rank: index + 1 }))
            );
            toast.success(
              `"${challenge.title}" sinovi yakunlandi! +${challenge.reward} ball`
            );
          }
          return {
            ...challenge,
            progress: newProgress,
            status: isCompleted ? "completed" : "in-progress",
            completed: isCompleted
              ? challenge.completed + 1
              : challenge.completed,
          };
        }
        return challenge;
      })
    );
    if (challenges.find((c) => c.id === challengeId).progress < 100) {
      toast.success("Jarayon yangilandi!");
    }
  };

  const handleAddChallengeSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      category,
      difficulty,
      duration,
      reward,
      image,
    } = tempChallenge;
    if (!title || !description || !duration || !reward || !image) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    if (isNaN(reward) || reward <= 0) {
      toast.error("Yaroqli mukofot miqdorini kiriting!");
      return;
    }
    setChallenges((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title,
        description,
        category,
        difficulty,
        duration,
        participants: 0,
        completed: 0,
        reward: Number(reward),
        image,
        progress: 0,
        status: "available",
      },
    ]);
    setTempChallenge({
      title: "",
      description: "",
      category: "coding",
      difficulty: "Boshlang‘ich",
      duration: "",
      reward: "",
      image: "",
    });
    setChallengeImagePreview("");
    setIsAddChallengeModalOpen(false);
    toast.success("Sinov muvaffaqiyatli qo‘shildi!");
  };

  const handleChallengeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Faqat rasm fayllarini yuklash mumkin!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Rasm hajmi 5MB dan kichik bo‘lishi kerak!");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setChallengeImagePreview(reader.result);
        setTempChallenge((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 my-6 px-3 md:px-6 py-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-1">
                Ko‘nikma Sinovlari
              </h1>
              <p className="text-sm md:text-base opacity-90">
                O‘yinlashtirilgan o‘qish orqali ko‘nikmalaringizni oshiring
              </p>
            </div>
            <div className="flex items-center justify-between md:justify-end md:space-x-4 gap-3">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold">
                  {myStats.challengesCompleted}
                </div>
                <div className="text-xs opacity-80">Yakunlangan</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold">
                  {myStats.totalPoints}
                </div>
                <div className="text-xs opacity-80">Ballar</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold">
                  {myStats.currentStreak}
                </div>
                <div className="text-xs opacity-80">Kunlik Seriya</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left - Challenges */}
          <div className="lg:col-span-3 space-y-4">
            {/* Categories Filter */}
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors text-xs md:text-sm ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
              <button
                onClick={() => setIsAddChallengeModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs md:text-sm flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Sinov Qo‘shish
              </button>
            </div>

            {/* Challenges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          challenge.difficulty === "Boshlang‘ich"
                            ? "bg-green-100 text-green-800"
                            : challenge.difficulty === "O‘rta"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                    {challenge.status === "completed" && (
                      <div className="absolute top-3 left-3">
                        <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full p-1" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{challenge.participants} ishtirokchi</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                        <span>{challenge.reward} ball</span>
                      </div>
                    </div>
                    {challenge.status === "in-progress" && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            Jarayon
                          </span>
                          <span className="text-xs text-gray-600">
                            {challenge.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${challenge.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <button
                      className={`w-full py-2 rounded-lg font-medium transition-all text-sm ${
                        challenge.status === "completed"
                          ? "bg-green-100 text-green-800 cursor-not-allowed"
                          : challenge.status === "in-progress"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
                          : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transform hover:scale-105"
                      }`}
                      disabled={challenge.status === "completed"}
                      onClick={() =>
                        challenge.status === "in-progress"
                          ? handleContinueChallenge(challenge.id)
                          : handleStartChallenge(challenge.id)
                      }
                    >
                      {challenge.status === "completed" && (
                        <>
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Yakunlandi
                        </>
                      )}
                      {challenge.status === "in-progress" && (
                        <>
                          <Play className="w-3 h-3 inline mr-1" />
                          Davom Ettirish
                        </>
                      )}
                      {challenge.status === "available" && (
                        <>
                          <Play className="w-3 h-3 inline mr-1" />
                          Sinovni Boshlash
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-4 text-white text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-1">{myStats.rank} Daraja</h3>
              <p className="text-xs opacity-90">
                Platina darajasiga erishish uchun sinovlarni davom ettiring!
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800">
                  Reyting
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center">
                  Hammasini Ko‘rish <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="space-y-2">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      user.name === "Siz"
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1
                          ? "bg-yellow-500 text-white"
                          : user.rank === 2
                          ? "bg-gray-400 text-white"
                          : user.rank === 3
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-xs font-medium ${
                          user.name === "Siz"
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.points} ball
                      </p>
                    </div>
                    {user.rank <= 3 && (
                      <Star className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                So‘nggi Yutuqlar
              </h3>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <achievement.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Challenge Modal */}
        {isAddChallengeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-[90%] max-w-sm p-3 relative">
              <button
                onClick={() => setIsAddChallengeModalOpen(false)}
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 text-sm"
              >
                ✕
              </button>
              <h3 className="text-center text-base font-semibold text-gray-800 mb-3 mt-1">
                Yangi Sinov Qo‘shish
              </h3>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <img
                    src={
                      challengeImagePreview || "https://via.placeholder.com/64"
                    }
                    alt="Sinov rasmi"
                    className="w-16 h-16 rounded border-2 border-gray-200 object-cover"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Sinov Rasmi
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={challengeFileInputRef}
                    onChange={handleChallengeImageChange}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nomi
                  </label>
                  <input
                    type="text"
                    value={tempChallenge.title}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tavsif
                  </label>
                  <textarea
                    value={tempChallenge.description}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={tempChallenge.category}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories
                      .filter((cat) => cat.id !== "all")
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Qiyinchilik
                  </label>
                  <select
                    value={tempChallenge.difficulty}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        difficulty: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Boshlang‘ich">Boshlang‘ich</option>
                    <option value="O‘rta">O‘rta</option>
                    <option value="Ilg‘or">Ilg‘or</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Davomiyligi (masalan, 7 kun)
                  </label>
                  <input
                    type="text"
                    value={tempChallenge.duration}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        duration: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mukofot (ball)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tempChallenge.reward}
                    onChange={(e) =>
                      setTempChallenge({
                        ...tempChallenge,
                        reward: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsAddChallengeModalOpen(false)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-800 text-xs rounded-lg hover:bg-gray-300"
                  >
                    Bekor Qilish
                  </button>
                  <button
                    onClick={handleAddChallengeSubmit}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Challenges;
