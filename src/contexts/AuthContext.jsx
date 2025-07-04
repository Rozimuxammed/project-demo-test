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
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      setUser({
        id: "1",
        name: "Rozimuhammad Rozimurodov",
        email,
        avatar: me,
        skills: ["React", "Node.js", "WebRTC", "Tailwind CSS", "Firebase"],
        location: "Farg'ona, O‘zbekiston",
      });
      console.log("Login successful for email:", email);
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Kirishda xato yuz berdi: " + err.message);
    }
  };

  const register = async (userData) => {
    try {
      // Validate input
      if (!userData.email) {
        throw new Error("Email kiritish shart");
      }
      if (!userData.name) {
        throw new Error("Ism kiritish shart");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser({
        id: "1",
        name: userData.name || "New User",
        email: userData.email,
        avatar: me, // Fixed syntax error (was meƒ)
        skills: userData.skills || [],
        location: userData.location || "Joy aniqlanmagan",
      });
      console.log("Registration successful for:", userData.email);
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error("Ro‘yxatdan o‘tishda xato yuz berdi: " + err.message);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
    console.log("User logged out");
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
