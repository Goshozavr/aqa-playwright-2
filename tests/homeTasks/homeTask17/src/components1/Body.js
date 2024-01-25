import BaseComponents from "./BaseComponents.js";

export default class Body extends BaseComponents {
  constructor(page) {
    super(page, page.locator("section.section.hero"));
    this.signUpBtn = this.container.locator("button.hero-descriptor_btn");
  }
}
