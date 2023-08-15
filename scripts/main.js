import { Login } from "./Auth.js";
import elementFromHTML from "./helper.js";
import "./router.js";
const loginBtn = document.querySelector("#loginBtn");
const homeBtn = document.querySelector("#homeBtn");

homeBtn.addEventListener("click", (e) => {
  window.route(e);
});

loginBtn.addEventListener("click", (e) => {
  window.route(e);
});

class Render {
  static mainDiv = document.querySelector(".mainDiv");

  static RegisterPage(html) {
    const element = elementFromHTML(html);
    const form = element.querySelector("form");
    if (form) {
      const register = new Login(form, ["username", "password"], "register");
    }

    this.mainDiv.innerHTML = "";
    this.mainDiv.append(element);
  }

  static homePageBooks(html) {
    const element = elementFromHTML(html);
    this.mainDiv.innerHTML = "";
    this.mainDiv.append(element);
  }

  static LoginPage(html) {
    const element = elementFromHTML(html);
    const form = element.querySelector("form");

    if (form) {
      const validator = new Login(form, ["username", "password"], "login");
    }
    this.mainDiv.innerHTML = "";
    this.mainDiv.append(element);
  }
}

export { Render };
