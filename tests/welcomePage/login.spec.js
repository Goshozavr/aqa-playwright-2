/*import { expect, test } from "@playwright/test";

test.description("login form blablabla", () => {
  let page;
  let WelcomePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage();
    await page.goto("/");
  });

  test("bla bla bla", async () => {
    const signInBtn = page.locator(".header_signin");
    await signInBtn.click();

    const signInPopup = page.locator("app-signin-modal");
    const emailInput = page.locator('[name="email"]');
    const passwordInput = page.locator('[name="password"]');

    await passwordInput.fill("value");
    emailInput.focus();
    emailInput.blur();

    const error = page.locator(".invalid-feedback p");
    await expect(error).toHaveText("Email required");
  });

  test("bla bla bla", async () => {
    const signInBtn = page.locator(".header_signin");
    await signInBtn.click();

    const signInPopup = page.locator("app-signin-modal");
    const emailInput = page.locator('[name="email"]');
    const passwordInput = page.locator('[name="password"]');

    await emailInput.fill("value");
    passwordInput.focus();
    passwordInput.blur();

    const error = page.locator(".invalid-feedback p");
    await expect(error).toHaveText("Password required");
  });
});
*/

// нижче перероблено для по

import { expect, test } from "@playwright/test";
import WelcomePage from "../src/pageObjects/welcomePage/WelcomePage.js";

test.describe("login form blablabla", () => {
  let page;
  let welcomePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
  });

  test("test", async () => {
    //await welcomePage.signInButton.click();

    //const signInPopup = new SignInPopup(page);
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();

    await signInPopup.passwordInput.fill("Valueee7");
    signInPopup.emailInput.focus();
    signInPopup.emailInput.blur();

    await expect(signInPopup.error).toHaveText("Email required");
  });

  test("bla bla bla", async () => {
    //await welcomePage.signInButton.click();

    //const signInPopup = new SignInPopup(page);
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();

    await signInPopup.emailInput.fill("test@test.com");
    signInPopup.passwordInput.focus();
    signInPopup.passwordInput.blur();

    await expect(signInPopup.error).toHaveText("Password required");
  });
});
