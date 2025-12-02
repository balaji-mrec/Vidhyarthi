// components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar (your 2000+ lines file) */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Body / Main Content */}
        <main className="flex-1 bg-white text-gray-800 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
