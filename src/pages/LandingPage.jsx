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
  Brain,
  Gift,
  CheckCircle,
  XCircle,
  Crown,
  Sparkles,
} from "lucide-react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mentorship");
    }
  }, [isAuthenticated, navigate]);

  const quizQuestions = [
    {
      question: "Muvaffaqiyatli startapning asosiy xususiyati nima?",
      options: [
        "Ko'p mablag' to'plash",
        "Bozor ehtiyojini qondirish",
        "Eng yaxshi texnologiyaga ega bo'lish",
        "Ko'p xodim yollash",
      ],
      correct: 1,
      explanation:
        "Startap muvaffaqiyati birinchi navbatda haqiqiy bozor ehtiyojini qondirish va mijozlar uchun qiymat yaratishga bog'liq.",
    },
    {
      question: "Dizayn thinking jarayonining birinchi bosqichi nima?",
      options: [
        "Prototip yaratish",
        "Empathize - foydalanuvchilarni tushunish",
        "Test qilish",
        "G'oyalar yaratish",
      ],
      correct: 1,
      explanation:
        "Dizayn thinking empathize bosqichidan boshlanadi - foydalanuvchilarning ehtiyojlari va muammolarini chuqur tushunish.",
    },
    {
      question: "Digital marketing-da CTR nima?",
      options: [
        "Cost To Run",
        "Click Through Rate",
        "Customer Total Revenue",
        "Content Type Rating",
      ],
      correct: 1,
      explanation:
        "CTR (Click Through Rate) - reklama yoki kontentni ko'rgan va ustiga bosgan foydalanuvchilar nisbati.",
    },
    {
      question: "Effektiv leadership-ning asosiy ko'nikması nima?",
      options: [
        "Buyruq berish",
        "Eshitish va motivatsiya berish",
        "Nazorat qilish",
        "Tez qaror qabul qilish",
      ],
      correct: 1,
      explanation:
        "Effektiv lider birinchi navbatda jamoani tinglaydi, tushunadi va ularga ilhom beradi.",
    },
    {
      question: "Moliyaviy savodxonlikda 'Emergency Fund' nima?",
      options: [
        "Biznes uchun investitsiya",
        "Favqulodda vaziyatlar uchun jamg'arma",
        "Pensiya jamg'armasi",
        "Katta xaridlar uchun pul",
      ],
      correct: 1,
      explanation:
        "Emergency Fund - kutilmagan vaziyatlar (kasallik, ishdan chiqarish) uchun 3-6 oylik xarajat miqdoridagi jamg'arma.",
    },
    {
      question: "Effektiv vaqt boshqaruvining asosiy printsipi nima?",
      options: [
        "Barcha ishlarni tezda bajarish",
        "Muhim va shoshilinch ishlarni ajratish",
        "Ko'p vaqt ishlash",
        "Hamma narsani yozib olish",
      ],
      correct: 1,
      explanation:
        "Eisenhower matritsasi asosida muhim-shoshilinch ishlarni to'g'ri ajratish vaqt boshqaruvining asosi.",
    },
    {
      question: "Brendingda 'Brand Identity' nima?",
      options: [
        "Kompaniya nomi",
        "Brendning vizual va madaniy qiyofa majmui",
        "Mahsulot narxi",
        "Reklama kampaniyasi",
      ],
      correct: 1,
      explanation:
        "Brand Identity - brendning logo, rang, dizayn, ovoz va qiymatlari kabi barcha elementlari majmui.",
    },
    {
      question: "Muloqot ko'nikmalarida 'Active Listening' nima?",
      options: [
        "Ovozli gapirish",
        "Diqqat bilan tinglash va tushunishni tasdiqlash",
        "Tez javob berish",
        "Ko'p savol berish",
      ],
      correct: 1,
      explanation:
        "Active Listening - to'liq diqqat bilan tinglash, tushunganingizni tasdiqlash va savollar orqali chuqurroq o'rganish.",
    },
    {
      question: "Loyiha boshqaruvida 'MVP' nima?",
      options: [
        "Most Valuable Player",
        "Minimum Viable Product",
        "Maximum Value Principle",
        "Monthly Validation Process",
      ],
      correct: 1,
      explanation:
        "MVP - eng kam resurs bilan bozorni sinab ko'rish va mijozlar fikri olish uchun yaratilgan asosiy mahsulot versiyasi.",
    },
    {
      question: "Shaxsiy rivojlanishda 'Growth Mindset' nima?",
      options: [
        "Tez o'sishga intilish",
        "Qobiliyatlarni rivojlantirish mumkin deb ishonish",
        "Maqsadlar qo'yish",
        "Ko'p kitob o'qish",
      ],
      correct: 1,
      explanation:
        "Growth Mindset - qobiliyatlar va aql-idrok sa'y-harakat orqali rivojlantirila oladi degan e'tiqod.",
    },
  ];
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowQuiz(false);
  };

  const features = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Qahva Suhbatlari",
      description:
        "Atigi bir piyola qahva narxiga tajribali mutaxassislardan maslahat oling. Sizga yo'l ko'rsatadigan mentorlar bilan bog'laning.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "O'zaro O'rganish",
      description:
        "Boshqalar bilan bilim almashing. Har kimda boshqalarga o'rgatadigan va o'rganadigan narsa bor.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Mahalliy Tarmoq",
      description:
        "Yaqiningizdagi insonlarni toping va ular bilan jonli suhbatlar va tadbirlarda ishtirok eting.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Ish Bozori",
      description:
        "Ish beruvchilar bilan to'g'ridan-to'g'ri bog'laning va ko'nikmalaringizga mos imkoniyatlarni toping.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Jamoaviy Forumlar",
      description:
        "Savollar bering, tajriba almashing va birgalikda o'sishga harakat qiling.",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Rezyumelar",
      description:
        "Video rezyume va hikoya tarzidagi tanishtiruvlar bilan o'zingizni boshqalardan ajrating.",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Ko'nikmalar Sinovlari",
      description:
        "Yangi ko'nikmalarni o'rganishni o'yin tarzida bajarib rivojlaning.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Tasodifiy Suhbatlar",
      description:
        "Tasodifiy video va ovozli suhbatlar orqali yangi tanishuvlar yarating.",
    },
  ];

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {!showResult ? (
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Brain className="w-12 h-12 text-yellow-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">
                  Dasturlash Viktorinasi
                </h2>
              </div>

              <div className="bg-white/20 rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="text-white/80 mb-4">
                Savol {currentQuestion + 1} / {quizQuestions.length}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-8">
                {quizQuestions[currentQuestion].question}
              </h3>

              {!showExplanation ? (
                <div className="space-y-4 mb-8">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          selectedAnswer === index
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    {selectedAnswer ===
                    quizQuestions[currentQuestion].correct ? (
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-400" />
                    )}
                  </div>
                  <p className="text-white text-lg mb-4">
                    {selectedAnswer === quizQuestions[currentQuestion].correct
                      ? "To'g'ri!"
                      : "Noto'g'ri!"}
                  </p>
                  <p className="text-white/80">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {!showExplanation && (
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedAnswer !== null
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? "Tugatish"
                    : "Keyingi"}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                {score >= 8 ? (
                  <Crown className="w-16 h-16 text-yellow-400 mr-3" />
                ) : (
                  <Trophy className="w-16 h-16 text-blue-400 mr-3" />
                )}
                <h2 className="text-4xl font-bold text-white">Natijalar</h2>
              </div>

              <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-6">
                {score}/10
              </div>

              {score >= 8 ? (
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 mb-8 border border-yellow-400/30">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
                    <h3 className="text-2xl font-bold text-yellow-400">
                      Tabriklaymiz!
                    </h3>
                    <Sparkles className="w-8 h-8 text-yellow-400 ml-2" />
                  </div>
                  <p className="text-white text-lg mb-4">
                    Siz ajoyib natija ko'rsatdingiz! 🎉
                  </p>
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 mb-4">
                    <Gift className="w-12 h-12 text-white mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-white mb-2">
                      Sovg'angiz:
                    </h4>
                    <p className="text-white">
                      Eng kuchli dasturchi bilan{" "}
                      <span className="font-bold">BEPUL</span> 1 soatlik shaxsiy
                      suhbat!
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      Bizning top mentorimiz bilan coding, career advice va
                      texnologiyalar haqida gaplashing
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Sovg'angizni olish uchun ro'yxatdan o'ting!
                  </button>
                </div>
              ) : (
                <div className="bg-white/10 rounded-3xl p-8 mb-8">
                  <p className="text-white text-lg mb-4">
                    Yaxshi harakat! Lekin sovg'a olish uchun kamida 8 ta to'g'ri
                    javob kerak.
                  </p>
                  <p className="text-white/80 mb-4">
                    Qaytadan urinib ko'ring! 💪
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Qaytadan o'ynash
                </button>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Bosh sahifaga qaytish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Navigatsiya */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm px-4 sm:px-6 flex justify-between items-center flex-wrap gap-y-2">
        {/* LOGO VA MATN */}
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20"
            src={logo}
            alt="logo image"
          />
          <span className="text-center sm:text-left text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            JIGARCHILIK
          </span>
        </div>

        {/* BUTTONLAR */}
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setShowLogin(true)}
            className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full transition-all duration-300 transform shadow-md text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 hover:scale-105"
          >
            Kirish
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full transition-all duration-300 transform shadow-md text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 hover:scale-105"
          >
            Boshlash
          </button>
        </div>
      </nav>

      {/* Qahramon bo'lim */}
      <section className="max-w-7xl mx-auto pt-36 lg:mt-7 px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
          Tarmoq yarating, O'rganing, Yuksaling
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Zamonaviy networking platformasi – yoshlar uchun. Ustozlar va
          tengdoshlar bilan bog'laning, o'rganing va kelajagingizni birga
          yarating.
        </p>

        <button
          onClick={() => setShowRegister(true)}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base sm:text-lg rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Jigarchilikka hoziroq qo'shiling
        </button>
      </section>

      {/* Maxsus Viktorina E'loni */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 mr-3 animate-pulse" />
            <Crown className="w-12 h-12 ml-3 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Maxsus tanlov viktorinasi!
          </h2>
          <p className="text-xl mb-4 opacity-90">
            10 ta savolga to'g'ri javob bering va eng kuchli dasturchi bilan{" "}
            <span className="font-bold text-2xl">BEPUL</span> uchrashing!
          </p>
          <div className="bg-white/20 rounded-2xl p-4 mb-6">
            <Gift className="w-8 h-8 mx-auto mb-2" />
            <p className="text-lg">
              <span className="font-bold">Sovg'a:</span> 1 soatlik shaxsiy
              mentoring sessiyasi
            </p>
            <p className="text-sm opacity-80">
              Career advice • Coding tips • Technology trends
            </p>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="px-8 py-4 bg-white text-blue-500 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            Viktorinani Boshlash
          </button>
        </div>
      </section>

      {/* Xususiyatlar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16">
          Platformadagi Yo‘nalishlar
        </h2>

        <div className="space-y-16 relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b from-blue-500 to-purple-600 before:transform before:-translate-x-1/2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className={`relative flex flex-col sm:flex-row ${
                index % 2 === 0 ? "sm:flex-row-reverse sm:pl-12" : "sm:pr-12"
              } items-center`}
            >
              <div className="w-full sm:w-1/2 p-4">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </div>
              </div>
              <div className="hidden sm:block w-5 h-5 bg-white border-4 border-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Yakuniy chaqiruv */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 mb-20 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Networking hayotingizni o'zgartirishga tayyormisiz?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Minglab yoshlar allaqachon Jigarchilik orqali o'z faoliyatini
            rivojlantirmoqda.
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 text-base sm:text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Safaringizni boshlang
          </button>
        </div>
      </section>

      {/* Modal oynalar */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LandingPage;
