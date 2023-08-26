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

Login.checkAuth();

class Render {
  static mainDiv = document.querySelector(".mainDiv");

  static changeRouteDefault() {
    const loginDiv = document.querySelector("header  #loginBtn");
    const dashboardDiv = document.querySelector("header  #dashboardBtn");
    if (Login.auth) {
      loginDiv.classList.add("hidden");
      dashboardDiv.classList.remove("hidden");
    } else {
      return;
    }
  }

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
  static DashboardPage(html) {
    console.log(
      "🚀 ✔ file: main.js:60 ✔ Render ✔ DashboardPage ✔ html:",
      html,
    );

    const element = elementFromHTML(html);

    const logoutBtn = element.querySelector("button");

    logoutBtn.addEventListener("click", () => {
      Login.logout();
      window.location.reload();
    });
    this.mainDiv.innerHTML = "";
    this.mainDiv.append(element);
  }
}

export { Render };
