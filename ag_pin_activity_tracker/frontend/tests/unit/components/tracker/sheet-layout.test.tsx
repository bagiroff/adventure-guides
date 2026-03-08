import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SheetLayout } from "../../../../components/tracker/sheet-layout";

afterEach(() => {
  cleanup();
});

describe("SheetLayout", () => {
  it("renders sections and achievements in expected order", () => {
    render(
      <SheetLayout
        isLoading={false}
        sections={[
          {
            id: "section-2",
            title: "Outdoor Skills",
            order: 2,
            achievements: [
              {
                id: "outdoor-2",
                name: "Build a small campfire safely",
                order: 2,
                isCompleted: false,
              },
              {
                id: "outdoor-1",
                name: "Tie three basic knots",
                order: 1,
                isCompleted: true,
              },
            ],
          },
          {
            id: "section-1",
            title: "Character & Service",
            order: 1,
            achievements: [
              {
                id: "service-2",
                name: "Help with a family service project",
                order: 2,
                isCompleted: false,
              },
              {
                id: "service-1",
                name: "Memorize and recite the pledge",
                order: 1,
                isCompleted: true,
              },
            ],
          },
        ]}
      />,
    );

    const sectionHeadings = screen.getAllByRole("heading", { level: 2 });
    expect(sectionHeadings[0]).toHaveTextContent("Overall Progress");
    expect(sectionHeadings[1]).toHaveTextContent("Character & Service");
    expect(sectionHeadings[2]).toHaveTextContent("Outdoor Skills");

    const firstSectionCard = sectionHeadings[1].closest("article");
    expect(firstSectionCard).toBeTruthy();
    if (firstSectionCard) {
      const { getAllByRole } = within(firstSectionCard);
      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(2);
      expect(checkboxes[0]).toHaveAttribute(
        "aria-label",
        "Memorize and recite the pledge completion status",
      );
      expect(checkboxes[1]).toHaveAttribute(
        "aria-label",
        "Help with a family service project completion status",
      );
    }
  });

  it("shows parent and top-level completion status derived from children", () => {
    render(
      <SheetLayout
        isLoading={false}
        sections={[
          {
            id: "section-1",
            title: "Character & Service",
            order: 1,
            achievements: [
              { id: "a1", name: "Achievement 1", order: 1, isCompleted: true },
              { id: "a2", name: "Achievement 2", order: 2, isCompleted: true },
            ],
          },
          {
            id: "section-2",
            title: "Outdoor Skills",
            order: 2,
            achievements: [
              { id: "b1", name: "Achievement 3", order: 1, isCompleted: false },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByLabelText("Top level completion status")).toHaveTextContent("2/3");
    expect(screen.getByLabelText("Character & Service completion status")).toHaveTextContent(
      "Complete",
    );
    expect(screen.getByLabelText("Outdoor Skills completion status")).toHaveTextContent("0/1");
  });
});
