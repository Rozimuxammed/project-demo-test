import { useState } from "react";
import { Search, Bell, MessageCircle, Users, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png"; // Adjust the path as necessary
const Header = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo & Search */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div> */}
            <img className="w-16 h-16" src={logo} alt="logo image" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-700 to-red-950 bg-clip-text text-transparent">
              JIGARCHILIK
            </span>
          </div>

          {/* Search only on md+ */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search people, skills, opportunities..."
              className="pl-10 pr-4 py-2 w-80 bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Avatar + Info */}
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">
                {user?.location}
              </p>
            </div>
            <button
              onClick={logout}
              className="hidden sm:inline-block ml-2 px-3 py-1 text-sm text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu toggle (hamburger) */}
          <button
            className="sm:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.location}</p>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
