import { expect, test } from "@playwright/test";

test.describe("Wlcome page assertions", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    page = await ctx.newPage();
    await page.goto("/");
  });
  test.beforeEach(async () => {
    await page.goto("/");
  });

  test("regular assertion", async () => {
    const a = 1 + 2;
    expect(a).toBe(3);

    const user1 = {
      name: "Alice",
    };
    const user2 = {
      name: "Alice",
    };
    expect(user2, "users should be equal").toEqual(user1);

    const user3 = {
      name: "Alice",
      age: "22",
    };

    expect(user3, "users should have same names").toMatchObject(user2);
  });

  test("web first assertion", async () => {
    const guestLoginButton = page.locator("button.header-link.-guest");

    //const isVisible = await guestLoginButton.isVisible()
    //expect(isVisible).toBe(true)

    await expect(
      guestLoginButton,
      "Guest login button should be visible"
    ).toBeVisible(); // те саме, що і зверху
    //await expect.soft(guestLoginButton).not.toBeVisible();// тест все одно впаде, але виконаються всі дії

    await expect(guestLoginButton).toBeEnabled();
    await expect(guestLoginButton).toHaveText("Guest log in");
  });

  test("screenshots", async () => {
    //не пройде з першого разу, оскільки немає прикладу скріншоту, тому при першому запуску створиться скрін, з яким буде звіряти потім(під кожен браузер робитиме новий скріншот)
    const guestLoginButton = page.locator("button.header-link.-guest");

    await expect(guestLoginButton).toHaveScreenshot("guest-login-btn.png", {
      // формат завжди має бути png
      maxDiffPixelRatio: 0.02, //максимальний здвиг пікселів
    });
  });
});
