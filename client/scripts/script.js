const createDateElement = (item, wrapper) => {
  const dateTimeString = item.created_at;
  const dateTime = new Date(dateTimeString);
  const formattedDateTime = new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'CET',
  }).format(dateTime);

  let creationDate = document.createElement("p");
  creationDate.classList.add("date");
  creationDate.textContent = `Added on ${formattedDateTime}`;
  wrapper.appendChild(creationDate);
};
const createDeleteButton = (item, buttonWrapper) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", "btn");
  deleteButton.textContent = "Delete Idea";
  buttonWrapper.appendChild(deleteButton);
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3000/delete/${item.id}`, { method: "DELETE" });
      console.log(`Item with id ${item.id} was deleted successfully`);
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
    window.location.href = "http://127.0.0.1:5500/client/pages/index.html";
  });
};
const createEditButton = (item, buttonWrapper) => {
  let editButton = document.createElement("button");
  editButton.classList.add("edit", "btn");
  editButton.textContent = "Edit";
  buttonWrapper.appendChild(editButton);
  editButton.addEventListener("click", async (event) => {
    event.preventDefault();
  });
};
const createArticle = (item) => {
  const main = document.querySelector(".main");

  let div = document.createElement("section");
  div.classList.add("idea", "section");
  main.appendChild(div);

  let ideaNo = document.createElement("h3");
  ideaNo.classList.add("ideaNo");
  ideaNo.textContent = `Idea # ${item.id}`;
  div.appendChild(ideaNo);

  let title = document.createElement("h4");
  title.classList.add("title");
  title.textContent = `${item.title}`;
  div.appendChild(title);

  let content = document.createElement("p");
  content.classList.add("content");
  content.textContent = `${item.description}`;
  div.appendChild(content);

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  div.appendChild(wrapper);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("btn-wrapper");
  wrapper.appendChild(buttonWrapper);

  createDateElement(item, wrapper);
  createEditButton(item, buttonWrapper);
  createDeleteButton(item, buttonWrapper);
};

(async () => {
  try {
    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();
    data.forEach(item => {
      createArticle(item);
    });
  }
  catch (error) {
    console.log(`Error: ${err}`);
  }
})();


