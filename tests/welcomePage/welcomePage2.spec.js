import { expect, test } from "@playwright/test";

test.describe("Welcome page", () => {
  test("page actions", async ({ page }) => {
    await page.goto("/");

    await page.reload();
    await page.goBack();
    await page.goForward();
  });
  test("locator actions", async ({ page }) => {
    const btn = page.locator(".button");
    await btn.click();
    await btn.hover();
    await btn.innerText();

    const input = page.locator("input");
    await input.fill("test@mail.com");
    await input.pressSequentially("test@mail.com", { delay: 80 }); // fill не запускає всі івенти, delay - опціонально
    await input.clear(); // треба викликати перед pressSequentially, щоб очистити поле вводу
    await input.focus();
    await input.blur(); // знімає фокус з елемента

    const radio = page.locator('input[type="radio"]');
    await radio.check();
    await radio.uncheck();
  });
});
