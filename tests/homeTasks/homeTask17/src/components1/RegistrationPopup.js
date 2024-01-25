import BaseComponents from "./BaseComponents.js";

export default class RegistrationPopup extends BaseComponents {
  constructor(page) {
    super(page, page.locator("app-signup-modal"));
    this.name = this.container.locator("input#signupName");
    this.lName = this.container.locator("input#signupLastName");
    this.email = this.container.locator("input#signupEmail");
    this.psword = this.container.locator("input#signupPassword");
    this.rePass = this.container.locator("input#signupRepeatPassword");
    this.error = this.container.locator("div.invalid-feedback").first();
    this.error2 = this.container.locator("div.invalid-feedback").last();
    this.error3 = this.container.locator("p.alert.alert-danger");
    this.registerBtn = this.container.locator("button.btn.btn-primary");
  }
}
