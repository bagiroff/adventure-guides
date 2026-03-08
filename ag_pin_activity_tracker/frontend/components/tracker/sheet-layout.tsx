import React from "react";
import { SectionCard, type SheetAchievement } from "@/components/tracker/section-card";

export type SheetSection = {
  id: string;
  title: string;
  order: number;
  achievements: SheetAchievement[];
};

type SheetLayoutProps = {
  isLoading: boolean;
  sections: SheetSection[];
};

export function SheetLayout({ isLoading, sections }: SheetLayoutProps) {
  if (isLoading) {
    return (
      <section
        aria-busy="true"
        aria-live="polite"
        style={{
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          background: "#fff",
          padding: "1rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#475569" }}>Loading tracker…</p>
      </section>
    );
  }

  if (sections.length === 0) {
    return (
      <section
        style={{
          borderRadius: "0.75rem",
          border: "1px dashed #cbd5e1",
          background: "#f8fafc",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1rem", margin: 0 }}>No tracker sections yet</h2>
        <p style={{ marginTop: "0.5rem", marginBottom: 0, fontSize: "0.875rem", color: "#475569" }}>
          Your adventure sheet layout will appear here after progress data is connected.
        </p>
      </section>
    );
  }

  const orderedSections = [...sections].sort((left, right) => left.order - right.order);
  const childTotalCount = orderedSections.reduce(
    (total, section) => total + section.achievements.length,
    0,
  );
  const childCompletedCount = orderedSections.reduce(
    (total, section) =>
      total + section.achievements.filter((achievement) => achievement.isCompleted).length,
    0,
  );
  const isTopLevelComplete = childTotalCount > 0 && childCompletedCount === childTotalCount;

  return (
    <section aria-label="Adventure tracker sections" style={{ display: "grid", gap: "0.75rem" }}>
      <header
        style={{
          borderRadius: "0.75rem",
          border: "1px solid #cbd5e1",
          background: "#ffffff",
          padding: "0.875rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "0.75rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1rem" }}>Overall Progress</h2>
        <span
          aria-label="Top level completion status"
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: isTopLevelComplete ? "#166534" : "#92400e",
            background: isTopLevelComplete ? "#dcfce7" : "#fef3c7",
            borderRadius: "999px",
            padding: "0.125rem 0.625rem",
          }}
        >
          {isTopLevelComplete ? "Complete" : `${childCompletedCount}/${childTotalCount}`}
        </span>
      </header>

      {orderedSections.map((section) => (
        <SectionCard
          key={section.id}
          id={section.id}
          title={section.title}
          achievements={section.achievements}
        />
      ))}
    </section>
  );
}