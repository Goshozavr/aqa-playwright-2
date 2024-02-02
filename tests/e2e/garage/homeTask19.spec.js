import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/myFixture";
test.describe.skip("User", () => {
  test("should be able to create a car", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage();
    await popup.fillAndSubmit("Ford", "Mondeo", 250000);
    const { page } = userGaragePageWithStorage;

    await expect(page.locator("p", { hasText: "Ford Mondeo" })).toBeVisible();
  });
});
