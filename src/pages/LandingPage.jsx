import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Coffee,
  MapPin,
  Briefcase,
  MessageSquare,
  Video,
  Trophy,
  Star,
} from "lucide-react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mentorship");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Coffee Chat Mentorship",
      description:
        "Get expert advice for the price of a coffee. Connect with mentors who can guide your career.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Peer Learning",
      description:
        "Share knowledge with peers. Everyone has something valuable to teach and learn.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Networking",
      description:
        "Find people nearby for face-to-face conversations and local events.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Marketplace",
      description:
        "Connect directly with employers and discover opportunities that match your skills.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Community Forums",
      description:
        "Ask questions, share experiences, and grow together with the community.",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Resumes",
      description:
        "Stand out with creative CV formats including video resumes and story introductions.",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Skill Challenges",
      description:
        "Gamify your learning with challenges that help you develop new skills.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Random Connections",
      description:
        "Discover new perspectives through spontaneous video and voice chats.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center flex-wrap gap-y-2 p-4 sm:p-6 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Networking
          </span>
        </div>

        <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
          <button
            onClick={() => setShowLogin(true)}
            className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md text-sm sm:text-base"
          >
            Login
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md text-sm sm:text-base"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
          Network, Grow, Thrive
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The modern networking platform designed for young professionals.
          Connect, learn, and build your future with peers and mentors
          worldwide.
        </p>

        <button
          onClick={() => setShowRegister(true)}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base sm:text-lg rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Join YouthConnect Today
        </button>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 mb-20 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of young professionals already growing their careers
            on YouthConnect.
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 text-base sm:text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LandingPage;
