import elementFromHTML from "./helper.js";

const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  Render.LoginPage();
});

class Render {
  static mainDiv = document.querySelector(".mainDiv");

  static homePageBooks() {}
  static LoginPage() {
    const element = elementFromHTML(
      `<div class='h-96 flex justify-center items-center flex-col w-full'>
            <div class="w-80">
                <div class="p-4 bg-violet-500  w-full rounded-t-lg">
                 <h2 class="text-xl text-white p-2 ">Login</h2>
                </div>
                <div class="shadow-md p-4 bg-neutral-100">
                    <form class="flex flex-col gap-4" >
                    <input required type="text" placeholder="Username"  class="rounded-full p-2 hover:ring-1 ring-purple-400"/>
                    <input required type="text" placeholder="Password"  class="rounded-full p-2 hover:ring-1 ring-purple-400" />
                    <button   class="bg-violet-500  rounded-full text-center hover:bg-violet-600 text-white text-lg">Submit</button>
                    </form>
                </div>
            </div>
      </div> 
      `,
    );
    element
      .querySelector("form")
      .addEventListener("submit", async function (e) {
        const formData = new FormData(e.currentTarget);

        e.preventDefault();
        const response = await fetch("../../2/backend/User/User.php", {
          //   headers: "Content-type:application/json",
          // body: formData,
          method: "post",
          //   body: JSON.stringify({
          //     play: "uhhuha",
          //   }),
        });

        const data = await response.json();
        console.log(data);
      });
    this.mainDiv.append(element);
  }
}

class Login {
  login;

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
