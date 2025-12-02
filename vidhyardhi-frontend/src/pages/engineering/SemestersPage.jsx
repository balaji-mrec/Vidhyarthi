import React from "react";
import { useParams } from "react-router-dom";
import syllabus from "../data/syllabus.json";
import StepLayout from "../components/StepLayout";

export default function SemestersPage() {
  const { branchId } = useParams();
  const branch = syllabus.branches.find(b => b.id === branchId);
  if (!branch) return <p>Branch not found</p>;

  const items = (branch.semesters || []).map(s => ({
    id: s.id,
    label: s.label,
    href: `/students/engineering/branches/${branchId}/semesters/${s.id}`
  }));

  return (
    <StepLayout title={`${branch.label} - Semesters`} items={items}>
      <h2>{branch.label}</h2>
      <p>Select a semester to view subjects.</p>
    </StepLayout>
  );
}
