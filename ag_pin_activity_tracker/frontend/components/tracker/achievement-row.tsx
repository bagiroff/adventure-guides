import React from "react";

type AchievementRowProps = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export function AchievementRow({ id, name, isCompleted }: AchievementRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        padding: "0.625rem 0.75rem",
        background: isCompleted ? "#f0fdf4" : "#fff",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 500 }}>{name}</p>
        <p
          style={{
            margin: "0.25rem 0 0",
            fontSize: "0.75rem",
            color: isCompleted ? "#166534" : "#64748b",
            fontWeight: 500,
          }}
        >
          {isCompleted ? "Completed" : "Pending"}
        </p>
      </div>

      <input
        id={`achievement-${id}`}
        type="checkbox"
        checked={isCompleted}
        readOnly
        aria-label={`${name} completion status`}
        style={{ width: "1.25rem", height: "1.25rem" }}
      />
    </div>
  );
}
