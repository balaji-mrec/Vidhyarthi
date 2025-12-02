// src/pages/languages/java/LanguageLayout.jsx
import { Outlet, Link } from "react-router-dom";
import "./LanguageLayout.css";

export default function LanguageLayout({ sidebar, basePath, title }) {
  return (
    <div className="language-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>{title} Tutorial</h2>
        <ul>
          {sidebar.map((topic, index) => (
            <li key={topic.id}>
              <Link to={`${basePath}/${topic.id}`}>
                {String(index + 1).padStart(2, "0")}. {topic.title}
              </Link>

              {/* Subtopics */}
              {topic.subtopics && (
                <ul className="subtopics">
                  {topic.subtopics.map((sub) => (
                    <li key={sub.id}>
                      <Link to={`${basePath}/${topic.id}/${sub.id}`}>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
