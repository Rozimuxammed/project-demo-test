import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Header importini unutmaslik kerak

const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full bg-gray-50">
      <Header />

      {/* Desktop view: sidebar + main */}
      <div className="flex">
        {/* Sidebar faqat sm va undan katta ekranlarda ko‘rsatiladi */}
        <div className="sm:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 w-full pt-20 sm:ml-64 p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Bottom nav faqat kichik ekranlar uchun Sidebar ichida mavjud */}
    </div>
  );
};

export default Layout;
