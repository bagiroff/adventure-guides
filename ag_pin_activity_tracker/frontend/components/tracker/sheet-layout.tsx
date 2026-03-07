type SheetSection = {
  id: string;
  title: string;
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

  return (
    <section aria-label="Adventure tracker sections" style={{ display: "grid", gap: "0.75rem" }}>
      {sections.map((section) => (
        <article
          key={section.id}
          style={{
            borderRadius: "0.75rem",
            border: "1px solid #e2e8f0",
            background: "#fff",
            padding: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1rem", margin: 0 }}>{section.title}</h2>
        </article>
      ))}
    </section>
  );
}