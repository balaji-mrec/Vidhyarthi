// src/components/Sidebar.jsx
import React from "react";

const topics = [
  "HTML Introduction",
  "HTML Basics",
  "HTML Elements",
  "HTML Attributes",
  "HTML Headings",
  "HTML Paragraphs",
  "HTML Links",
  "HTML Images",
  "HTML Lists",
  "HTML Tables",
  "HTML Forms",
  "HTML Semantic",
  "HTML Projects",
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-2 sticky top-0 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">HTML Tutorial</h2>
      {topics.map((topic, i) => (
        <a
          key={i}
          href="#"
          className="block px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          {topic}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
