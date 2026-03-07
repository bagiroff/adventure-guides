import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "48rem", margin: "0 auto" }}>
      <h1>Adventure Guides</h1>
      <p>Frontend scaffold is ready. Open the tracker route to view the v0 sheet shell.</p>
      <p>
        <Link href="/tracker">Go to tracker</Link>
      </p>
    </main>
  );
}