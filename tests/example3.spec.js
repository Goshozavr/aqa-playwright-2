//@ts-check

import { expect, test } from "@playwright/test";

test.describe("Test describe title 3", () => {
  test.only("test 1", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("button", { hasText: "Guest log in" })
    ).toBeVisible();
  });
});
