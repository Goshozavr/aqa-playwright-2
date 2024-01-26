import BasePage from "./BasePage1";
import RegistrationPopup from "../components1/RegistrationPopup";

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page, "/", "btn.btn-primary");
  }

  async clickSignUpBtn() {
    await this.body.signUpBtn.click();
    return new RegistrationPopup(this._page);
  }
}
