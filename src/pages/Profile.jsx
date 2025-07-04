import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import me from "../assets/me.jpg";
import {
  User,
  MapPin,
  Calendar,
  Link,
  Edit,
  Play,
  Download,
  Star,
  Award,
  Video,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const Profile = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // State for editable profile details
  const [profile, setProfile] = useState({
    name: "Rozimuhammad Rozimurodov",
    title: "Frontend Dasturchi",
    location: "Farg'ona, O‘zbekiston",
    joinDate: "Iyun 2024",
    website: "rozimurudov.uz",
    description:
      "Zamonaviy veb-ilovalarni yaratishda ishtiyoqli Frontend dasturchiman. Yoshlar uchun texnologik platformalar va real vaqtli ilovalar ishlab chiqishda tajribam bor. O‘rtoqlik, ochiq kodli loyihalar va mentorlik orqali jamoaviy o‘sishga hissa qo‘shishni yaxshi ko‘raman.",
    image: me,
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(profile.image);

  const skills = [
    { name: "React", level: 90, endorsements: 12 },
    { name: "TypeScript", level: 85, endorsements: 8 },
    { name: "Node.js", level: 80, endorsements: 15 },
    { name: "UI/UX Dizayn", level: 75, endorsements: 6 },
    { name: "Python", level: 70, endorsements: 4 },
  ];

  const achievements = [
    {
      title: "Tarmoq Chempioni",
      description: "100+ professional bilan bog‘langan",
      icon: Award,
    },
    {
      title: "Foydali Mentor",
      description: "50+ mentorlik sessiyasi yakunlangan",
      icon: Star,
    },
    {
      title: "Jamoa Lideri",
      description: "Forumlarning eng faol ishtirokchisi",
      icon: User,
    },
    {
      title: "Mahorat Ustasi",
      description: "10+ vazifa yakunlangan",
      icon: Award,
    },
  ];

  const projects = [
    {
      title: "Elektron tijorat platformasi",
      description: "React va Node.js bilan qurilgan to‘liq veb ilova",
      technologies: ["React", "Node.js", "MongoDB"],
      image:
        "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      title: "Mobil Bank Ilovasi",
      description: "Zamonaviy mobil bank ilovasi uchun UI/UX dizayn",
      technologies: ["Figma", "Prototiplash", "Foydalanuvchi tadqiqotlari"],
      image:
        "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      streamRef.current = stream;
      recordedChunksRef.current = [];
      const mimeType =
        ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/mp4"].find(
          (type) => MediaRecorder.isTypeSupported(type)
        ) || "video/webm";
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        try {
          const blob = new Blob(recordedChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);
          setRecordedVideoUrl(url);
          setIsRecording(false);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }
          toast.success("Video rezyume muvaffaqiyatli yuklandi!");
        } catch (error) {
          toast.error("Video saqlashda xatolik: " + error.message);
        }
      };

      mediaRecorderRef.current.onerror = (event) => {
        toast.error(`Yozib olishda xatolik: ${event.error.message}`);
        setIsRecording(false);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      setIsVideoModalOpen(true);
    } catch (error) {
      toast.error(
        "Kamera yoki mikrofon ruxsatini olishda xatolik: " + error.message
      );
      console.error("Recording error:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (
      isVideoModalOpen &&
      isRecording &&
      streamRef.current &&
      videoRef.current
    ) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch((err) => {
          toast.error("Video o‘ynatishda xatolik yuz berdi: " + err.message);
        });
      };
      videoRef.current.style.display = "none";
      videoRef.current.offsetHeight;
      videoRef.current.style.display = "block";
    }
  }, [isVideoModalOpen, isRecording]);

  useEffect(() => {
    return () => {
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [recordedVideoUrl]);

  const handleImageChange = (e) => {
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
        setImagePreview(reader.result);
        setTempProfile((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { name, title, location, joinDate, website, description } =
      tempProfile;
    if (!name || !title || !location || !joinDate || !website || !description) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    setProfile(tempProfile);
    setIsEditModalOpen(false);
    toast.success("Profil muvaffaqiyatli yangilandi!");
  };

  const handleDownloadResume = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${profile.name} - Rezyume`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Lavozim: ${profile.title}`, 20, 30);
    doc.text(`Manzil: ${profile.location}`, 20, 40);
    doc.text(`Qo'shilgan sana: ${profile.joinDate}`, 20, 50);
    doc.text(`Veb-sayt: ${profile.website}`, 20, 60);
    doc.text("Tavsif:", 20, 70);
    doc.text(profile.description, 20, 80, { maxWidth: 170 });
    doc.text("Ko‘nikmalar:", 20, 100);
    skills.forEach((skill, index) => {
      doc.text(`${skill.name}: ${skill.level}%`, 20, 110 + index * 10);
    });
    doc.text("Loyihalar:", 20, 110 + skills.length * 10 + 10);
    projects.forEach((project, index) => {
      doc.text(
        `${project.title}: ${project.description}`,
        20,
        120 + skills.length * 10 + index * 20,
        {
          maxWidth: 170,
        }
      );
    });
    doc.save(`${profile.name.replace(" ", "_")}_Rezyume.pdf`);
    toast.success("Rezyume PDF sifatida yuklandi!");
  };

  const handleShareProfile = async () => {
    const profileUrl = "https://alexchen.dev/profil";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.name} Profil`,
          text: `${profile.name}ning professional profilini ko‘ring!`,
          url: profileUrl,
        });
        toast.success("Profil ulashildi!");
      } else {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profil havolasi nusxalandi!");
      }
    } catch (error) {
      toast.error("Profilni ulashishda xatolik yuz berdi!");
    }
  };

  return (
    <Layout>
      <div className="space-y-8 px-4 sm:px-6 my-16 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={profile.image}
              alt="Profil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-lg sm:text-xl opacity-90 mb-2">
                    {profile.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm opacity-80">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{profile.joinDate} da qo'shilgan</span>
                    </div>
                    <div className="flex items-center">
                      <Link className="w-4 h-4 mr-1" />
                      <a
                        target="_blank"
                        href="https://my-portfolio-three-psi-51.vercel.app/"
                      >
                        {profile.website}
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTempProfile(profile);
                    setImagePreview(profile.image);
                    setIsEditModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-sm w-max"
                >
                  <Edit className="w-4 h-4" />
                  <span>Profilni tahrirlash</span>
                </button>
              </div>
              <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                {profile.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Resume */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Video Rezyume
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                <button
                  onClick={startRecording}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  disabled={isRecording}
                >
                  <Video className="w-4 h-4" />
                  <span>Video yozib olish</span>
                </button>
                {recordedVideoUrl && (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    <span>Yuklangan videoni ko‘rish</span>
                  </button>
                )}
              </div>
              {!recordedVideoUrl && (
                <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-600">
                  Hozircha video rezyume mavjud emas. Video yozib olish uchun
                  yuqoridagi tugmani bosing.
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Ko‘nikmalar va Tasdiqlar
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Ko‘nikma qo'shish
                </button>
              </div>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {skill.endorsements} tasdiq
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Tanlangan Loyihalar
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Loyiha qo'shish
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Profil Statistikalari
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profil ko‘rishlar</span>
                  <span className="font-semibold text-gray-800">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tarmoq hajmi</span>
                  <span className="font-semibold text-gray-800">347</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Postlar</span>
                  <span className="font-semibold text-gray-800">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mentorlik sessiyalari</span>
                  <span className="font-semibold text-gray-800">56</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Yutuqlar
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Download Resume */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Rezyume</h3>
              <p className="text-sm opacity-90 mb-4">
                An'anaviy rezyumeni yuklab oling yoki profil havolasini ulashing
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center space-x-2 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF yuklab olish</span>
                </button>
                <button
                  onClick={handleShareProfile}
                  className="w-full flex items-center justify-center space-x-2 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                >
                  <Link className="w-4 h-4" />
                  <span>Profilni ulashish</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl relative">
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  if (isRecording) stopRecording();
                }}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Video Rezyume
              </h3>
              {isRecording ? (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    className="w-full rounded-xl"
                    muted
                    autoPlay
                    playsInline
                  />
                  <button
                    onClick={stopRecording}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <span>Yozishni to‘xtatish</span>
                  </button>
                </div>
              ) : recordedVideoUrl ? (
                <video controls className="w-full rounded-xl" playsInline>
                  <source src={recordedVideoUrl} type="video/webm" />
                  Brauzeringiz video teglarini qo‘llab-quvvatlamaydi.
                </video>
              ) : (
                <div className="text-gray-600 text-center">
                  Hozircha video rezyume mavjud emas.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto p-4 relative">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>

              <h3 className="text-center text-lg font-semibold text-gray-800 mb-4 mt-2">
                Profilni Tahrirlash
              </h3>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Profil rasmi"
                    className="w-20 h-20 rounded-full border-2 border-gray-200 object-cover"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profil Rasmi
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </div>

                {/* Input fields */}
                {[
                  { label: "Ism", key: "name" },
                  { label: "Lavozim", key: "title" },
                  { label: "Manzil", key: "location" },
                  { label: "Qo'shilgan Sana", key: "joinDate" },
                  { label: "Veb-sayt", key: "website" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={tempProfile[key]}
                      onChange={(e) =>
                        setTempProfile({
                          ...tempProfile,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tavsif
                  </label>
                  <textarea
                    value={tempProfile.description}
                    onChange={(e) =>
                      setTempProfile({
                        ...tempProfile,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-xl hover:bg-gray-300"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700"
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

export default Profile;
