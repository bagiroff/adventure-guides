import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProgressHierarchy } from "../../../../lib/api/progress";

describe("fetchProgressHierarchy", () => {
  const originalMockFlag = process.env.NEXT_PUBLIC_USE_MOCK_PROGRESS;

  afterEach(() => {
    if (typeof originalMockFlag === "undefined") {
      delete process.env.NEXT_PUBLIC_USE_MOCK_PROGRESS;
    } else {
      process.env.NEXT_PUBLIC_USE_MOCK_PROGRESS = originalMockFlag;
    }
    vi.restoreAllMocks();
  });

  it("returns mock hierarchy when NEXT_PUBLIC_USE_MOCK_PROGRESS is enabled", async () => {
    process.env.NEXT_PUBLIC_USE_MOCK_PROGRESS = "true";

    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const result = await fetchProgressHierarchy({ baseUrl: "https://api.example.com" });

    expect(result.sections.length).toBeGreaterThan(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns hierarchy payload on successful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          sections: [
            { id: "s1", title: "Character", order: 1, achievements: [] },
            { id: "s2", title: "Outdoor", order: 2, achievements: [] },
          ],
        }),
        { status: 200 },
      ),
    );

    const result = await fetchProgressHierarchy({ baseUrl: "https://api.example.com" });

    expect(result.sections).toHaveLength(2);
    expect(result.sections[0]?.id).toBe("s1");
  });

  it("normalizes auth failures to AUTH_ERROR", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 }),
    );

    await expect(
      fetchProgressHierarchy({ baseUrl: "https://api.example.com" }),
    ).rejects.toMatchObject({
      code: "AUTH_ERROR",
      status: 403,
      message: "Forbidden",
    });
  });

  it("normalizes network failures to NETWORK_ERROR", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("socket hang up"));

    await expect(
      fetchProgressHierarchy({ baseUrl: "https://api.example.com" }),
    ).rejects.toMatchObject({
      code: "NETWORK_ERROR",
    });
  });

  it("throws UNKNOWN_ERROR when payload shape is invalid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ items: [] }), { status: 200 }),
    );

    await expect(
      fetchProgressHierarchy({ baseUrl: "https://api.example.com" }),
    ).rejects.toMatchObject({
      code: "UNKNOWN_ERROR",
    });
  });
});
