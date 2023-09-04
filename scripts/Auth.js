class Login {
  /**
   *
   * @param {HTMLFormElement} form
   * @param {Array<string>} fields
   */
  static auth = false;
  static authAdmin = false;
  static userName = "";

  constructor(form, fields, formName) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
    this.formName = formName;
  }

  static checkAuth() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (window.localStorage.getItem("auth") == 1 && user != null) {
      Login.auth = true;

      if (user.type == "admin") {
        Login.authAdmin = true;
      } else {
        Login.authAdmin = false;
      }

      Login.userId = user.id;
      Login.userName = user.username;
    }
  }
  login(user) {
    window.localStorage.setItem("auth", 1);

    const parsedUser = JSON.parse(user);

    if (parsedUser.type == "admin") {
      Login.authAdmin = true;
    }

    window.localStorage.setItem("user", JSON.stringify(parsedUser));

    Login.auth = true;

    window.location.hash = "/";
  }

  static logout() {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("authAdmin");

    // window.location.href = "";
    Login.auth = false;
    window.location.hash = "";
    window.location.reload();
  }

  validateOnSubmit() {
    const self = this;

    self.form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let error = 0;

      self.fields.forEach(async (field) => {
        const input = self.form.querySelector(`#${field}`);

        if (self.validateFields(input) == false) {
          error++;
        }
      });
      if (error === 0) {
        self.ApiCall();
      }
    });
  }
  async ApiCall() {
    switch (this.formName) {
      case "register":
        {
          const formData = new FormData(this.form);

          const response = await fetch("backend/controllers/User.php", {
            headers: { "Content-type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              action: "registerUser",
              json: Object.fromEntries(formData),
            }),
            method: "post",
          });

          const data = await response.json();

          const popupdiv = document.querySelector(".backend-login-message");

          popupdiv.firstChild.innerHTML = ``;

          if (data.error) {
            popupdiv.firstElementChild.innerHTML = `${data.message}`;
            popupdiv.classList.remove("hidden");
            this.form.parentElement.insertAdjacentElement("afterend", popupdiv);
          } else {
            this.login(JSON.stringify(data.user));
          }
        }
        return;
      case "login": {
        const formData = new FormData(this.form);
        const response = await fetch("backend/controllers/User.php", {
          method: "post",
          headers: { "Content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            action: "authUser",
            json: Object.fromEntries(formData),
          }),
        });

        const data = await response.json();

        const popupdiv = document.querySelector(".backend-login-message");

        popupdiv.firstChild.innerHTML = ``;

        if (data.error) {
          popupdiv.firstElementChild.innerHTML = `${data.message}`;
          popupdiv.classList.remove("hidden");
          this.form.parentElement.insertAdjacentElement("afterend", popupdiv);
        } else {
          this.login(JSON.stringify(data.user));
        }

        return;
      }
      default:
        return;
    }
  }
  validateFields(field) {
    if (field.value.trim() === "") {
      this.setStatus(field, `${field.placeholder} cannot be blank`, "error");
      return false;
    } else {
      if (field.type === "password") {
        if (field.value.length < 4) {
          this.setStatus(
            field,
            `${field.placeholder} must be more then 4 digits`,
            "error",
          );
          return false;
        } else {
          this.setStatus(field, null, "success");
          return true;
        }
      }
      this.setStatus(field, null, "success");
      return true;
    }
  }
  setStatus(field, message, status) {
    // const errorMessage = field.parentElement.querySelector(".error-message");
    const errorMessage = field.parentElement.nextElementSibling;

    field.parentElement.nextElementSibling.textContent;
    if (status === "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }
    if (status === "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
    }
  }

  async Login() {
    const response = await fetch("/backend/User/User.php", {
      body: JSON.stringify(""),
      Headers: "Content-type:application/json",
    });
    const data = await response.json();
  }
}
export { Login };
