class Login {
  /**
   *
   * @param {HTMLFormElement} form
   * @param {Array<string>} fields
   */
  constructor(form, fields, formName) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
    this.formName = formName;
  }

  login() {
    window.localStorage.setItem("auth", 1);
  }

  logaut() {
    window.localStorage.clear();
  }

  validateOnSubmit() {
    const self = this;

    self.form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let error = 0;

      self.fields.forEach(async (field) => {
        const input = self.form.querySelector(`#${field}`);
        console.log(input);

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

          console.log("success register");

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
          }
          this.login();
          window.location.hash = "#/";

          console.log(data);
        }
        return;
      case "login": {
        const formData = new FormData(this.form);

        console.log(
          "🚀 ✔ file: Auth.js:36 ✔ Login ✔ loginUserApiCall ✔ formData:",
          Object.fromEntries(formData),
        );

        console.log("success login");
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

        console.log(
          "🚀 ✔ file: Auth.js:42 ✔ Login ✔ self.fields.forEach ✔ popupdiv:",
          popupdiv.firstElementChild,
        );

        popupdiv.firstChild.innerHTML = ``;

        if (data.error) {
          popupdiv.firstElementChild.innerHTML = `${data.message}`;
          popupdiv.classList.remove("hidden");
          this.form.parentElement.insertAdjacentElement("afterend", popupdiv);
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
  get getLoginStatus() {
    return login;
  }
  set Login(value) {
    this.login = value;
  }

  async Login() {
    const response = await fetch("/backend/User/User.php", {
      body: JSON.stringify(""),
      Headers: "Content-type:application/json",
    });
    const data = await response.json();
    console.log(data);
  }
}
export { Login };
