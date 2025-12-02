import React from "react";
import { useParams } from "react-router-dom";
import syllabus from "../data/syllabus.json";
import ResourceTabs from "../components/ResourceTabs";
import StepLayout from "../components/StepLayout";

export default function ResourcePage() {
  const { branchId, semId, subjectId } = useParams();
  const branch = syllabus.branches.find(b => b.id === branchId);
  const sem = branch?.semesters?.find(s => s.id === semId);
  const subject = sem?.subjects?.find(s => s.id === subjectId);
  if (!subject) return <p>Subject not found</p>;

  // sidebar items (subjects) so left menu still highlights each subject
  const items = (sem.subjects || []).map(sub => ({
    id: sub.id,
    label: sub.label,
    href: `/students/engineering/branches/${branchId}/semesters/${semId}/subjects/${sub.id}`
  }));

  return (
    <StepLayout title={`${branch.label} - ${sem.label}`} items={items} activeId={subjectId}>
      <h1>{subject.label}</h1>
      <ResourceTabs resources={subject.resources} />
    </StepLayout>
  );
}
