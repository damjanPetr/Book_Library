export class Validation {
  /**
   *
   * @param {HTMLElement} items
   */
  constructor(items, cb) {
    let errors = 0;

    items.forEach((item) => {
      if ("validation" in item.dataset && item !== undefined) {
        if (this.validateDivs(item) === false) {
          errors++;
          return;
        } else {
          return;
        }
      }
    });
    if (errors == 0) {
      this.canValidate = true;
    }
  }

  validateDivs(item) {
    if (item.tagName === "INPUT") {
      let itemLength = item.value.trim().length;
      item.parentElement
        .querySelectorAll(".validation-error")
        .forEach((item) => {
          item.remove();
        });
      switch (item.type) {
        case "text":
          {
            if (item.id === "pictureUrl" && itemLength <= 10) {
              this.assignObject(
                item,
                "Input must  be longer then 10 characters",
              );
              return false;
            }
            if (itemLength < 1) {
              console.log(itemLength);
              this.assignObject(item, "Input is required");
              return false;
            } else if (itemLength > 5000) {
              this.assignObject(item, "Intput is too long");
              return false;
            } else {
              this.clearError(item);

              return true;
            }
          }
          break;
        case "date":
          {
            if (item.value === "") {
              this.assignObject(item, "Date is required");
              return false;
            } else {
              this.clearError(item);
              return true;
            }
          }
          break;
        case "number":
          {
            if (item.value <= 3) {
              this.assignObject(item, "The number should be greater than 3");
              return false;
            } else {
              this.clearError(item);
              return true;
            }
          }
          break;
        case "date":
          {
            if (itemLength <= 3) {
              this.assignObject(item, "Number is too small");
              return true;
            } else {
              this.clearError(item);
              return false;
            }
          }
          break;
        default:
          {
            console.log("default");
          }
          return;
      }
    }
    if (item.tagName === "TEXTAREA") {
      console.log("TEXTAREA");
      let itemLength = item.value.trim().length;
      item.parentElement
        .querySelectorAll(".validation-error")
        .forEach((item) => {
          item.remove();
        });
      if (itemLength <= 20) {
        console.log(itemLength);
        this.assignObject(item, "Text should be longer then 20 letters");
        return false;
      } else {
        this.clearError(item);
        return true;
      }
    }
  }
  clearError(item) {
    if (item.parentElement.classList.contains("parent-validation")) {
      item.parentElement
        .querySelectorAll(".validation-error")
        .forEach((item) => {
          item.remove();
        });
    }
    item.classList.remove("bg-red-200");
  }
  assignObject(item, message) {
    const errorMessageObject = document.createElement("div");
    errorMessageObject.textContent = message;
    item.classList.add("bg-red-200");
    item.parentElement.classList.add("relative", "parent-validation");
    errorMessageObject.classList.add("validation-error");
    //append to parent element
    item.insertAdjacentElement("beforebegin", errorMessageObject);
  }
}
