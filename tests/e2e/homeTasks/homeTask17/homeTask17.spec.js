import { expect, test } from "@playwright/test";
import WelcomePage from "./src/pageObjects1/WelcomePage1";

test.describe("New user registration", () => {
  let page;
  let welcomePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
  });

  test("register button disabled/All input are empty", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();
    await expect(registrationPopup.registerBtn).toBeDisabled();
  });

  test("name field is empty", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("I");
    await registrationPopup.name.clear();
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Name required");
  });

  test("name is short", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("I");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("name is long", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiii");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("invalid name", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("@134шишка");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Name is invalid");
  });

  test("last name is empty", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.clear();
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Last name required");
  });

  test("last name is short", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("I");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("last name is long", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("last name invalid", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Бульба");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Last name is invalid");
  });

  test("empty email", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.clear();
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Email required");
  });

  test("invalid email", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa,com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Email is incorrect");
  });

  test("empty password/empty re-pass", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await registrationPopup.psword.clear();
    await registrationPopup.rePass.clear();
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Password required");
    await expect(registrationPopup.error2).toHaveText(
      "Re-enter password required"
    );
  });

  test("short password", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("I");
    await registrationPopup.rePass.fill("I");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("long password", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await registrationPopup.rePass.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without number", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbbb");
    await registrationPopup.rePass.fill("Bbbbbbbb");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without capital letter", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("bbbbbbb7");
    await registrationPopup.rePass.fill("bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without small letter", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("BBBBBBB7");
    await registrationPopup.rePass.fill("BBBBBBB7");
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("passwords are not mutch", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb8");
    registrationPopup.rePass.blur();
    await expect(registrationPopup.registerBtn).toBeDisabled();
    await expect(registrationPopup.error).toHaveText("Passwords do not match");
  });

  test("user already exist", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeEnabled();
    await registrationPopup.registerBtn.click();
    await expect(registrationPopup.error3).toHaveText("User already exists");
  });

  test("SUCCESS REGISTRATION", async () => {
    const registrationPopup = await welcomePage.clickSignUpBtn();

    await registrationPopup.name.fill("Giorgios");
    await registrationPopup.lName.fill("Popodopulous");
    await registrationPopup.email.fill("aqa-nbm2@test.com");
    await registrationPopup.psword.fill("Bbbbbbb7");
    await registrationPopup.rePass.fill("Bbbbbbb7");
    await expect(registrationPopup.registerBtn).toBeEnabled();
    await registrationPopup.registerBtn.click();
  });
});
