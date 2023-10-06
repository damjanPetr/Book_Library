require("dotenv").config();

test("should get all Authors", async () => {
  console.log(process.env.ENV);
  const response = await fetch(
    process.env.ENV + "backend/controllers/Authors.php",
    {
      method: "post",
      body: JSON.stringify({
        action: "getAllAuthors",
        json: "",
      }),
    },
  );

  const data = await response.json();

  expect(data.error).toBeUndefined();
  expect.assertions(1);
});
