import { expect, test } from "@playwright/test";

test("home page loads and links to tracker", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Adventure Guides" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to tracker" })).toBeVisible();
});

test("tracker route renders base shell", async ({ page }) => {
  await page.goto("/tracker");

  await expect(page.getByRole("heading", { level: 1, name: "Tracker", exact: true })).toBeVisible();
  await expect(page.getByText("Signed in as Adventure Family")).toBeVisible();
});
