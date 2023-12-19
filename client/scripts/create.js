const title = document.querySelector("#title");
const content = document.querySelector("#content");
const addButton = document.querySelector("#addButton");

addButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (title.value.trim() === "" || content.value.trim() === "") {
    console.log("Error: Title or Content is empty");
    return;
  }
  try {
    await fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify({
        title: title.value.trim(),
        description: content.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
    window.location.href = "http://127.0.0.1:5500/client/pages/index.html";
  } catch (err) {
    console.log(`Error: ${err}`);
  }

});