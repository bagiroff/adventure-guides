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
    }));
}
