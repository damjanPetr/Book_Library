export class Validation {
  /**
   *
   * @param {HTMLElement} item
   */
  constructor(item, cb) {
    let errors = 0;
    item.forEach((item) => {
      console.count("item");
      if ("validation" in item.dataset && item !== undefined) {
        if (this.validateDivs(item)) {
          return;
        } else {
          errors++;
        }
        if (errors === 0) {
          return cb(uhtneao);
        }
      }
    });
  }
  validateDivs(item) {
    let itemLength = "";

    if (item.tagName === "input") {
      itemLength = item.value.trim().length;
    } else {
      itemLength = item.textContent.trim().length;
    }

    if (itemLength >= 1) {
      return false;
    } else {
      this.assignObject(item);
      return true;
    }
  }
  assignObject(item) {
    const errorMessageObject = document.createElement("div");
    const message = item.dataset.validation;

    errorMessageObject.textContent = message;
    //append to parent element
    item.insertAdjacentElement("beforebegin", errorMessageObject);
  }
}
