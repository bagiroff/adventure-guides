import { describe, expect, it } from "vitest";

import { mapProgressHierarchyToSheetSections } from "../../../../lib/mappers/sheet-mapper";

describe("mapProgressHierarchyToSheetSections", () => {
  it("maps sections to sheet layout shape and preserves paper order", () => {
    const result = mapProgressHierarchyToSheetSections({
      sections: [
        {
          id: "section-b",
          title: "Outdoor Skills",
          order: 2,
          achievements: [
            {
              id: "achievement-b2",
              name: "Build a small campfire safely",
              order: 2,
              completion: { isCompleted: false },
            },
            {
              id: "achievement-b1",
              name: "Tie three basic knots",
              order: 1,
              completion: { isCompleted: true },
            },
          ],
        },
        {
          id: "section-a",
          title: "Character & Service",
          order: 1,
          achievements: [
            {
              id: "achievement-a2",
              name: "Help with a family service project",
              order: 2,
              completion: { isCompleted: false },
            },
            {
              id: "achievement-a1",
              name: "Memorize and recite the pledge",
              order: 1,
              completion: { isCompleted: true },
            },
          ],
        },
      ],
    });

    expect(result).toEqual([
      {
        id: "section-a",
        title: "Character & Service",
        order: 1,
        achievements: [
          {
            id: "achievement-a1",
            name: "Memorize and recite the pledge",
            order: 1,
            isCompleted: true,
          },
          {
            id: "achievement-a2",
            name: "Help with a family service project",
            order: 2,
            isCompleted: false,
          },
        ],
      },
      {
        id: "section-b",
        title: "Outdoor Skills",
        order: 2,
        achievements: [
          {
            id: "achievement-b1",
            name: "Tie three basic knots",
            order: 1,
            isCompleted: true,
          },
          {
            id: "achievement-b2",
            name: "Build a small campfire safely",
            order: 2,
            isCompleted: false,
          },
        ],
      },
    ]);
  });
});
