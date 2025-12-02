import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import SemesterPage from "./SemesterPage";
import "./CSELayout.css";

export default function CSELayout() {
  return (
    <div className="cse-layout">
      <h2>💻 Computer Science Engineering</h2>

      {/* Semester Navigation */}
      <nav className="semester-nav">
        {Array.from({ length: 8 }, (_, i) => (
          <NavLink
            key={i}
            to={`semester-${i + 1}`}
            className={({ isActive }) =>
              isActive ? "semester-link active" : "semester-link"
            }
          >
            Semester {i + 1}
          </NavLink>
        ))}
      </nav>

      {/* Semester Content */}
      <div className="semester-content">
        <Routes>
          {/* Default redirect to Semester 1 */}
          <Route path="/" element={<Navigate to="semester-1" replace />} />

          {/* Dynamic semester pages */}
          <Route path="semester-:id" element={<SemesterPage />} />
        </Routes>
      </div>
    </div>
  );
}
