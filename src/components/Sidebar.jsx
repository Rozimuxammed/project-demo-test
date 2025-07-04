import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Coffee,
  Users,
  Briefcase,
  MessageSquare,
  User,
  Trophy,
  Video,
} from "lucide-react";

const menuItems = [
  { icon: Coffee, label: "Mentorship", path: "/mentorship" },
  { icon: Users, label: "Networking", path: "/networking" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: MessageSquare, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Trophy, label: "Challenges", path: "/challenges" },
  { icon: Video, label: "Random Chat", path: "/random-chat" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderItem = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        className={`w-full flex flex-col items-center sm:flex-row sm:items-center sm:space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-xs sm:text-base font-medium sm:inline mt-1 sm:mt-0">
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Sidebar for desktop */}
      <aside className="hidden sm:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 pt-20 z-30">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>{renderItem(item)}</li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Bottom nav for mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <ul className="flex justify-between items-center px-2 py-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className="flex-1 text-center">
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center px-2 py-2 w-full text-xs transition-all duration-200 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  {/* <span className="text-[10px]">{item.label}</span> */}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
