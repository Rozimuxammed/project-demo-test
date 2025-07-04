import Layout from "../components/Layout";
import { MapPin, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Networking = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [connectedPeople, setConnectedPeople] = useState([]);

  const localEvents = [
    {
      id: 1,
      title: "Texno Netvorking Uchrashuvi",
      date: "Bugun, 18:00",
      location: "Shahar markazidagi jamoat markazi",
      distance: "0.5 mil",
      attendees: 23,
      image:
        "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Texnologiya", "Tanishuv", "Karyera"],
    },
    {
      id: 2,
      title: "Startap Pitch Kechasi",
      date: "Juma, 19:00",
      location: "Innovatsiya markazi",
      distance: "1.2 mil",
      attendees: 156,
      image:
        "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Startap", "Pitch", "Investitsiya"],
    },
    {
      id: 3,
      title: "Dizayn Fikrlash Darsi",
      date: "Shanba, 14:00",
      location: "Ijodiy makon",
      distance: "0.8 mil",
      attendees: 45,
      image:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Dizayn", "Mashg‘ulot", "UX"],
    },
  ];

  const nearbyPeople = [
    {
      id: 1,
      name: "Jessica Wong",
      title: "Mahsulot dizayneri",
      company: "Figma",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      distance: "0.3 mil",
      mutualConnections: 12,
      skills: ["UI/UX", "Prototiplash"],
      available: true,
    },
    {
      id: 2,
      name: "Alex Thompson",
      title: "Dasturiy injiniring muhandisi",
      company: "Tesla",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      distance: "0.7 mil",
      mutualConnections: 8,
      skills: ["Python", "AI/ML"],
      available: true,
    },
    {
      id: 3,
      name: "Maria Garcia",
      title: "Marketing menejeri",
      company: "Adobe",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      distance: "1.1 mil",
      mutualConnections: 5,
      skills: ["O‘sish", "Tahlil"],
      available: false,
    },
  ];

  const handleJoinEvent = (eventId, eventTitle) => {
    if (joinedEvents.includes(eventId)) {
      toast.success(`Siz allaqachon "${eventTitle}" tadbiriga qo'shilgansiz!`);
    } else {
      setJoinedEvents([...joinedEvents, eventId]);
      toast.success(
        `Siz "${eventTitle}" tadbiriga muvaffaqiyatli qo'shildingiz!`
      );
    }
  };

  const handleConnectPerson = (personId, personName) => {
    if (connectedPeople.includes(personId)) {
      toast.success(`Siz allaqachon ${personName} bilan bog'langansiz!`);
    } else {
      setConnectedPeople([...connectedPeople, personId]);
      toast.success(`Siz ${personName} bilan muvaffaqiyatli bog'landingiz!`);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 mt-16">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mahalliy Networking
          </h1>
          <p className="text-gray-600">
            Atrofingizdagi professionallar bilan bog‘laning
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Bu haftadagi tadbirlar</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Yaqin atrofdagilar</p>
                <p className="text-3xl font-bold">347</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Hozir mavjudlar</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <Clock className="w-8 h-8 text-green-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Local Events */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Mahalliy tadbirlar
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                Barchasini ko‘rish <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {localEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="md:flex">
                    <div className="md:w-48 h-48 md:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm space-x-4 mb-2">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{event.attendees} ishtirokchi</span>
                            <span className="mx-2">•</span>
                            <span>{event.distance} uzoqlikda</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleJoinEvent(event.id, event.title)}
                          className={`px-4 py-2 rounded-xl transition-all transform hover:scale-105 ${
                            joinedEvents.includes(event.id)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                          }`}
                          disabled={joinedEvents.includes(event.id)}
                        >
                          {joinedEvents.includes(event.id)
                            ? "Qo‘shilgan"
                            : "Tadbirga qo‘shilish"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* People Nearby */}
          <div className="space-y-6 mb-14">
            <h2 className="text-2xl font-semibold text-gray-800">
              Yaqin atrofdagilar
            </h2>

            <div className="space-y-4">
              {nearbyPeople.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {person.name}
                        </h3>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            person.available ? "bg-green-400" : "bg-gray-300"
                          }`}
                        />
                      </div>

                      <p className="text-gray-600 text-sm mb-1">
                        {person.title}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">
                        {person.company}
                      </p>

                      <div className="flex items-center text-gray-500 text-xs mb-3">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{person.distance} uzoqlikda</span>
                        <span className="mx-2">•</span>
                        <span>{person.mutualConnections} umumiy aloqa</span>
                      </div>

                      <div className="flex space-x-1 mb-4">
                        {person.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          handleConnectPerson(person.id, person.name)
                        }
                        disabled={
                          !person.available ||
                          connectedPeople.includes(person.id)
                        }
                        className={`w-full py-2 text-sm font-medium rounded-xl transition-all ${
                          person.available &&
                          !connectedPeople.includes(person.id)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {connectedPeople.includes(person.id)
                          ? "Bog‘langan"
                          : person.available
                          ? "Bog‘lanish"
                          : "Band"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              Yana odamlarni ko‘rish
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Networking;
