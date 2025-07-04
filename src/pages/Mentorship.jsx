import { useState } from "react";
import Layout from "../components/Layout";
import { Coffee, Star, MapPin, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import me from "../assets/me.jpg";
const Mentorship = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const categories = [
    { id: "all", label: "Barcha mentorlar" },
    { id: "tech", label: "Texnologiya" },
    { id: "design", label: "Dizayn" },
    { id: "business", label: "Biznes" },
    { id: "marketing", label: "Marketing" },
  ];

  const mentors = [
    {
      id: 1,
      name: "Rozimuhammad Rozimurodov",
      title: "Frontend dasturchi",
      company: "NetYoshlar",
      avatar: me,
      rating: 4.9,
      sessions: 142,
      price: 15,
      specialties: [
        "React",
        "Next.js",
        "WebRTC",
        "Firebase",
        "Hackathon mentoring",
      ],
      location: "Farg'ona, O‘zbekiston",
      available: true,
      category: "tech",
    },
    {
      id: 2,
      name: "Dilshod Qodirov",
      title: "Mobil ilovalar ishlab chiquvchisi",
      company: "Uzum Tech",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.8,
      sessions: 98,
      price: 20,
      specialties: [
        "Flutter",
        "Dart",
        "Mobil UI dizayn",
        "Play Market strategiyasi",
      ],
      location: "Andijon, O‘zbekiston",
      available: true,
      category: "tech",
    },
    {
      id: 3,
      name: "Gulbahor Karimova",
      title: "Dizayn va brending mutaxassisi",
      company: "Freelancer",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.9,
      sessions: 120,
      price: 18,
      specialties: [
        "UI/UX dizayn",
        "Brend identiteti",
        "Figma",
        "Portfel tuzish",
      ],
      location: "Samarqand, O‘zbekiston",
      available: true,
      category: "design",
    },
    {
      id: 4,
      name: "Farrux Salimov",
      title: "Mahsulot menejeri",
      company: "MyTaxi",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150", // erkak kishiga mos avatar
      rating: 4.7,
      sessions: 77,
      price: 22,
      specialties: [
        "Mahsulot strategiyasi",
        "Bozor tahlili",
        "Agile",
        "Jamoa bilan ishlash",
      ],
      location: "Namangan, O‘zbekiston",
      available: false,
      category: "business",
    },
  ];

  const handleApplyMentor = () => {
    toast.success("Mentor bo‘lish uchun arizangiz muvaffaqiyatli yuborildi!");
  };

  // Filter mentors based on selected category
  const filteredMentors =
    selectedCategory === "all"
      ? mentors
      : mentors.filter((mentor) => mentor.category === selectedCategory);

  return (
    <Layout>
      <div className="space-y-8 w-full my-16 px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Mentor toping
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Bir piyola qahva narxiga mutaxassisdan maslahat oling
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Mentorlarni qidiring..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
              <span>Filtr</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {mentor.name}
                      </h3>
                      <p className="text-gray-600 text-sm truncate">
                        {mentor.title}
                      </p>
                      <p className="text-gray-500 text-sm truncate">
                        {mentor.company}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                      mentor.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mentor.available ? "Bo‘sh" : "Band"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{mentor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Coffee className="w-4 h-4 mr-1" />
                    <span>{mentor.sessions} uchrashuv</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{mentor.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {mentor.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{mentor.specialties.length - 2} ta ortiq
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-1">
                    <Coffee className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-xs text-gray-800">
                      {mentor.price} 000
                    </span>
                    <span className="text-gray-500 text-sm">/ seans</span>
                  </div>

                  <button
                    disabled={!mentor.available}
                    onClick={() => {
                      if (mentor.available) {
                        setSelectedMentor(mentor);
                        setIsBookingOpen(true);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all w-full sm:w-auto text-center ${
                      mentor.available
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {mentor.available ? "Uchrashuv belgilash" : "Mavjud emas"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Ushbu kategoriyada mentorlar topilmadi
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {isBookingOpen && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {selectedMentor.name} bilan uchrashuv
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedMentor.title}, {selectedMentor.company}
              </p>

              <div className="mb-4 space-y-2 text-sm text-gray-700">
                <p>
                  💵 <strong>{selectedMentor.price}000</strong> – 1 seans narxi
                </p>
                <p>📍 {selectedMentor.location}</p>
              </div>

              <button
                onClick={() => {
                  toast.success(
                    `${selectedMentor.name} bilan uchrashuv belgilandi!`
                  );
                  setIsBookingOpen(false);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Uchrashuvni tasdiqlash
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Mentor bo‘lishni xohlaysizmi?
          </h2>
          <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6">
            Bilimingizni ulashing va boshqalarga o‘sishda yordam berib daromad
            oling
          </p>
          <button
            onClick={handleApplyMentor}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Mentor bo‘lishga ariza topshiring
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Mentorship;
