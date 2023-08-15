import { Render } from "./main.js";

const routes = {
  "/": {
    // path: "../views/homepage.html",
    path: "views/homepage.html",
    title: "Library",
    discription: "",
  },
  404: {
    path: "views/404.html",
    title: "Page Not Found",
    discription: "Error Page",
  },
  login: {
    path: "views/login.html",
    title: "Index",
    discription: "Index page",
  },
  register: {
    path: "views/register.html",
    title: "Register",
    discription: "Register Page",
  },
};

const route = (event) => {
  // event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async (event) => {
  // let location = window.location.pathname;
  let location = window.location.hash.replace("#", "");

  if (location.length === 0) {
    location = "/";
  }

  console.log(
    "🚀 ✔ file: router.js:34 ✔ urlLocationHandler ✔ location:",
    location,
  );
  const route = routes[location] || routes[404];
  const response = await fetch(route.path);
  const html = await response.text();
  document.title = route.title;

  console.log("🚀 ✔ file: router.js:47 ✔ urlLocationHandler ✔ html:", html);

  switch (location) {
    case "login": {
      Render.LoginPage(html);
      return;
    }
    case "/": {
      Render.homePageBooks(html);

      return;
    }
    case "register": {
      Render.RegisterPage(html);
      return;
    }

    default:
      return;
  }
};

// window.addEventListener("popstate", urlLocationHandler);
window.addEventListener("hashchange", urlLocationHandler);
window.route = route;

urlLocationHandler();
