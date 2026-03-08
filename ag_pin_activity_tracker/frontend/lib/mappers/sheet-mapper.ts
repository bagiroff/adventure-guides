import { type SheetSection } from "@/components/tracker/sheet-layout";
import { type ProgressHierarchyResponse } from "@/lib/types/progress";

export function mapProgressHierarchyToSheetSections(
  payload: ProgressHierarchyResponse,
): SheetSection[] {
  return [...payload.sections]
    .sort((left, right) => left.order - right.order)
    .map((section) => ({
      id: section.id,
      title: section.title,
      order: section.order,
      achievements: [...section.achievements]
        .sort((left, right) => left.order - right.order)
        .map((achievement) => ({
          id: achievement.id,
          name: achievement.name,
          order: achievement.order,
          isCompleted: achievement.completion.isCompleted,
        })),
    }));
}
