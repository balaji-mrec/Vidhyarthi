import React, { useState } from "react";
import "./Navbar.css"; // still uses your styling

export default function EngineeringDropdown() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About B.Tech" },
    { id: "national", label: "Top National Exams" },
    { id: "state", label: "State-Level Exams" },
    { id: "other", label: "Other Exams" },
  ];

  return (
    <div>
      {/* Tabs Row */}
      <div className="flex gap-6 border-b pb-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-semibold pb-2 transition ${
              activeTab === tab.id
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div>
        {activeTab === "about" && (
          <div className="flex flex-wrap gap-3">
            <a className="btn">🔍 Explore Branches</a>
            <a className="btn">🏛️ Engineering Colleges</a>
            <a className="btn">📈 Trending Branches</a>
            <a className="btn">⭐ Top Colleges</a>
            <a className="btn">❓ Engineering FAQs</a>
          </div>
        )}

        {activeTab === "national" && (
          <div className="flex flex-wrap gap-3">
            <a className="btn">📘 JEE Advanced</a>
            <a className="btn">📘 JEE Main</a>
            <a className="btn">📘 BITSAT</a>
            <a className="btn">📘 VITEEE</a>
            <a className="btn">📘 SRMJEEE</a>
            <a className="btn">📘 MET (Manipal)</a>
            <a className="btn">📘 Amity JEE / UPES</a>
            <a className="btn">📘 UPESEAT</a>
          </div>
        )}

        {activeTab === "state" && (
          <div className="flex flex-wrap gap-3">
            <a className="btn">📗 TS EAMCET (Telangana)</a>
            <a className="btn">📗 AP EAPCET (Andhra Pradesh)</a>
            <a className="btn">📗 MHT CET (Maharashtra)</a>
            <a className="btn">📗 KCET (Karnataka)</a>
            <a className="btn">📗 KEAM (Kerala)</a>
            <a className="btn">📗 WBJEE (West Bengal)</a>
            <a className="btn">📗 GUJCET (Gujarat)</a>
            <a className="btn">📗 REAP (Rajasthan)</a>
            <a className="btn">📗 UPCET (Uttar Pradesh)</a>
            <a className="btn">📗 BCECE (Bihar)</a>
            <a className="btn">📗 CG PET (Chhattisgarh)</a>
            <a className="btn">📗 OJEE (Odisha)</a>
            <a className="btn">📗 JCECE (Jharkhand)</a>
          </div>
        )}

        {activeTab === "other" && (
          <div className="flex flex-wrap gap-3">
            <a className="btn">🏫 IIITH UGEE / SAT</a>
            <a className="btn">🏫 SNUSAT (Shiv Nadar)</a>
            <a className="btn">🏫 Ashoka Aptitude Test</a>
            <a className="btn">🏫 ISBF Entrance Test</a>
          </div>
        )}
      </div>
    </div>
  );
}
