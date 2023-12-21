const title = document.querySelector("#title");
const content = document.querySelector("#content");
const addButton = document.querySelector("#addButton");
const host = "https://brilliantminds1-52eg515h.b4a.run";

addButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (title.value.trim() === "" || content.value.trim() === "") {
    console.log("Error: Title or Content is empty");
    return;
  }
  try {
    await fetch(`${host}/create`, {
      method: "POST",
      body: JSON.stringify({
        title: title.value.trim(),
        description: content.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
    window.location.href = "https://brilliant-minds-site-alex.netlify.app/pages/";
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});