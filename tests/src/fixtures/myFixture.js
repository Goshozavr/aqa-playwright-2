import { test as base } from "@playwright/test";
import WelcomePage from "../pageObjects/welcomePage/WelcomePage.js";
import { USERS } from "../data/users.js";
import { STORAGE_STATE_USER_PATH } from "../data/constants/storageStates.js";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();
    const garagePage = await signInPopup.loginWithCredentials(
      USERS.POP.email,
      USERS.POP.password
    );
    use(garagePage);
  },

  userGaragePageWithStorage: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });

    const page = await ctx.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.visit();

    use(garagePage);
  },
});
