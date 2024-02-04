import { expect, test } from "@playwright/test";

test.describe("Welcome page", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    page = await ctx.newPage();
    await page.goto("/");
  });
  test("guest login button should be visible", async () => {
    //const guestLoginButton = page.locator("button.header-link.-guest");
    const guestLoginButton = page.locator("button", {
      hasText: "Guest log in",
    });

    const header = page.locator("header", {
      has: guestLoginButton,
    });

    await expect(header).toBeVisible();

    await guestLoginButton.click();
  });

  test("guest login button should be visible 2", async () => {
    const headerlinks = page.locator(".header-link");
    const guestLoginBtn = headerlinks.filter({ hasText: "Guest log in" });

    await guestLoginBtn.click();

    //const guestLoginButton = page.locator("button.header-link.-guest").first().locator; - first found element
    //const guestLoginButton = page.locator("button.header-link.-guest").last().locator; - last found element
    //const guestLoginButton = page.locator("button.header-link.-guest").nth({number of element}).locator; - select the provided element
  });
});
