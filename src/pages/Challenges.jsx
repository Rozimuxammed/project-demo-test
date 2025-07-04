import { useState } from "react";
import Layout from "../components/Layout";
import {
  Trophy,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const Challenges = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Challenges" },
    { id: "coding", label: "Coding" },
    { id: "design", label: "Design" },
    { id: "business", label: "Business" },
    { id: "soft-skills", label: "Soft Skills" },
  ];

  const challenges = [
    {
      id: 1,
      title: "30-Day React Challenge",
      description:
        "Build 30 React projects in 30 days to master React fundamentals and advanced concepts.",
      category: "coding",
      difficulty: "Intermediate",
      duration: "30 days",
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
      title: "UI/UX Design Bootcamp",
      description:
        "Complete 10 design challenges focusing on user experience and interface design principles.",
      category: "design",
      difficulty: "Beginner",
      duration: "14 days",
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
      title: "Public Speaking Mastery",
      description:
        "Improve your presentation skills through daily speaking exercises and video submissions.",
      category: "soft-skills",
      difficulty: "Intermediate",
      duration: "21 days",
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
      title: "Startup Pitch Preparation",
      description:
        "Learn to create compelling business pitches and practice with real entrepreneurs.",
      category: "business",
      difficulty: "Advanced",
      duration: "7 days",
      participants: 234,
      completed: 156,
      reward: 200,
      image:
        "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=300",
      progress: 0,
      status: "available",
    },
  ];

  const myStats = {
    challengesCompleted: 12,
    totalPoints: 1450,
    currentStreak: 5,
    rank: "Gold",
  };

  const leaderboard = [
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
      name: "You",
      points: myStats.totalPoints,
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
  ];

  const filteredChallenges =
    selectedCategory === "all"
      ? challenges
      : challenges.filter((c) => c.category === selectedCategory);

  return (
    <Layout>
      <div className="space-y-8 my-7 px-4 md:px-8 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                Skill Challenges
              </h1>
              <p className="text-base md:text-xl opacity-90">
                Level up your skills through gamified learning
              </p>
            </div>
            <div className="flex items-center justify-between md:justify-end md:space-x-6 gap-4">
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold">
                  {myStats.challengesCompleted}
                </div>
                <div className="text-sm opacity-80">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold">
                  {myStats.totalPoints}
                </div>
                <div className="text-sm opacity-80">Points</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold">
                  {myStats.currentStreak}
                </div>
                <div className="text-sm opacity-80">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left - Challenges */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories Filter */}
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Challenges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          challenge.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : challenge.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>

                    {challenge.status === "completed" && (
                      <div className="absolute top-4 left-4">
                        <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full p-1" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {challenge.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{challenge.participants} joined</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{challenge.reward} pts</span>
                      </div>
                    </div>

                    {challenge.status === "in-progress" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Progress
                          </span>
                          <span className="text-sm text-gray-600">
                            {challenge.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${challenge.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      className={`w-full py-3 rounded-xl font-medium transition-all ${
                        challenge.status === "completed"
                          ? "bg-green-100 text-green-800 cursor-not-allowed"
                          : challenge.status === "in-progress"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
                          : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transform hover:scale-105"
                      }`}
                      disabled={challenge.status === "completed"}
                    >
                      {challenge.status === "completed" && (
                        <>
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          Completed
                        </>
                      )}
                      {challenge.status === "in-progress" && (
                        <>
                          <Play className="w-4 h-4 inline mr-2" />
                          Continue
                        </>
                      )}
                      {challenge.status === "available" && (
                        <>
                          <Play className="w-4 h-4 inline mr-2" />
                          Start Challenge
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{myStats.rank} Rank</h3>
              <p className="text-sm opacity-90">
                Keep challenging yourself to reach Platinum!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Leaderboard
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      user.name === "You"
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
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
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          user.name === "You"
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.points} points
                      </p>
                    </div>
                    {user.rank <= 3 && (
                      <Star className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Challenge Completed
                    </p>
                    <p className="text-xs text-gray-500">
                      Public Speaking Mastery
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      5-Day Streak
                    </p>
                    <p className="text-xs text-gray-500">Keep it up!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
