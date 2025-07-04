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
      email,
      avatar: me,
      skills: ["React", "Node.js", "WebRTC", "Tailwind CSS", "Firebase"],
      location: "Farg'ona, O‘zbekiston",
    });
  };

  const register = async (userData) => {
    // Validate userData
    if (!userData || typeof userData !== "object") {
      console.error("Invalid userData provided to register");
      return;
    }
    if (!userData.email) {
      console.error("Email is required for registration");
      return;
    }
    console.log("Register called with userData:", userData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser({
      id: "1",
      name: userData.name || "New User",
      email: userData.email,
      avatar: me,
      skills: userData.skills || [],
      location: userData.location || "Not specified",
    });

    // Navigate to home page after successful registration
    navigate("/", { replace: true });
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
