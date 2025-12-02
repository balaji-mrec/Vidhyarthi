import { useParams } from "react-router-dom";

export default function SemesterPage() {
  const { id } = useParams();

  return (
    <div>
      <h3>📘 CSE - Semester {id}</h3>
      <p>Content for Semester {id} will go here (like subjects, syllabus, notes...)</p>
    </div>
  );
}
