import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import me from "../assets/me.jpg";
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data
    setUser({
      id: "1",
      name: "Rozimuhammad Rozimurodov",
      email, // Email sizda mavjud bo‘lsa, shu joyda dinamik bo‘lib qoladi
      avatar: me,
      skills: ["React", "Node.js", "WebRTC", "Tailwind CSS", "Firebase"],
      location: "Farg'ona, O‘zbekiston",
    });
  };

  const register = async (userData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser({
      id: "1",
      name: userData.name || "New User",
      email: userData.email,
      avatar: meƒ,
      skills: userData.skills || [],
      location: userData.location || "Not specified",
    });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
