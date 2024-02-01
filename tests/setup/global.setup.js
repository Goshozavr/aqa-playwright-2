import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_USER_PATH } from "../src/data/constants/storageStates";
import WelcomePage from "../src/pageObjects/welcomePage/WelcomePage";

setup("do login", async ({ page }) => {
  console.log("PROJECT SETUP");
  const welcomePage = new WelcomePage(page);
  await welcomePage.visit();
  await welcomePage.clickSignInButtonAndOpenPopup();
  await page.getByLabel("Email").fill("aqa-nbm2@test.com");
  await page.getByLabel("Password").fill("Bbbbbbb7");
  await page.getByText("Login").click();

  // Wait until the page actually signs in.
  //await expect(page.getByText("Hello, user!")).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE_USER_PATH });
});
