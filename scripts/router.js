import { Render } from "./main.js";

const route = (event) => {
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async (event) => {
  let location = window.location.hash.replace("#", "");

  if (location.length === 0) {
    location = "/";
  }

  const routes = {
    "/": {
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
    dashboard: {
      path: "views/dashboard.html",
      title: "User Dashboard",
      discription: "User Dashboard",
    },
    book: {
      path: "views/book.html",
      title: "Book Details",
      discription: "Detailed View of a Book",
    },
  };

  let route = routes[location] || routes[404];

  const response = await fetch(route.path);

  const html = await response.text();
  Render.changeRouteDefault();

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
    case "dashboard": {
      Render.DashboardPage(html);
      return;
    }

    default:
      {
        if (location.split("/")[0] === "book") {
          const res = await fetch(routes["book"].path);

          const html = await res.text();
          Render.SingleBook(html, location.split("/")[1]);

          // document.title = routes.book.title;
        } else {
        }
      }

      return;
  }
};

// window.addEventListener("popstate", urlLocationHandler);
window.addEventListener("hashchange", urlLocationHandler);
window.route = route;

urlLocationHandler();
