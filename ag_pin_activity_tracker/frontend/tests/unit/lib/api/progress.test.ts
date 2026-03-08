import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProgressHierarchy } from "../../../../lib/api/progress";

describe("fetchProgressHierarchy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
