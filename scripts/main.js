import { Login } from "./Auth.js";

import elementFromHTML, { changeDateFormat } from "./helper.js";
import "./router.js";
import { Validation } from "./validation.js";
const homeBtn = document.querySelector("#homeBtn");

const loginBtn = document.querySelector("#loginBtn");

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
    const logoutBtn = document.querySelector("header  #logoutBtn");
    const dashboardDiv = document.querySelector("header  #dashboardBtn ");

    //login btn

    logoutBtn.addEventListener("click", () => {
      Login.logout();
    });

    if (Login.auth) {
      loginDiv.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
      if (Login.authAdmin) {
        dashboardDiv.classList.remove("hidden");
      }
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
    if (Login.authAdmin == false) {
      window.location.replace("./");
    } else {
      const element = elementFromHTML(html);

      const userName = element.querySelector("#userName");
      userName.textContent = Login.userName;
      const targetDiv = element.querySelector("#targetDiv");
      const tabBtnDiv = element.querySelector("#tabBtnDiv");
      const bookBtn = tabBtnDiv.querySelector("#bookBtn");
      const userBtn = tabBtnDiv.querySelector("#userBtn");

      // let event = new Event("click");
      let firstLoad = true;

      tabBtnDiv.addEventListener("click", async (e) => {
        //    ! Use this logic to activate the bookBtn click event once per refresh
        if (firstLoad) {
          e.target.id = "bookBtn";
          firstLoad = false;
        }

        if (
          e.target.matches("button") === false &&
          !firstLoad &&
          e.target.id !== "bookBtn"
          // toggle === true
        ) {
          return;
        } else {
          const tabs = tabBtnDiv.querySelectorAll("button").forEach((item) => {
            item.classList.remove("tabActive");
          });
          if (e.target.id === "bookBtn") {
            bookBtn.classList.add("tabActive");
          }
          if (e.target.matches("button")) {
            e.target.classList.add("tabActive");
          }

          targetDiv.innerHTML = "";

          targetDiv.classList.add("loading");

          switch (e.target.id) {
            case "bookBtn":
              {
                const innerDiv = elementFromHTML(`
              <div class="w-full relative">

              <div class="flex items-center justify-between px-8 py-2 border-b-2 border-b-black">
                  <h1 class="text-xl ">Books</h1>
                  <div class="flex items-center cursor-pointer rounded-md bg-blue-500 text-white p-2" id="createNewBtn" >
                        <p class="">Create New</p>
                        <iconify-icon icon="gridicons:create" class=" ml-1 self-center" ></iconify-icon>
                  </div>
              </div>


                <div class="relative">

                <div class="flex addNew  -translate-x-1/2 top-2  w-full left-1/2  absolute   z-20" id="createNewBook">

                <div class="items-center   mb-4 justify-between  w-full rounded-sm text-base ">
                <form  id="createBookForm" class="border-red-500 border hidden bg-violet-50">
                <div class="hidden w-full p-2 absolute top-4 bg-red-200 rounded-md" id="authorError"></div>
                  <div class="border-2 border-teal-500">
                    <div  id="createNewAuthor" class="relative  p-4 space-y-4 [&_input[type='text']]:w-full" >
                    <button class="absolute right-10 top-4 ">
                    <iconify-icon icon="material-symbols:done" class="peer/edit bg-green-400 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Create New Book"></iconify-icon>
                    </button>
                        <div class="">
                          <label for="title" class="text-gray-500 mb-2 underline underline-offset-1 " >Title: </label>
                          <br>
                          <input data-validation="" type="text" name="title" id="title" class="relative  p-1 rounded-md  fill-emerald-500 " data-tooltip="">
                        </div>

                        <div class="">
                              <label for="Author" class="text-gray-500 mb-2 underline underline-offset-1 " >Author: </label>
                              <br>
                                <div class="selection relative w-full">
                                <input type="text" class="hidden  " value="" name="authorId" id="authorTitle">
                                <p class="bg-white p-2 text-md rounded-md w-full " >&nbsp;</p>
                                <div class="hidden options mt-2 absolute top-full left-1/2 -translate-x-1/2 w-full  z-10 bg-white rounded-md max-h-40 overflow-auto">
                                    <ul class="p-2 text-left break-words space-y-1">

                                    </ul>


                                </div>

                                </div>

                          </div>

                          <div class="">

                                <label for="Category" class="text-gray-500 mb-2 underline underline-offset-1 " >Category: </label>
                                <br>
                                      <div class="selectionCategory relative w-full">
                                            <input type="text" class="hidden" value="" name="categoryId" id="categoryTitle">
                                            <p  class="bg-white p-2 text-md rounded-md w-full" >&nbsp;</p>
                                            <div class="hidden options mt-2 absolute top-full left-1/2 -translate-x-1/2 w-full  z-10 bg-white rounded-md max-h-40 overflow-auto">
                                                <ul class="p-2 text-left break-words space-y-1">

                                                </ul>
                                            </div>
                                      </div>

                          </div>

                          <div class="">
                            <label for="releaseDate" class="text-gray-500 mb-2 underline underline-offset-1 " >Release Date: </label>
                            <br>
                            <input  data-validation="" type="date" min="0" name="releaseDate" id="releaseDate" class="relative   p-1 rounded-md  fill-emerald-500" data-tooltip="">
                          </div>

                          <div class="">
                            <label for="numberOfPages" class="text-gray-500 mb-2 underline underline-offset-1 " >Number Of Pages: </label>
                            <br>
                            <input data-validation="" type="number" min="0" name="numberOfPages" id="numberOfPages" class="relative  w-20 p-1 rounded-md  fill-emerald-500" data-tooltip="">
                          </div>




                          <div class="">
                            <label for="pictureUrl" class="text-gray-500 mb-2 underline underline-offset-1 " >Picture Url: </label>
                            <br>
                            <input data-validation="" type="text"  name="pictureUrl" id="pictureUrl" class="relative  w-full p-1 rounded-md  fill-emerald-500" data-tooltip="">
                          </div>



                    </div>
                  </div>
                </form>

              </div>
                </div>
                  <div class=" grid grid-cols-2 justify-items-center pt-4 " id="BookDiv">

            </div>

                  </div>
              </div>
                `);

                const createBookDiv = ({
                  Category,
                  author_id,
                  categories_id,
                  deleted_at,
                  first_name,
                  id,
                  img,
                  last_name,
                  number_of_pages,
                  release_date,
                  title,
                }) => {
                  const changeDate = changeDateFormat(release_date);
                  const ItemDiv =
                    elementFromHTML(`<div class="toppper mb-4 w-80 relative max-h-full">
                <div class="absolute top-0 z-10 right-0">
                  <div
                    class="buttons p-1.5 rounded-b-lg flex gap-4 text-white ml-auto bg-black/40 z-20 items-center"
                  >
                    <div id="editBtn">
                      <iconify-icon
                        icon="material-symbols:edit"
                        class="peer/edit bg-yellow-500 cursor-pointer relative tooltip rounded-md p-1"
                        data-tooltip="Edit Book"
                      ></iconify-icon>
                    </div>

                    <div id="checkEditBtn" class="hidden">
                      <iconify-icon
                        icon="material-symbols:check"
                        class="peer/edit bg-green-200 cursor-pointer relative tooltip rounded-md"
                        data-tooltip="Confirm Edit"
                      ></iconify-icon>
                    </div>

                    <div id="deleteBtn">
                      <iconify-icon
                        icon="ph:x"
                        class="bg-red-500 cursor-pointer tooltip relative rounded-md p-1"
                        data-tooltip="Delete Book"
                      ></iconify-icon>
                    </div>
                  </div>
                </div>

                <form id="editBookForm" class="border-red-500 border hidden bg-violet-50 h-full" >
                  <div
                    class="hidden w-full p-2 absolute top-4 bg-red-200 rounded-md"
                    id="authorError"
                  ></div>

                  <div class="border-2 border-teal-500 h-full flex items-center">
                    <div
                      id="createNewAuthor"
                      class="relative p-4 space-y-4 [&_input[type='text']]:w-full w-full"
                    >
                      <div class="">
                        <label
                          for="title"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Title:
                        </label>
                        <br />
                        <input
                        data-validation=""
                          type="text"
                          name="title"
                          id="title"
                          class="relative p-1 rounded-md fill-emerald-500"
                          data-tooltip=""
                        />
                      </div>

                      <div  class="">
                        <label
                          for="Author"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Author:
                        </label>
                        <br />
                        <div class="selection relative w-full">
                          <input
                            type="text"
                            class="hidden"
                            value="${author_id}"
                            name="authorId"
                            id="authorTitle"
                          />
                          <p class="bg-white p-2 text-md rounded-md w-full">&nbsp;</p>
                          <div
                            class="hidden options mt-2 absolute top-full left-1/2 -translate-x-1/2 w-full z-10 bg-white rounded-md max-h-40 overflow-auto"
                          >
                            <ul class="p-2 text-left break-words space-y-1"></ul>
                          </div>
                        </div>
                      </div>

                      <div class="">
                        <label
                          for="Category"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Category:
                        </label>
                        <br />
                        <div class="selectionCategory relative w-full">
                                      <input 
                                    
                                      type="text" class="hidden" value="${categories_id}" name="categoryId" id="categoryTitle" />
                                      <p class="bg-white p-2 text-md rounded-md w-full"> &nbsp; </p>
                                      <div class="hidden options mt-2 absolute top-full left-1/2 -translate-x-1/2 w-full z-10 bg-white rounded-md max-h-40 overflow-auto" >
                                        <ul class="p-2 text-left break-words space-y-1">
                                        </ul>
                                      </div>
                                    </div>
                      </div>

                      <div class="">
                        <label
                          for="releaseDate"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Release Date:
                        </label>
                        <br />
                        <input
                        data-validation=""
                        required
                          type="date"
                          min="0"
                          name="releaseDate"
                          id="releaseDate"
                          class="relative p-1 rounded-md fill-emerald-500"
                          data-tooltip=""
                        />
                      </div>

                      <div class="">
                        <label
                          for="numberOfPages"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Number Of Pages:
                        </label>
                        <br />
                        <input
                        data-validation=""
                          type="number"
                          min="0"
                          name="numberOfPages"
                          id="numberOfPages"
                          class="relative w-20 p-1 rounded-md fill-emerald-500"
                          data-tooltip=""
                        />
                      </div>

                      <div class="">
                        <label
                          for="pictureUrl"
                          class="text-gray-500 mb-2 underline underline-offset-1"
                          >Picture Url:
                        </label>
                        <br />
                        <input
                        data-validation=""
                          type="text"
                          name="pictureUrl"
                          id="pictureUrl"
                          class="relative w-full p-1 rounded-md fill-emerald-500"
                          data-tooltip=""
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div class="content bg-blue-100">
                  <div class="w-full relative rounded-t-xl  h-96 ">
                    <div class="editPopup hidden "></div>
                    <img
                      class="replace-img content-inner w-full h-full rounded-t-lg"
                      src="${img}"

                      alt="${title} image"
                    />
                    <div
                      class="content-inner px-4 py-1.5 break-words absolute bottom-0 w-full bg-neutral-500 text-white rounded-t-lg text-lg"
                    >
                      <p class="replace-title">${title}</p>
                    </div>
                  </div>

                  <div class="content-inner p-4 flex justify-between">
                    <div class="">
                      <div class="p-1">
                        <p class="text-sm underline text-gray-500">Author:</p>
                        <input
                          class="replace-authorId hidden"
                          type="button"
                          value="${author_id}"
                        />

                        <p class="replace-author">${
                          first_name + " "
                        } ${last_name}</p>
                      </div>

                      <div class="p-1">
                        <p class="text-sm underline text-gray-500">Category:</p>
                        <input
                          class="replace-categoryId hidden"
                          type="button"
                          value="${categories_id}"
                        />
                        <p class="replace-category">${Category}</p>
                      </div>
                    </div>

                    <div class="">
                      <div class="p-1">
                        <p class="text-sm underline text-gray-500">Number Of Pages:</p>
                        <p  class="replace-number_of_pages">${number_of_pages}</p>
                      </div>

                      <div class="p-1">
                        <p class="text-sm underline text-gray-500">Release Date:</p>
                        <p class="replace-release_date">${changeDate}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              `);

                  /*
                        Starting
                        Card
                        Divs
                      */

                  const bookImage = ItemDiv.querySelector(".replace-img");
                  const failbackImg = ItemDiv.querySelector(".failback-img");

                  bookImage.addEventListener("error", function (e) {
                    this.error = null;
                    // bookImage.style.display = "none";
                    bookImage.src = "assets/book-sharp.svg";
                    // failbackImg.src = "assets/book-sharp.svg";

                    // failbackImg.classList.add("error-img");
                    // failbackImg.classList.remove("hidden");
                  });

                  const replace_authorId =
                    ItemDiv.querySelector(".replace-authorId");
                  const replace_categoryId = ItemDiv.querySelector(
                    ".replace-categoryId",
                  );

                  const replace_title = ItemDiv.querySelector(".replace-title");
                  const replace_author =
                    ItemDiv.querySelector(".replace-author");
                  const replace_category =
                    ItemDiv.querySelector(".replace-category");
                  const replace_number_of_pages = ItemDiv.querySelector(
                    ".replace-number_of_pages",
                  );
                  const replace_release_date = ItemDiv.querySelector(
                    ".replace-release_date",
                  );
                  const replace_img = ItemDiv.querySelector(".replace-img");

                  /* EditFrom Selections */
                  const editFormBookTitle = ItemDiv.querySelector("#title");
                  const editFormreleaseDate =
                    ItemDiv.querySelector("#releaseDate");
                  const editFormnumberOfPages =
                    ItemDiv.querySelector("#numberOfPages");

                  const editFormpictureUrl =
                    ItemDiv.querySelector("#pictureUrl");

                  const editBookForm = ItemDiv.querySelector("#editBookForm");

                  /* BUTTONS
                    ON
                    BOOK
                    CARD
                    FOR
                    ACTIONS
                */
                  const editBtn = ItemDiv.querySelector("#editBtn");
                  const deleteBtn = ItemDiv.querySelector("#deleteBtn");
                  const checkEditBtn = ItemDiv.querySelector("#checkEditBtn");

                  /*
                  Create
                  BOOK CARD
                  Section THAT POPS UP
                 */

                  const createNewBtn = ItemDiv.querySelector("#createNewBtn");

                  const authorOptions = ItemDiv.querySelector(".options");
                  const authorOptionsUl = ItemDiv.querySelector(".options ul");
                  const authorSelection = ItemDiv.querySelector(".selection p");
                  const authorTitle = ItemDiv.querySelector("#authorTitle");

                  const categoryOptions = ItemDiv.querySelector(
                    ".selectionCategory .options",
                  );
                  const categoryOptionsUl = ItemDiv.querySelector(
                    ".selectionCategory .options ul",
                  );
                  const categorySelection = ItemDiv.querySelector(
                    ".selectionCategory > p",
                  );
                  const categoryTitle = ItemDiv.querySelector("#categoryTitle");

                  /*
                Edit Form Author Dropdow

                */
                  authorSelection.addEventListener("click", async () => {
                    authorOptionsUl.innerHTML = "";
                    const response = await fetch(
                      "backend/controllers/Authors.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "getAllAuthors",
                          json: "",
                        }),
                      },
                    );

                    const data = await response.json();

                    data.forEach((item) => {
                      const AuthorItem = elementFromHTML(`
                    <li class="px-1 hover:bg-gray-200 w-full">
                        ${item.first_name}
                        ${item.last_name}
                    <li/>
                    `);

                      authorOptionsUl.append(AuthorItem);

                      AuthorItem.addEventListener("click", (e) => {
                        authorSelection.textContent =
                          item.first_name + " " + item.last_name;
                        const input = ItemDiv.querySelector("#authorTitle");

                        input.value = item.id;
                        authorOptions.classList.toggle("hidden");
                      });
                    });

                    authorOptions.classList.toggle("hidden");
                  });

                  /*
                  Edit
                  Form
                  Category
                  Dropdown
                */

                  categorySelection.addEventListener("click", async () => {
                    categoryOptionsUl.innerHTML = "";
                    const response = await fetch(
                      "backend/controllers/Category.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "getAll",
                          json: "",
                        }),
                      },
                    );

                    const data = await response.json();

                    data.forEach((item) => {
                      const categoryItem = elementFromHTML(`
                    <li class="px-1 hover:bg-gray-200 w-full">
                          ${item.title}
                    <li/>
                    `);
                      categoryOptionsUl.append(categoryItem);

                      categoryItem.addEventListener("click", (e) => {
                        categorySelection.textContent = item.title;
                        const input = ItemDiv.querySelector("#categoryTitle");
                        input.value = item.id;
                        categoryOptions.classList.toggle("hidden");
                      });
                    });

                    categoryOptions.classList.toggle("hidden");
                  });

                  /*
                  edit
                 form
                 for
                 submitting
                 edited
                 book
                  */

                  editBookForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    console.log("EDITFORM ACTIVATED");
                    const formData = Object.fromEntries(
                      new FormData(editBookForm),
                    );
                    formData.bookId = id;
                    const response = await fetch(
                      "backend/controllers/Book.php",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          action: "editBook",
                          json: formData,
                        }),
                      },
                    );
                    const data = await response.json();

                    if (data.error === "false") {
                      return;
                    } else {
                      console.log(data);

                      // Works but replacing the element causes flicker

                      // ItemDiv.parentElement.replaceChild(
                      //   createBookDiv(data.data),
                      //   ItemDiv,
                      // );
                      /*
                        Change The starting card author/Category Title to the changed ones
                    */
                      replace_authorId.value = authorTitle.value;
                      replace_categoryId.value = categoryTitle.value;
                      replace_title.textContent = data.data.title;
                      replace_release_date.textContent = data.data.release_date;

                      replace_category.textContent = data.data.Category;

                      replace_author.textContent =
                        data.data.first_name + " " + data.data.last_name;

                      replace_number_of_pages.textContent =
                        data.data.number_of_pages;
                      replace_img.textContent = data.data.img;

                      /* This is for replacing form values */
                      categoryTitle.value = data.data.author_id;
                      authorTitle.value = data.data.categories_id;

                      editFormnumberOfPages.value = data.data.number_of_pages;
                      editFormpictureUrl.value = data.data.img;
                    }
                  });

                  editBtn.addEventListener("click", () => {
                    ItemDiv.querySelectorAll(".content-inner").forEach(
                      (item) => item.classList.add("hidden"),
                      editBookForm
                        .querySelectorAll("[data-validation]")
                        .forEach((item) => {
                          item.classList.add("activeEditItem");
                        }),
                    );
                    const editPopup =
                      ItemDiv.querySelector(".editPopup").classList.remove(
                        "hidden",
                      );

                    editBookForm.classList.remove("hidden");

                    /**
                     * change buttons edit/check
                     * */
                    editBtn.classList.add("hidden");
                    checkEditBtn.classList.remove("hidden");

                    /*
                  place initial selection text
                  */
                    editFormreleaseDate.value =
                      replace_release_date.textContent;

                    categorySelection.textContent =
                      replace_category.textContent;
                    authorSelection.textContent = replace_author.textContent;
                    editFormBookTitle.value = replace_title.textContent;
                    editFormnumberOfPages.value =
                      replace_number_of_pages.textContent;

                    editFormpictureUrl.value = replace_img.getAttribute("src");

                    authorTitle.value = replace_authorId.value;

                    categoryTitle.value = replace_categoryId.value;

                    /*   console.group("variables");
                          console.log(replace_author.textContent);
                          console.log(replace_authorId.value);
                          console.log(replace_categoryId.value);
                          console.log(replace_category.textContent);
                          console.log(replace_img.getAttribute("src"));
                          console.log(replace_number_of_pages.textContent);
                          console.log(replace_release_date.textContent);
                          console.log(replace_title.textContent);

                    console.groupEnd("variables");

                    console.error(
                      "authorTitle:",
                      authorTitle.value,
                      "replace author",

                      replace_authorId.value,
                    ); */

                    // console.error(
                    //   "categoryTitle:",
                    //   categoryTitle.value,
                    //   "replace category",
                    //   replace_categoryId.value,
                    // );
                  });

                  /* checkbtn event listener */
                  checkEditBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    //////// validator for editForm

                    const editFormValidator = new Validation(
                      editBookForm.querySelectorAll("[data-validation]"),
                    );
                    if (editFormValidator.canValidate) {
                      //   /* swap buttons */
                      editBtn.classList.remove("hidden");
                      checkEditBtn.classList.add("hidden");
                      /* inverse edit button that return back the normal book card */
                      ItemDiv.querySelectorAll(".content-inner").forEach(
                        (item) => item.classList.remove("hidden"),
                      );
                      editBookForm.classList.add("hidden");
                      const editPopup =
                        ItemDiv.querySelector(".editPopup").classList.add(
                          "hidden",
                        );
                      editBookForm.dispatchEvent(new Event("submit"));
                    }
                  });

                  deleteBtn.addEventListener("click", async (e) => {
                    const willDelete = await Swal.fire({
                      title: "Are you sure?",
                      text: "This will delete all associated book comments and notes. Proceed?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",

                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Delete Book!",
                      html: `<div class="text-lg">This will delete all associated book comments and notes. Proceed?</div>`,
                    });

                    if (willDelete.isConfirmed) {
                      const response = await fetch(
                        "backend/controllers/Book.php",
                        {
                          method: "post",
                          body: JSON.stringify({
                            action: "deleteBook",
                            json: {
                              id,
                            },
                          }),
                        },
                      );
                      const data = await response.json();
                      if (data.error) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Something went wrong!",
                        });
                      } else {
                        ItemDiv.remove();
                        Swal.fire(
                          "Deleted!",
                          "Your file has been deleted.",
                          "success",
                        );
                      }
                    }
                  });

                  return ItemDiv;
                };

                const createNewBtn = innerDiv.querySelector("#createNewBtn");

                const authorOptions = innerDiv.querySelector(".options");
                const authorOptionsUl = innerDiv.querySelector(".options ul");
                const authorSelection = innerDiv.querySelector(".selection p");

                const categoryOptions = innerDiv.querySelector(
                  ".selectionCategory .options",
                );
                const categoryOptionsUl = innerDiv.querySelector(
                  ".selectionCategory .options ul",
                );
                const categorySelection = innerDiv.querySelector(
                  ".selectionCategory > p",
                );

                const bookDiv = innerDiv.querySelector("#BookDiv");

                const createNewBook = innerDiv.querySelector("#createNewBook");

                const createBookForm =
                  innerDiv.querySelector("#createBookForm");

                const createBookFormBTN = innerDiv.querySelector(
                  "#createBookForm button",
                );

                createBookFormBTN.addEventListener("click", () => {
                  // createBookForm.classList.toggle("hidden");
                });

                async function renderBookItems() {
                  const response = await fetch("backend/controllers/Book.php", {
                    method: "post",
                    body: JSON.stringify({
                      action: "getAllBooks",
                      json: "",
                    }),
                  });
                  const data = await response.json();
                  if (data.error) {
                    alert("error");
                  } else {
                    data.data.forEach((item) => {
                      const div = createBookDiv(item);

                      bookDiv.append(div);
                    });
                  }
                }
                renderBookItems();

                createBookForm.addEventListener("submit", async (e) => {
                  e.preventDefault();
                  // createBookForm.classList.toggle("hidden");
                  const createBookValidator = new Validation(
                    innerDiv.querySelectorAll("[data-validation]"),
                  );
                  if (createBookValidator.canValidate) {
                    const formData = Object.fromEntries(
                      new FormData(createBookForm),
                    );
                    const response = await fetch(
                      "backend/controllers/Book.php",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          action: "addBook",
                          json: formData,
                        }),
                      },
                    );
                    const data = await response.json();
                    if (data.error) {
                    } else {
                      console.log(data);
                      const newItem = createBookDiv(data);
                      bookDiv.append(newItem);
                    }
                  }
                });

                authorSelection.addEventListener("click", async () => {
                  authorOptionsUl.innerHTML = "";
                  const response = await fetch(
                    "backend/controllers/Authors.php",
                    {
                      method: "post",
                      body: JSON.stringify({
                        action: "getAllAuthors",
                        json: "",
                      }),
                    },
                  );

                  const data = await response.json();

                  data.forEach((item) => {
                    const AuthorItem = elementFromHTML(`
                  <li class="px-1 hover:bg-gray-200 w-full">
                      ${item.first_name}
                      ${item.last_name}
                  <li/>
                  `);

                    authorOptionsUl.append(AuthorItem);
                    AuthorItem.addEventListener("click", (e) => {
                      authorSelection.textContent =
                        item.first_name + " " + item.last_name;
                      const input = innerDiv.querySelector("#authorTitle");

                      input.value = item.id;
                      authorOptions.classList.toggle("hidden");
                    });
                  });

                  authorOptions.classList.toggle("hidden");
                });

                categorySelection.addEventListener("click", async () => {
                  categoryOptionsUl.innerHTML = "";
                  const response = await fetch(
                    "backend/controllers/Category.php",
                    {
                      method: "post",
                      body: JSON.stringify({
                        action: "getAll",
                        json: "",
                      }),
                    },
                  );

                  const data = await response.json();

                  data.forEach((item) => {
                    const categoryItem = elementFromHTML(`
                  <li class="px-1 hover:bg-gray-200 w-full">
                        ${item.title}
                  <li/>
                  `);
                    categoryOptionsUl.append(categoryItem);

                    categoryItem.addEventListener("click", (e) => {
                      categorySelection.textContent = item.title;
                      const input = innerDiv.querySelector("#categoryTitle");
                      input.value = item.id;
                      categoryOptions.classList.toggle("hidden");
                    });
                  });

                  categoryOptions.classList.toggle("hidden");
                });

                createNewBtn.addEventListener("click", () => {
                  createBookForm.classList.toggle("hidden");
                });
                targetDiv.classList.remove("loading");
                targetDiv.append(innerDiv);
              }
              return;

            case "categoryBtn":
              {
                const innerDiv = elementFromHTML(`<div class="w-full">
              <div
                class="flex items-center justify-between px-8 py-2 border-b-2 border-b-black"
              >
                <h1 class="text-xl">Categories</h1>
                <div
                  class="flex items-center cursor-pointer rounded-md bg-blue-500 text-white p-2"
                  id="createNewBtn"
                >
                  <p class="">Create New</p>
                  <iconify-icon
                    icon="gridicons:create"
                    class="ml-1 self-center"
                  ></iconify-icon>
                </div>
              </div>

                <div class="relative">

                <div
                  class="flex addNew hidden -translate-x-1/2 top-2 w-80 left-1/2 absolute z-20 rounded-lg p-2 bg-stone-100  relative"
                  id="createNewAuthorForm"
                >
                  <div
                    class="items-center  mb-4 justify-between w-full rounded-sm text-base "
                  >
                    <form>

                      <div class="">
                        <div class="  hidden"></div>

                        <div class="">
                        <div class="flex items-center justify-between pr-4 mb-2">
                        <label for="newtitle" class="text-gray-500 mb-2 underline underline-offset-1 mr-4" > Category Name: </label >
                              <button class="z-10">
                                  <iconify-icon icon="material-symbols:done" class="peer/edit bg-green-400 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Create New Category" ></iconify-icon>
                              </button>
                        </div>


                        <div class="flex items-center justify-between flex-auto ">
                          <div class=" w-full  -ml-2 bottom-[80%] text-white absolute bg-red-500" ></div>
                          <input type="text" name="newtitle" id="newtitle" class="w-full " />
                        </div>
                       </div>



                      </div>
                    </form>
                  </div>
                </div>

                <div class="categoryDiv p-4 gap-2 flex flex-wrap  border-2 border-gray-600  ">

                </div>

                </div>





            </div>
            `);

                const categoryDiv = innerDiv.querySelector(".categoryDiv");

                const createNewBtn = innerDiv.querySelector("#createNewBtn");

                const createNewForm = innerDiv.querySelector(
                  "#createNewAuthorForm",
                );
                createNewBtn.addEventListener("click", () => {
                  createNewForm.classList.toggle("hidden");
                  categoryDiv.classList.toggle("blur-lg");
                });

                const addForm = innerDiv.querySelector("form");
                /**
                 *  Return a category element that can be deleted and edited
                 * @param {string} title the name of the category item that's also used to identify the db item
                 * @returns {Element} The element thats returned
                 */
                const createcategoryItems = (title) => {
                  const itemDiv = elementFromHTML(`
                <div class="flex  items-center  bg-stone-100 mb-2 p-2 justify-between w-60 rounded-sm text-base flex-auto">

                    <div id="name">
                      <p>${title}</p>
                    </div>

                    <form  class="hidden" id="editForm" >
                        <input 
                        data-validation=""
                        type="text" name="newTitle" id="newTitle">
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

                    editForm.dispatchEvent(new Event("submit"));
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
                  });

                  /*
                Create
                New Category Item Form
                 */
                  editForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const editFormValidator = new Validation(
                      editForm.querySelectorAll("[data-validation]"),
                    );
                    if (editFormValidator.canValidate) {
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
                        itemTitle.firstElementChild.textContent =
                          newTitle.value;
                        itemTitle.classList.remove("hidden");

                        editBtn.classList.remove("hidden");
                        checkEditBtn.classList.add("hidden");
                        editForm.classList.remove("activeEditForm");
                      }
                    }
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
                  const input = addForm.querySelector("#newtitle");
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
                  const errorMessage = input.previousElementSibling;

                  if (data.error) {
                    errorMessage.dataset.tooltip = data.message;
                    errorMessage.classList.remove("hidden");
                  } else {
                    errorMessage.classList.add("hidden");

                    const newItem = createcategoryItems(input.value.trim());
                    createNewForm.classList.toggle("hidden");

                    categoryDiv.classList.toggle("blur-lg");

                    categoryDiv.prepend(newItem);
                    input.value = "";
                  }
                });

                /* render all category items */
                const response = await fetch(
                  "backend/controllers/Category.php",
                  {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                      action: "getAll",
                      json: "",
                    }),
                  },
                );

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
              <div class="flex items-center justify-between px-8 py-2 border-b-2 border-b-black">
                  <h1 class="text-xl ">Authors</h1>
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
                    <div  id="createNewAuthor" class="relative  p-4 space-y-4 [&_input[type='text']]:w-11/12" >
                    <button>
                    <iconify-icon icon="material-symbols:done" class="peer/edit bg-green-400 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Create New Author"></iconify-icon>
                    </button>

                        <div class="">
                          <label for="newFirstName" class="text-gray-500 mb-2 underline underline-offset-1 " >First Name: </label>
                          <br>
                          <input
                          data-validation=""
                          type="text" name="newFirstName" id="newFirstName" class="relative  p-1 rounded-md  fill-emerald-500" data-tooltip="">

                        </div>

                        <div class="">
                        <label for="newLastName" class="text-gray-500 mb-2 underline underline-offset-1 " >Last Name: </label>
                        <br>
                          <input
                          data-validation=""

                           type="text" name="newLastName" id="newLastName" class="relative  p-1 rounded-md  fill-emerald-500" data-tooltip="">
                        </div>

                        <div class="">
                            <label class="text-gray-500 mb-2 underline underline-offset-1 " for="newShortBio">Short Biography:</label>
                            <br>
                            <textarea 
                            data-validation=""
                            name="newShortBio" rows="3" id="newShortBio"  class="relative p-2  rounded-md  fill-emerald-500 w-full" data-tooltip=""></textarea>
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
                  <div class="p-4 min-w-full ">

                      <div id="name" class="">
                        <div class="flex  items-center  justify-between mb-4">
                            <div class="max-w-[200px] break-all flex-initial">
                              <p class="mb-1 text-gray-500">Author:</p>
                              <div class="font-semibold  ">
                                    <span id="FirstName" class="ml-0.5">${first_name}</span>
                                    <span id="LastName" class="ml-0.5">${last_name}</span>
                          <form  class="" id="editForm" >
                                    <input 
                                    data-validation=""
                                    class="hidden" type="text" name="newTitle" id="newFirstName" data-edit="">

                                    <input 
                                    data-validation=""
                                    class="hidden" type="text" name="newTitle" id="newLastName" data-edit="">

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
                        <p id="ShortBio"  class="text-sm  rounded-md   break-all line-clamp-2  peer-checked:h-max group  peer-checked:line-clamp-none whitespace-pre-line">${short_bio}</p>

                        <div class="">
                        <textarea data-validation=""  class="hidden w-full" rows="5" type="text" name="newTitle" id="newShortBio"  data-edit=""></textarea>
                        </div>
                        <div class="mt-4
                        fcl:before:content-['Read_More']
                         peer-checked:fcl:before:content-['Read_Less']">
                            <label for="ch${id}" class="  before:rounded-md before:bg-blue-400 before:p-2 before:text-white"></label>
                        </div>


                        </div>



                  </div>
                  </article>`);

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
                      deleteBtn.classList.add("hidden");
                      //hidden inputs that shoud popup on edit btn
                      const newInputs = [
                        newFirstName,
                        newLastName,
                        newShortBio,
                      ];

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
                      const editValidation = new Validation(
                        itemDiv.querySelectorAll("[data-validation]"),
                      );
                      if (editValidation.canValidate) {
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

                        setTimeout(() => {
                          if (ShortBio.clientHeight === ShortBio.scrollHeight) {
                            console.log(true);
                            readMoreBtn.classList.add("hidden");
                          }
                        }, 1);
                      }
                    });

                    const deleteBtn = itemDiv.querySelector("#deleteBtn");

                    deleteBtn.addEventListener("click", async (e) => {
                      const willDelete = await Swal.fire({
                        title: "Are you sure?",
                        text: "This will delete all associated book comments and notes. Proceed?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",

                        cancelButtonColor: "#d33",
                        confirmButtonText: `Yes, Delete Author!`,
                        html: `<div class="text-lg">${
                          newFirstName.textContent +
                          " " +
                          newLastName.textContent
                        }</div>`,
                      });

                      willDelete;
                      if (willDelete.isConfirmed) {
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

                        const data = await response.json();
                        if (data.error) {
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                          });
                        } else {
                          itemDiv.remove();

                          Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success",
                          );
                        }
                      }
                    });

                    return itemDiv;
                  };

                  /* Create new form item */

                  createAuthorForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const createAuthorValidation = new Validation(
                      createAuthorForm.querySelectorAll("[data-validation]"),
                    );
                    if (createAuthorValidation.canValidate) {
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
                      if (data.error) {
                        const errorMessage =
                          innerDiv.querySelector("#authorError");

                        errorMessage.textContent = data.message;
                        errorMessage.classList.remove("hidden");
                      } else {
                        const { id, first_name, last_name, short_bio } =
                          data.data;
                        const newItem = createAuthorItems(
                          id,
                          first_name,
                          last_name,
                          short_bio,
                        );
                        categoryDiv.prepend(newItem);

                        createAuthorForm.reset();

                        createNewAuthorForm.classList.toggle("hidden");
                        categoryDiv.classList.toggle("blur-lg");
                      }
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
                const innerDiv = elementFromHTML(`<div class="w-full">
              <div
                class="flex items-center justify-between px-8 py-2 border-b-2 border-b-black"
              >
                <h1 class="text-xl">Comments</h1>


              <div class=" flex items-center gap-3">


                <div
                class="flex items-center cursor-pointer rounded-md bg-blue-500 text-white p-2"
                id="renderPendingBtn"
              >
                <p class="">Show Pending</p>
                <iconify-icon
                  icon="gridicons:create"
                  class="ml-1 self-center"
                ></iconify-icon>
              </div>
              <div
                class="flex items-center cursor-pointer rounded-md bg-green-500 text-white p-2"
                id="renderApprovedBtn"
              >
                <p class="">Show Approved</p>
                <iconify-icon
                  icon="gridicons:create"
                  class="ml-1 self-center"
                ></iconify-icon>
              </div>

              <div
                class="flex items-center cursor-pointer rounded-md bg-red-500 text-white p-2"
                id="renderDeclinedBtn"
              >
                <p class="">Show Declined</p>
                <iconify-icon
                  icon="gridicons:create"
                  class="ml-1 self-center"
                ></iconify-icon>
              </div>

            </div>

              </div>




                <div class="relative">

                <div
                  class="flex addNew hidden -translate-x-1/2 top-2 w-80 left-1/2 absolute z-20 rounded-lg p-2 bg-stone-100  relative"
                  id="createNewAuthorForm"
                >
                  <div
                    class="items-center  mb-4 justify-between w-full rounded-sm text-base "
                  >
                    <form>

                      <div class="">
                        <div class="  hidden"></div>

                        <div class="">
                        <div class="flex items-center justify-between pr-4 mb-2">
                        <label for="newtitle" class="text-gray-500 mb-2 underline underline-offset-1 mr-4" > Category Name: </label >
                              <button class="z-10">
                                  <iconify-icon icon="material-symbols:done" class="peer/edit bg-green-400 cursor-pointer relative tooltip rounded-md p-1" data-tooltip="Create New Category" ></iconify-icon>
                              </button>
                        </div>


                        <div class="flex items-center justify-between flex-auto ">
                          <div class=" w-full  -ml-2 bottom-[80%] text-white absolute bg-red-500" ></div>
                          <input type="text" name="newtitle" id="newtitle" class="w-full " />
                        </div>
                       </div>



                      </div>
                    </form>
                  </div>
                </div>

                        <div class="commentsDiv p-4 gap-2 flex justify-center [&_div]:w-11/12    border-2 border-gray-600  ">

                                      <div class="pending border border-yellow-500    flex flex-wrap  justify-start  ">
                                      </div>

                                      <div class="approved border border-green-500    flex flex-wrap  justify-start   ">
                                      </div>

                                      <div class="declined border border-red-500    flex flex-wrap  justify-start  ">
                                      </div>

                        </div>

                      </div>
            </div>
            `);

                function createCommentDiv({
                  body,
                  id,
                  approved,
                  declined,
                  deleted_at,
                  users_id,
                  username,
                }) {
                  const itemDiv = elementFromHTML(`
                <div class="h-30  w-10 flex-[0_0_33%] items-center  mb-2 p-2 justify-between  rounded-sm text-base  hover:ring-violet-200 hover:ring-2">
                <div class="flex items-center justify-between">


                    <div class="flex items-center justify-between gap-2 p-1">
                    <div class=" h-4 rounded-full">
                      <iconify-icon class="text-xl bg-blue-500 " icon="codicon:account"></iconify-icon>
                    </div>
                      <p>By :  <span class="underline underline-offset-2 font-semibold">${username}</span> </p>
                    </div>


                    <div class="buttons ml-2 flex gap-4">
                      <div id="cardApproveBtn">
                        <iconify-icon icon="material-symbols:edit" class="peer/edit bg-red-200 cursor-pointer relative tooltip" data-tooltip="Approve"></iconify-icon>
                      </div>
                      <div id="cardDeclineBtn" class="">
                        <iconify-icon icon="material-symbols:check" class="peer/edit bg-green-200 cursor-pointer relative tooltip" data-tooltip="Decline">eoahutneoahuntoauhtneoau uheotnuhoa uoethanuteoha ueothnautnaoe  uthoeanuhoaent hueotanuhaoe</iconify-icon>
                      </div>

                  </div>

                </div>

                        <form  class="hidden" id="editForm" >
                            <input type="text" name="newTitle" id="newTitle">
                        </form>




                  <div id="name" class="group">
                  <input class="peer hidden" type="checkbox" name="ch" id="ch${id}">
                  <p class="p-2 mb-2 bg-stone-50 line-clamp-2 peer-checked:line-clamp-none font-Source-Sans text-small " id="body">${body}</p>

                  <div class="mb-4
                  fcl:before:content-['Read_More'] peer-checked:fcl:before:content-['Read_Less']">
                        <label id="readBtn" for="ch${id}" class="before:bg-blue-500 before:px-2 before:py-1 text-white before:rounded-lg before:mb-4 "></label>
                    </div>
                  </div>
                </div>`);
                  const commentBody = itemDiv.querySelector("#body");

                  const cardDeclineBtn =
                    itemDiv.querySelector("#cardDeclineBtn");
                  const cardApproveBtn =
                    itemDiv.querySelector("#cardApproveBtn");

                  if (declined != null) {
                    cardDeclineBtn.classList.add("hidden");
                  }
                  if (approved != null) {
                    cardApproveBtn.classList.add("hidden");
                  }
                  /* Post decline Comment  */
                  cardDeclineBtn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const response = await fetch(
                      "backend/controllers/Comments.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "declineComment",
                          json: {
                            id: id,
                          },
                        }),
                      },
                    );
                    const data = await response.json();
                    console.log(data);

                    data.error ? null : itemDiv.remove();
                    cardApproveBtn.classList.remove("hidden");
                    cardDeclineBtn.classList.add("hidden");

                    declinedDiv.prepend(itemDiv);
                  });

                  /* Post accept Comment  */

                  cardApproveBtn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const response = await fetch(
                      "backend/controllers/Comments.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "approveComment",
                          json: {
                            id: id,
                          },
                        }),
                      },
                    );
                    const data = await response.json();

                    console.log(data);
                    if (data.error) {
                    } else {
                      itemDiv.remove();
                      cardApproveBtn.classList.add("hidden");
                      cardDeclineBtn.classList.remove("hidden");
                      approvedDiv.prepend(itemDiv);
                    }
                  });

                  setTimeout(() => {
                    if (commentBody.clientHeight === commentBody.scrollHeight) {
                      const readMoreOrLessBtn = itemDiv
                        .querySelector("#readBtn")
                        .classList.add("invisible");
                    }
                  }, 1);

                  return itemDiv;
                }

                const commentsDiv = innerDiv.querySelector(".commentsDiv");

                const approvedDiv = commentsDiv.querySelector(".approved");
                const declinedDiv = commentsDiv.querySelector(" .declined");

                const pendingfDiv = commentsDiv.querySelector(" .pending");
                const renderPendingBtn =
                  innerDiv.querySelector("#renderPendingBtn");
                const renderApprovedBtn =
                  innerDiv.querySelector("#renderApprovedBtn");
                const renderDeclinedBtn =
                  innerDiv.querySelector("#renderDeclinedBtn");

                async function renderComments() {
                  const response = await fetch(
                    "backend/controllers/Comments.php",
                    {
                      method: "post",
                      body: JSON.stringify({
                        action: "getAll",
                        json: {},
                      }),
                    },
                  );

                  const data = await response.json();
                  console.log(data);

                  /*
                * filter items to corresponding div

                */
                  if (data.error) {
                    return alert("error with the database");
                  } else {
                    data.data.forEach((item) => {
                      switch (true) {
                        case item.approved === null &&
                          item.declined === null &&
                          item.deleted_at == null:
                          {
                            console.log("pending");
                            const element = createCommentDiv(item);
                            pendingfDiv.append(element);
                          }
                          return;
                        case item.approved !== null && item.deleted_at == null:
                          {
                            console.log("approved");
                            const element = createCommentDiv(item);
                            approvedDiv.append(element);
                          }
                          return;
                        case item.declined !== null && item.deleted_at == null:
                          {
                            console.log("declined");
                            const element = createCommentDiv(item);
                            declinedDiv.append(element);
                          }
                          return;
                        default:
                          return;
                      }
                    });
                  }
                }
                renderComments();

                renderPendingBtn.addEventListener("click", () => {
                  [pendingfDiv, approvedDiv, declinedDiv].forEach((item) =>
                    item.classList.add("hidden"),
                  );
                  // pendingfDiv.classList.toggle("blur-lg");
                  pendingfDiv.classList.remove("hidden");
                });

                renderApprovedBtn.addEventListener("click", () => {
                  [pendingfDiv, approvedDiv, declinedDiv].forEach((item) =>
                    item.classList.add("hidden"),
                  );
                  // pendingfDiv.classList.toggle("blur-lg");
                  approvedDiv.classList.remove("hidden");
                });

                renderDeclinedBtn.addEventListener("click", () => {
                  [pendingfDiv, approvedDiv, declinedDiv].forEach((item) =>
                    item.classList.add("hidden"),
                  );
                  // pendingfDiv.classList.toggle("blur-lg");
                  declinedDiv.classList.remove("hidden");
                });
                targetDiv.append(innerDiv);
                renderPendingBtn.dispatchEvent(new Event("click"));
                targetDiv.classList.remove("loading");
              }
              return;

            case "userBtn":
              {
                const innerDiv = elementFromHTML(`<div class="w-full">
              <div
                class="flex items-center justify-between px-8 py-2 border-b-2 border-b-black"
              >
                <h1 class="text-xl">Users:</h1>

              </div>



                <div class="relative">
                        <div class="usersDiv p-4 gap-2 flex items-center     ">
                        <div class=" relative w-80 p-2 " id="userItemsDiv">
                        <input type="hidden" name="user" id="user" value="">
                        <p class="userTitle p-2 text-lg bg-neutral-300 rounded-md">&nbsp;</p>
                          <div class="absolute top-[calc(100% + 1rem)] w-full  bg-stone-50">
                          <ul class="dropdown hidden space-y-1  list-none h-80  overflow-auto">

                          </ul>
                          </div>
                        </div>
                        <div class="flex justify-between items-center cursor-pointer rounded-md bg-emerald-400 text-white p-2" id="makeAdmin">
                <p class="">Make Admin</p>
                <iconify-icon icon=pajamas:admin " class="ml-1 self-center"></iconify-icon>
              </div>
                        </div>

                      </div>
            </div>
            `);
                const userDropdown = innerDiv.querySelector(
                  ".usersDiv .dropdown",
                );

                const userTitle = innerDiv.querySelector(
                  ".usersDiv  .userTitle",
                );
                const userItemsDiv = innerDiv.querySelector("#userItemsDiv");
                const makeAdminBtn = innerDiv.querySelector("#makeAdmin");
                const useridInput = innerDiv.querySelector(".usersDiv #user");

                makeAdminBtn.addEventListener("click", async () => {
                  const id = useridInput.value;

                  e.preventDefault();

                  const makeAdminPopup = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, make it!",
                  });

                  if (makeAdminPopup.isConfirmed) {
                    const response = await fetch(
                      "backend/controllers/User.php",
                      {
                        method: "post",
                        body: JSON.stringify({
                          action: "makeAdmin",
                          json: {
                            id: id,
                          },
                        }),
                      },
                    );
                    const data = await response.json();
                    console.log(data);

                    if (data.error) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                      });
                    } else {
                      //loop through all users in the dropdown and remove the item
                      userDropdown.querySelectorAll("li").forEach((item) => {
                        if (item.querySelector("input").value === id) {
                          item.remove();
                        }
                      });

                      //rename the title elemnt with the text of the next element
                      console.log(userDropdown.firstElementChild != null);
                      if (userDropdown.firstElementChild != null) {
                        useridInput.value =
                          userDropdown.firstElementChild.querySelector(
                            "input",
                          ).value;
                        console.log(useridInput.value);
                        userTitle.textContent =
                          userDropdown.firstElementChild.querySelector(
                            "p",
                          ).textContent;
                      } else {
                        console.log("BADDDDDDD");
                        makeAdminBtn.remove();
                        userTitle.textContent = "All Users Are Admins";
                        useridInput.value = "";
                      }
                      Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: `User ${userTitle.textContent} has been made admin!`,
                      });
                    }
                  }
                });

                userTitle.addEventListener("click", () => {
                  userDropdown.classList.toggle("hidden");
                });

                function createUsersDiv({ username, id }) {
                  const itemDiv = elementFromHTML(`
                  <li class=" w-full items-center  mb-2 p-2 justify-between  rounded-sm text-base  hover:ring-violet-200 hover:ring-2 hover:bg-slate-200">
                  <div class="">
                        <input type="hidden" name="${id}" value="${id}"> 
                      <p>${username}</p>
                      </div></li>
                      `);

                  itemDiv.addEventListener("click", () => {
                    userTitle.textContent = username;
                    useridInput.value = id;
                    userDropdown.classList.toggle("hidden");
                    console.log(useridInput.value);
                  });

                  return itemDiv;
                }

                async function renderUsers() {
                  const response = await fetch("backend/controllers/User.php", {
                    method: "post",
                    body: JSON.stringify({
                      action: "getAll",
                      json: {},
                    }),
                  });

                  const data = await response.json();

                  console.log(data);
                  if (data.error) {
                    return;
                  } else {
                    const userArray = data.data.filter(
                      (item) => item.type === "user",
                    );
                    if (userArray.length === 0) {
                      makeAdminBtn.remove();
                      userTitle.textContent = "All Users Are Admins";
                      userDropdown.remove();
                    } else {
                    }

                    userArray.forEach((item, index) => {
                      index === 0
                        ? ((userTitle.textContent = item.username),
                          (useridInput.value = item.id))
                        : null;

                      const itemDiv = createUsersDiv(item);
                      userDropdown.append(itemDiv);
                    });
                  }
                }
                renderUsers();

                targetDiv.classList.remove("loading");
                targetDiv.append(innerDiv);
              }
              break;
            default:
              return;
          }
        }
      });
      let event = new Event("click");

      tabBtnDiv.dispatchEvent(event);

      this.mainDiv.innerHTML = "";
      this.mainDiv.append(element);
    }
  }
}

export { Render };
