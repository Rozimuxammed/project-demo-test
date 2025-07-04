import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Mentorship from "./pages/Mentorship";
import Networking from "./pages/Networking";
import Jobs from "./pages/Jobs";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import RandomChat from "./pages/RandomChat";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mentorship" element={<Mentorship />} />
      <Route path="/networking" element={<Networking />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/random-chat" element={<RandomChat />} />
    </Routes>
  );
}
