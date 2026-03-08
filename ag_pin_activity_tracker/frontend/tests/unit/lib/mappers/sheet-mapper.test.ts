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
          achievements: [],
        },
        {
          id: "section-a",
          title: "Character & Service",
          order: 1,
          achievements: [],
        },
      ],
    });

    expect(result).toEqual([
      { id: "section-a", title: "Character & Service" },
      { id: "section-b", title: "Outdoor Skills" },
    ]);
  });
});
