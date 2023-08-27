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
    const element = elementFromHTML(html);
    const targetDiv = element.querySelector("#targetDiv");
    const tabBtnDiv = element.querySelector("#tabBtnDiv");
    tabBtnDiv.addEventListener("click", async (e) => {
      if (e.target.id === "") {
        return;
      } else {
        console.log(e.target.id);
        const tabs = tabBtnDiv.querySelectorAll("button").forEach((item) => {
          item.classList.remove("tabActive");
        });

        if (e.target.matches("button")) {
          e.target.classList.add("tabActive");
        }
        targetDiv.innerHTML = "";
        targetDiv.classList.add("loading");

        switch (e.target.id) {
          case "bookBtn":
            {
              targetDiv.classList.remove("loading");
            }
            return;

          case "categoryBtn":
            {
              const innerDiv = elementFromHTML(`
            <div class="w-full text-xl">
              <h1 class="mb-4">Categories</h1>
              <div class="categoryDiv">
                  <div class="flex addNew">
                  
                    <div class="flex items-center  bg-stone-100 mb-4 p-2 justify-between w-80 rounded-sm text-base">
                    <form >
                    <div class="">
                     
                    <div class="relative tooltip-nohover hidden"></div>
                    <input type="text" name="newtitle" id="newtitle" class="relative tooltip-nohover" data-tooltip="">
                    </div>
                    </form>

                  <div class="buttons ml-2 flex gap-4">
                  <iconify-icon icon="gridicons:create"></iconify-icon>
      

                  </div>
                </div>
                  </div>
              </div>     
            </div>
              `);

              const categoryDiv = innerDiv.querySelector(".categoryDiv");

              const addForm = innerDiv.querySelector("form");
              /**
               *  Return a category element that can be deleted and edited
               * @param {string} title the name of the category item that's also used to identify the db item
               * @returns {Element} The element thats returned
               */
              const createcategoryItems = (title) => {
                const itemDiv = elementFromHTML(`
                <div class="flex items-center  bg-stone-100 mb-4 p-2 justify-between w-80 rounded-sm text-base">

                    <div id="name">
                      <p>${title}</p>
                    </div> 

                    <form  class="hidden" id="editForm" >
                        <input type="text" name="newTitle" id="newTitle">
                    </form>

                  <div class="buttons ml-2 flex gap-4">

                      <div id="editBtn">
                        <iconify-icon icon="material-symbols:edit" class="peer/edit bg-red-200 cursor-pointer relative tooltip" data-tooltip="Edit Category"></iconify-icon>
                      </div>
                      <div id="checkEditBtn" class="hidden">
                        <iconify-icon icon="material-symbols:check" class="peer/edit bg-green-200 cursor-pointer relative tooltip" data-tooltip="Confirm Edit"></iconify-icon>
                      </div>


                      <div id="deleteBtn">
                        <iconify-icon icon="ph:x" class="bg-yellow-200 cursor-pointer tooltip relative" data-tooltip="Delete Category"></iconify-icon>
                      </div>
                  </div>
                </div>`);

                //Form that visible when you click edit BTN
                const editForm = itemDiv.querySelector("#editForm");

                //div that holds the item title
                const itemTitle = itemDiv.querySelector("#name");

                const newTitle = itemDiv.querySelector("#newTitle");

                //input in editForm (form that shows up when you click EDIT BTN)
                const editInput = itemDiv.querySelector("input");

                //Toggle edit Form
                const editBtn = itemDiv.querySelector("#editBtn");

                //Btn that is visible when the editForm in showing
                const checkEditBtn = itemDiv.querySelector("#checkEditBtn");

                checkEditBtn.addEventListener("click", (e) => {
                  e.preventDefault();
                  editForm.submit();
                });

                editBtn.addEventListener("click", async (e) => {
                  console.log(itemTitle.firstElementChild.textContent);

                  //text content in p tag (Category Names)
                  editInput.value = itemTitle.firstElementChild.textContent;

                  editBtn.classList.add("hidden");
                  checkEditBtn.classList.remove("hidden");

                  itemTitle.classList.add("hidden");
                  editForm.classList.remove("hidden");
                  editForm.classList.add("activeEditForm");

                  editForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const response = await fetch(
                      "backend/controllers/Category.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "editCategory",
                          json: {
                            title: title,
                            newTitle: newTitle.value,
                          },
                        }),
                      },
                    );

                    const data = await response.json();

                    console.log(
                      "🚀 ✔ file: main.js:201 ✔ Render ✔ editForm.addEventListener ✔ data:",
                      data,
                    );

                    if (data.error) {
                    } else {
                      editForm.classList.add("hidden");
                      itemTitle.firstElementChild.textContent = newTitle.value;
                      itemTitle.classList.remove("hidden");

                      editBtn.classList.remove("hidden");
                      checkEditBtn.classList.add("hidden");
                      editForm.classList.remove("activeEditForm");
                    }
                  });
                });

                const deleteBtn = itemDiv.querySelector("#deleteBtn");

                deleteBtn.addEventListener("click", async (e) => {
                  const response = await fetch(
                    "backend/controllers/Category.php",

                    {
                      method: "post",
                      body: JSON.stringify({
                        action: "deleteCategory",
                        json: {
                          title: title,
                          newtitle: "arivegern",
                        },
                      }),
                    },
                  );

                  itemDiv.remove();
                  const data = await response.json();
                  console.log(data);
                });
                return itemDiv;
              };

              /* Create new form item */

              addForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const input = addForm.querySelector("input");

                const response = await fetch(
                  "backend/controllers/Category.php",
                  {
                    method: "post",
                    body: JSON.stringify({
                      action: "addCategory",
                      json: input.value.trim(),
                    }),
                  },
                );

                const data = await response.json();

                if (data.error) {
                  const errorMessage = input.previousElementSibling;
                  errorMessage.dataset.tooltip = data.message;
                  errorMessage.classList.remove("hidden");
                } else {
                  const newItem = createcategoryItems(input.value.trim());
                  categoryDiv.append(newItem);
                  input.value = "";
                  console.log(data);
                }
              });

              /* render all category items */
              const response = await fetch("backend/controllers/Category.php", {
                method: "post",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                  action: "getAll",
                  json: "",
                }),
              });

              const result = await response.json();

              if (!result["error"]) {
                result.forEach((item) => {
                  const itemDiv = createcategoryItems(item.title);
                  categoryDiv.append(itemDiv);
                });

                targetDiv.append(innerDiv);

                targetDiv.classList.remove("loading");
              }
            }
            return;
          case "authorBtn":
            {
              targetDiv.classList.remove("loading");
            }
            return;
          case "commentBtn":
            {
              targetDiv.classList.remove("loading");
            }
            return;

          default:
            return;
        }
      }
    });

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
