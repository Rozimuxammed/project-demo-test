import { useState } from "react";
import Layout from "../components/Layout";
import {
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Search,
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";

const Jobs = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [jobsData, setJobsData] = useState([
    {
      id: 1,
      title: "Frontend Dasturchi",
      company: "TechCorp Inc.",
      location: "Masofadan",
      type: "To‘liq stavka",
      salary: "75,000 - 95,000",
      posted: "2 kun oldin",
      logo: "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=100",
      description:
        "Jamoamizga ishtiyoqmand frontend dasturchini qidiryapmiz — foydalanuvchi interfeyslarini yaratishda qatnashasiz.",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      applicants: 24,
      saved: false,
    },
    {
      id: 2,
      title: "UX Dizayner",
      company: "Design Studio",
      location: "San-Fransisko, AQSh",
      type: "To‘liq stavka",
      salary: "80,000 - 110,000",
      posted: "1 hafta oldin",
      logo: "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=100",
      description:
        "Mahsulotlarimiz uchun chiroyli va qulay interfeyslar yaratadigan kreativ jamoamizga qo‘shiling.",
      skills: ["Figma", "Foydalanuvchi tadqiqoti", "Prototiplash"],
      applicants: 18,
      saved: true,
    },
    {
      id: 3,
      title: "Marketing Amaliyotchi",
      company: "Growth Agency",
      location: "Nyu-York, AQSh",
      type: "Amaliyot",
      salary: "20000/soat",
      posted: "3 kun oldin",
      logo: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100",
      description:
        "Mijozlarimiz uchun haqiqiy kampaniyalarda qatnashib, raqamli marketingni o‘rganing.",
      skills: ["Ijtimoiy tarmoqlar", "Kontent marketing", "Analitika"],
      applicants: 45,
      saved: false,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "To‘liq stavka",
    salary: "",
    description: "",
    skills: "",
    logo: "",
  });

  const toggleSaveJob = (id) => {
    setJobsData((prev) =>
      prev.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job))
    );
    const job = jobsData.find((job) => job.id === id);
    toast.success(
      job.saved ? `"${job.title}" saqlanmadi` : `"${job.title}" saqlandi`
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.description) {
      toast.error("Iltimos, majburiy maydonlarni to‘ldiring");
      return;
    }

    const newJob = {
      id: jobsData.length + 1,
      title: formData.title,
      company: formData.company,
      location: formData.location || "Masofadan",
      type: formData.type,
      salary: formData.salary || "Ma'lumot kiritilmagan",
      posted: "Hozir",
      logo:
        formData.logo ||
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: formData.description,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
      applicants: 0,
      saved: false,
    };

    setJobsData((prev) => [newJob, ...prev]);
    setShowPostModal(false);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "To‘liq stavka",
      salary: "",
      description: "",
      skills: "",
      logo: "",
    });
    toast.success("Ish e’loni muvaffaqiyatli joylandi!");
  };

  const filters = [
    { id: "all", label: "Barcha ishlar" },
    { id: "remote", label: "Masofadan" },
    { id: "fulltime", label: "To‘liq stavka" },
    { id: "parttime", label: "Yarim stavka" },
    { id: "internship", label: "Amaliyot" },
  ];

  const filterMap = {
    remote: "Masofadan",
    fulltime: "To‘liq stavka",
    parttime: "Yarim stavka",
    internship: "Amaliyot",
  };

  const filteredJobs =
    selectedFilter === "all"
      ? jobsData
      : jobsData.filter((job) => job.type === filterMap[selectedFilter]);

  return (
    <Layout>
      <div className="space-y-8 my-16">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Ish bozoridagi imkoniyatlar
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Ko‘nikmalaringizga mos ishlarni toping
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ishlarni qidiring..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg border border-gray-200 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2 rounded-full self-start transition-all duration-200 transform ${
                    job.saved
                      ? "text-blue-600 bg-blue-50 scale-110"
                      : "text-gray-400 hover:text-blue-600 hover:bg-blue-50 scale-100"
                  } hover:scale-125`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${job.saved ? "fill-blue-600" : ""}`}
                  />
                </button>
              </div>

              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {job.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 text-sm">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-gray-500 text-sm">
                    {job.applicants} ariza topshirgan
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowModal(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Batafsil
                  </button>
                  <button
                    onClick={() =>
                      toast.success(
                        `"${job.title}" lavozimiga ariza topshirildi!`
                      )
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Ariza topshirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail Modal */}
        {showModal && selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-gray-600 mb-2">{selectedJob.company}</p>
              <p className="text-gray-700 text-sm mb-4">
                {selectedJob.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedJob.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                {selectedJob.applicants} ariza topshirgan
              </p>
              <button
                onClick={() => {
                  toast.success(
                    `"${selectedJob.title}" uchun ariza topshirildi!`
                  );
                  setShowModal(false);
                }}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Ariza topshirish
              </button>
            </div>
          </div>
        )}

        {/* Post Job CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ishchilar izlayapsizmi?</h2>
          <p className="text-lg opacity-90 mb-6">
            Ish e’lonini joylang va malakali mutaxassislar bilan bog‘laning
          </p>
          <button
            onClick={() => setShowPostModal(true)}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Ish e'lon qilish
          </button>
        </div>

        {/* Post Job Modal */}
        {showPostModal && (
          <div className="fixed top-0 inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 max-w-md w-full shadow-lg relative">
              <button
                onClick={() => setShowPostModal(false)}
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-lg"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold mb-3">Yangi ish e’loni</h2>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Ish nomi *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Masalan, Backend Dasturchi"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Kompaniya *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Masalan, Tech Solutions"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Joylashuv
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Masalan, Toshkent yoki Masofadan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Ish turi
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  >
                    <option value="To‘liq stavka">To‘liq stavka</option>
                    <option value="Yarim stavka">Yarim stavka</option>
                    <option value="Amaliyot">Amaliyot</option>
                    <option value="Masofadan">Masofadan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Maosh
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Masalan, 50000-70000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Tavsif *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    rows="3"
                    placeholder="Ish haqida qisqacha ma'lumot"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Ko‘nikmalar (vergul bilan ajrating)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Masalan, React, Python, SQL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Kompaniya logotipi (URL)
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleFormChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Logotip URL manzili"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1.5 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm"
                >
                  Ish e’lonini joylash
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
