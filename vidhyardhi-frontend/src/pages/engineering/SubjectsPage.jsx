import React from "react";
import { useParams } from "react-router-dom";
import syllabus from "../data/syllabus.json";
import StepLayout from "../components/StepLayout";

export default function SubjectsPage() {
  const { branchId, semId } = useParams();
  const branch = syllabus.branches.find(b => b.id === branchId);
  const sem = branch?.semesters?.find(s => s.id === semId);
  if (!branch || !sem) return <p>Not found</p>;

  const items = (sem.subjects || []).map(sub => ({
    id: sub.id,
    label: sub.label,
    href: `/students/engineering/branches/${branchId}/semesters/${semId}/subjects/${sub.id}`
  }));

  return (
    <StepLayout title={`${branch.label} - ${sem.label}`} items={items}>
      <h2>{sem.label}</h2>
      <p>Select a subject to view resources.</p>
    </StepLayout>
  );
}
