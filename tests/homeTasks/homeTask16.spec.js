import { expect, test } from "@playwright/test";

test.describe("New user registration", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    page = await ctx.newPage();
    await page.goto("/");
  });

  test("Open login form", async () => {
    const loginButton = page.locator("button", {
      hasText: "Sign in",
    });

    await loginButton.click("log in form should opens");
  });

  test("Open registration form", async () => {
    const regBtn = page.locator("button", {
      hasText: "Registration",
    });

    await regBtn.click("registration form should opens");
  });

  test("regiter button disabled/All input are empty", async () => {
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await expect(registerBtn).toBeDisabled();
  });

  test("name field is empty", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("I");
    await name.clear();
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Name required");
  });

  test("name is short", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("I");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("name is long", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiii");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("invalid name", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("@134шишка");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Name is invalid");
  });

  test("last name is empty", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.clear();
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Last name required");
  });

  test("last name is short", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("I");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("last name is long", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("last name invalid", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Бульба");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Last name is invalid");
  });

  test("empty email", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.clear();
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Email required");
  });

  test("invalid email", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa,com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Email is incorrect");
  });

  test("empty password/empty re-pass", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const error2 = page.locator("div.invalid-feedback").last();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.clear();
    await rePass.clear();
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Password required");
    await expect(error2).toHaveText("Re-enter password required");
  });

  test("short password", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("I");
    await rePass.fill("I");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("long password", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await rePass.fill("Iiiiiiiiiiiiiiiiiiiiiiiiiiii");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without number", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbbb");
    await rePass.fill("Bbbbbbbb");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without capital letter", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("bbbbbbb7");
    await rePass.fill("bbbbbbb7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("password without small letter", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback").first();
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("BBBBBBB7");
    await rePass.fill("BBBBBBB7");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("passwords are not mutch", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("div.invalid-feedback");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb8");
    await expect(registerBtn).toBeDisabled();
    await expect(error).toHaveText("Passwords do not match");
  });

  test("user already exist", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const error = page.locator("p.alert.alert-danger");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();
    await expect(error).toHaveText("User already exists");
  });

  test("SUCCESS REGISTRATION", async () => {
    const name = page.locator("input#signupName");
    const lName = page.locator("input#signupLastName");
    const email = page.locator("input#signupEmail");
    const psword = page.locator("input#signupPassword");
    const rePass = page.locator("input#signupRepeatPassword");
    const registerBtn = page.locator("button", {
      hasText: "Register",
    });

    await name.fill("Giorgios");
    await lName.fill("Popodopulous");
    await email.fill("aqa-nbm2@test.com");
    await psword.fill("Bbbbbbb7");
    await rePass.fill("Bbbbbbb7");
    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();
  });
});
