import BaseComponents from "../components1/BaseComponents";
import Body from "../components1/Body";

export default class BasePage extends BaseComponents {
  constructor(page, url) {
    super(page, page.locator("html"));
    this._url = url;
    this.body = new Body(page);
  }

  async visit() {
    await this._page.goto(this._url);
  }
}
