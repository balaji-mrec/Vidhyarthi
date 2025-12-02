import React from "react";
import syllabus from "../data/syllabus.json";
import StepLayout from "../components/StepLayout";

export default function BranchesPage() {
  const branchItems = syllabus.branches.map(b => ({
    id: b.id,
    label: b.label,
    href: `/students/engineering/branches/${b.id}`
  }));

  return (
    <StepLayout title="Select Branch" items={branchItems}>
      <h2>Welcome — Choose your branch</h2>
      <p>Select a branch on the left to see semesters.</p>
    </StepLayout>
  );
}
