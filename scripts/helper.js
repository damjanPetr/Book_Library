import { Login } from "./Auth.js";

export default function elementFromHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function changeDateFormat(dateString) {
  const date = new Date(dateString).toISOString().split("T")[0];
  return date;
}

const demo = document.querySelector("#demo");
demo.addEventListener("click", () => {
  Login.auth = true;
  Login.authAdmin = true;
  window.localStorage.setItem("auth", 1);

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      id: 1,
      password: "$2y$10$oBN0aYCfBDYYQmYnFIC9t.kJOZKW63mC0QiU/TDH02yNeXw3qARnS",
      type: "admin",
      username: "admin",
    }),
  );
  location.reload();
});
