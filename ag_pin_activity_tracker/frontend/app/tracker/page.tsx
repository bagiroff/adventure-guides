import { SheetLayout, type SheetSection } from "@/components/tracker/sheet-layout";
import { fetchProgressHierarchy, ProgressApiError } from "@/lib/api/progress";
import { mapProgressHierarchyToSheetSections } from "@/lib/mappers/sheet-mapper";

type AuthenticatedSession = {
  userId: string;
  displayName: string;
};

async function requireAuthenticatedSession(): Promise<AuthenticatedSession> {
  // Placeholder for v0 auth integration.
  // In a follow-up task this should redirect unauthenticated users.
  return {
    userId: "placeholder-user",
    displayName: "Adventure Family",
  };
}

export default async function TrackerPage() {
  const session = await requireAuthenticatedSession();

  const isLoading = false;
  let sections: SheetSection[] = [];

  try {
    const progress = await fetchProgressHierarchy();
    sections = mapProgressHierarchyToSheetSections(progress);
  } catch (error) {
    // Runtime error state UI with retry will be implemented in 4.x.
    if (error instanceof ProgressApiError) {
      console.error(`Progress read failed (${error.code})`, error.message);
    } else {
      console.error("Unexpected progress read failure", error);
    }
  }

  return (
    <main
      style={{
        margin: "0 auto",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "48rem",
        padding: "1.5rem 1rem",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
          Signed in as {session.displayName}
        </p>
        <h1 style={{ fontSize: "1.5rem", marginTop: "0.5rem", marginBottom: 0 }}>Tracker</h1>
      </header>

      <SheetLayout isLoading={isLoading} sections={sections} />
    </main>
  );
}