import React from "react";
import { AchievementRow } from "@/components/tracker/achievement-row";

export type SheetAchievement = {
  id: string;
  name: string;
  order: number;
  isCompleted: boolean;
};

type SectionCardProps = {
  id: string;
  title: string;
  achievements: SheetAchievement[];
};

export function SectionCard({ id, title, achievements }: SectionCardProps) {
  const orderedAchievements = [...achievements].sort((left, right) => left.order - right.order);
  const completedCount = orderedAchievements.filter((achievement) => achievement.isCompleted).length;
  const isSectionComplete = orderedAchievements.length > 0 && completedCount === orderedAchievements.length;

  return (
    <article
      key={id}
      style={{
        borderRadius: "0.75rem",
        border: "1px solid #e2e8f0",
        background: "#fff",
        padding: "1rem",
        display: "grid",
        gap: "0.75rem",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "baseline" }}>
        <h2 style={{ fontSize: "1rem", margin: 0 }}>{title}</h2>
        <span
          aria-label={`${title} completion status`}
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: isSectionComplete ? "#166534" : "#92400e",
            background: isSectionComplete ? "#dcfce7" : "#fef3c7",
            borderRadius: "999px",
            padding: "0.125rem 0.5rem",
          }}
        >
          {isSectionComplete ? "Complete" : `${completedCount}/${orderedAchievements.length}`}
        </span>
      </header>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        {orderedAchievements.map((achievement) => (
          <AchievementRow
            key={achievement.id}
            id={achievement.id}
            name={achievement.name}
            isCompleted={achievement.isCompleted}
          />
        ))}
      </div>
    </article>
  );
}
