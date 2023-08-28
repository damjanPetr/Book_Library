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
            <div class="w-full ">
              <h1 class="mb-4">Categories</h1>
              <div class="categoryDiv pt-4">
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
                    console.log(142421421);

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
              {
                const innerDiv = elementFromHTML(`
              <div class="w-full relative ">
              <div class="flex items-center justify-between px-8 border-b-2 border-b-black">
                  <h1 class="mb-4 text-xl ">Book Categories</h1>
                  <div class="flex items-center cursor-pointer rounded-md bg-blue-500 text-white p-2" id="createAuthor" >
                        <p class="">Create New</p>
                        <iconify-icon icon="gridicons:create" class=" ml-1 self-center" ></iconify-icon>
                  </div>
              </div>

                
                <div class="relative">

                <div class="flex addNew hidden -translate-x-1/2 top-2  w-full left-1/2  absolute   z-10" id="createNewAuthorForm">
                    
                <div class="items-center  bg-stone-100 mb-4 p-2 justify-between  w-full rounded-sm text-base">
                <form class="border-red-500 border" id="createAuthorForm">
                <div class="hidden w-full p-2 absolute top-4 bg-red-200 rounded-md" id="authorError"></div>
                  <div class="border-2 border-teal-500">
                    <div  id="createNewAuthor" class="relative tooltip-nohover p-4 space-y-4 [&_input[type='text']]:w-11/12" >
                    <button>
                    <iconify-icon icon="material-symbols:done" class="peer/edit bg-green-400 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Create New Author"></iconify-icon>
                    </button>

                        <div class="">
                          <label for="newFirstName" class="text-gray-500 mb-2 underline underline-offset-1 " >First Name: </label>
                          <br>
                          <input type="text" name="newFirstName" id="newFirstName" class="relative  p-1 rounded-md tooltip-nohover fill-emerald-500" data-tooltip="">
                        </div>

                        <div class="">
                        <label for="newLastName" class="text-gray-500 mb-2 underline underline-offset-1 " >Last Name: </label>
                        <br>
                          <input type="text" name="newLastName" id="newLastName" class="relative  p-1 rounded-md tooltip-nohover fill-emerald-500" data-tooltip="">
                        </div>

                        <div class="">
                            <label class="text-gray-500 mb-2 underline underline-offset-1 " for="newShortBio">Short Biography:</label>
                            <br>
                            <textarea name="newShortBio" rows="3" id="newShortBio"  class="relative p-2  rounded-md tooltip-nohover fill-emerald-500 w-full" data-tooltip=""></textarea>
                        </div>
                    </div>
                  </div>
                </form>

                

              </div>
                </div>
                  <div class="categoryDiv grid grid-cols-2 justify-items-center pt-4 ">
                  
                    
            </div>
                
                  </div>     
              </div>
                `);

                const categoryDiv = innerDiv.querySelector(".categoryDiv");

                const createNewAuthorForm = innerDiv.querySelector(
                  "#createNewAuthorForm",
                );

                const createNewAuthorBtn =
                  innerDiv.querySelector("#createAuthor");

                //popup form that is used to create a new author

                const createAuthorForm =
                  innerDiv.querySelector("#createAuthorForm");

                createNewAuthorBtn.addEventListener("click", (e) => {
                  createNewAuthorForm.classList.toggle("hidden");
                  categoryDiv.classList.toggle("blur-lg");
                });

                /**
                 *  Return a category element that can be deleted and edited
                 * @param {string} title the name of the category item that's also used to identify the db item
                 * @returns {Element} The element thats returned
                 */
                const createAuthorItems = (
                  id,
                  first_name,
                  last_name,
                  short_bio,
                ) => {
                  const itemDiv = elementFromHTML(`
                  <article class="flex   items-start mb-4  justify-between w-80  text-base  shadow-inner rounded-md">
                  <div class="p-4">
                    
                      <div id="name" class="">
                        <div class="flex items-center  justify-between mb-4">
                            <div class="max-w-[200px] break-all flex-initial">
                              <p class="mb-1 text-gray-500">Author:</p>
                              <div class="font-semibold  ">
                                    <p id="FirstName">${
                                      first_name + " "
                                    }${last_name}</p>
                                    <p id="LastName" class="ml-1"></p>
                          <form  class="" id="editForm" >
                                    <input class="hidden" type="text" name="newTitle" id="newFirstName" data-edit="">
                                    <input class="hidden" type="text" name="newTitle" id="newLastName" data-edit="">
                            </form>
                    </div>
                            </div>
                            <div class="buttons ml-2 rounded-sm  bg-gray-100">
                            <div class="flex items-center gap-2 justify-around w-full p-1">
                            
                            <div id="editBtn">
                              <iconify-icon icon="material-symbols:edit" class="peer/edit bg-red-200 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Edit Category"></iconify-icon>
                            </div>
                            <div id="checkEditBtn" class="hidden">
                              <iconify-icon icon="material-symbols:check" class="peer/edit bg-green-200 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Confirm Edit"></iconify-icon>
                            </div>
                            <div id="deleteBtn">
                              <iconify-icon icon="ph:x" class="bg-yellow-200 cursor-pointer tooltip relative p-1" data-tooltip="Delete Category"></iconify-icon>
                            </div>
                            
                                  </div></div>
                        </div>
                        <input type="checkbox" name="ch" id="ch${id}" class="peer hidden">
                        <p class="mb-2 text-gray-500">Short-Bio:</p>
                        <p id="ShortBio"  class="text-sm line-clamp-6 rounded-md  break-all overflow-hidden h-20 peer-checked:h-max group overflow-ellipsis whitespace-pre-line">${short_bio}
                        </p>

                        <textarea  class="hidden w-full" rows="5" type="text" name="newTitle" id="newShortBio"  data-edit=""></textarea>

                            <label for="ch${id}" class="before:content-['Read_More'] peer-checked:before:content-['Read_Less']  before:mt-4 before:rounded-md before:bg-blue-400 before:p-2 before:text-white"></label>

                        </div>
                       
                    
                    
                  </div></article>`);

                  //Form that visible when you click edit BTN
                  const editForm = itemDiv.querySelector("#editForm");

                  //div that holds the item title
                  const renderItem = itemDiv.querySelector("#name");

                  const newFirstName = itemDiv.querySelector("#newFirstName");
                  const newLastName = itemDiv.querySelector("#newLastName");
                  const newShortBio = itemDiv.querySelector("#newShortBio");

                  const FirstName = itemDiv.querySelector("#FirstName");
                  const LastName = itemDiv.querySelector("#LastName");
                  const ShortBio = itemDiv.querySelector("#ShortBio");

                  const readMoreBtn =
                    renderItem.querySelector("label[for*='ch']");
                  readMoreBtn.clientHeight;

                  // async function checkItemPoz() {
                  setTimeout(() => {
                    if (ShortBio.clientHeight === ShortBio.scrollHeight) {
                      console.log(true);
                      readMoreBtn.classList.add("hidden");
                    }
                  }, 1);
                  // }
                  // checkItemPoz();

                  //Toggle edit Form
                  const editBtn = itemDiv.querySelector("#editBtn");

                  //Btn that is visible when the editForm in showing
                  const checkEditBtn = itemDiv.querySelector("#checkEditBtn");

                  editBtn.addEventListener("click", async (e) => {
                    //hidden inputs that shoud popup on edit btn
                    const newInputs = [newFirstName, newLastName, newShortBio];

                    const oldInputs = [FirstName, LastName, ShortBio];

                    //text content in p tag (Category Names)
                    const parameters = [first_name, last_name, short_bio];

                    for (let i = 0; i < newInputs.length; i++) {
                      const oldElement = oldInputs[i].textContent;
                      //new edit inputs
                      const replaceElement = newInputs[i];

                      replaceElement.value = oldElement;

                      oldInputs[i].classList.add("hidden");

                      replaceElement.classList.remove("hidden");
                      replaceElement.classList.add("activeEditItem");
                    }

                    renderItem
                      .querySelector("label[for*='ch']")
                      .classList.add("hidden");

                    editBtn.classList.add("hidden");

                    checkEditBtn.classList.remove("hidden");

                    editForm.addEventListener("submit", async (e) => {});
                  });

                  checkEditBtn.addEventListener("click", async (e) => {
                    const response = await fetch(
                      "backend/controllers/Authors.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "editAuthor",
                          json: {
                            id: id,
                            first_name: newFirstName.value,
                            last_name: newLastName.value,
                            short_bio: newShortBio.value,
                          },
                        }),
                      },
                    );

                    const data = await response.json();
                    if (data.error) {
                    } else {
                      // renderItem.classList.remove("hidden");

                      editBtn.classList.remove("hidden");
                      checkEditBtn.classList.add("hidden");

                      const newInputs = [
                        newFirstName,
                        newLastName,
                        newShortBio,
                      ];

                      const oldInputs = [FirstName, LastName, ShortBio];

                      renderItem
                        .querySelector("label[for*='ch']")
                        .classList.remove("hidden");
                      for (let i = 0; i < newInputs.length; i++) {
                        //new edit inputs
                        const replaceElement = newInputs[i];

                        oldInputs[i].textContent = replaceElement.value;

                        oldInputs[i].classList.remove("hidden");

                        replaceElement.classList.add("hidden");

                        replaceElement.classList.remove("activeEditItem");
                      }
                    }

                    // async function checkItemPoz() {
                    setTimeout(() => {
                      if (ShortBio.clientHeight === ShortBio.scrollHeight) {
                        console.log(true);
                        readMoreBtn.classList.add("hidden");
                      }
                    }, 1);
                    // }
                    // checkItemPoz();
                  });

                  const deleteBtn = itemDiv.querySelector("#deleteBtn");

                  deleteBtn.addEventListener("click", async (e) => {
                    const response = await fetch(
                      "backend/controllers/Authors.php",

                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "deleteAuthor",
                          json: {
                            id: id,
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

                createAuthorForm.addEventListener("submit", async (e) => {
                  e.preventDefault();
                  const dataForm = new FormData(createAuthorForm);

                  const result = Object.fromEntries(dataForm);

                  Object.keys(result).forEach((item) => {
                    result[item] = result[item].trim();
                  });

                  const response = await fetch(
                    "backend/controllers/Authors.php",
                    {
                      method: "post",
                      body: JSON.stringify({
                        action: "addAuthor",
                        json: result,
                      }),
                    },
                  );

                  const data = await response.json();

                  console.log(
                    "🚀 ✔ file: main.js:616 ✔ Render ✔ createAuthorForm.addEventListener ✔ data:",
                    data,
                  );

                  if (data.error) {
                    const errorMessage = innerDiv.querySelector("#authorError");

                    errorMessage.textContent = data.message;
                    errorMessage.classList.remove("hidden");
                  } else {
                    const { id, first_name, last_name, short_bio } = data.data;
                    const newItem = createAuthorItems(
                      id,
                      first_name,
                      last_name,
                      short_bio,
                    );
                    categoryDiv.append(newItem);

                    createAuthorForm.reset();

                    createNewAuthorForm.classList.toggle("hidden");
                    categoryDiv.classList.toggle("blur-lg");
                  }
                });

                /* render all authors items */
                const response = await fetch(
                  "backend/controllers/Authors.php",
                  {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                      action: "getAllAuthors",
                      json: "",
                    }),
                  },
                );

                const result = await response.json();
                if (!result.error) {
                  result.forEach((item) => {
                    const itemDiv = createAuthorItems(
                      item.id,
                      item.first_name,
                      item.last_name,
                      item.short_bio,
                    );
                    categoryDiv.append(itemDiv);
                  });

                  targetDiv.append(innerDiv);

                  targetDiv.classList.remove("loading");
                }
              }
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
