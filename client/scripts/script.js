const createArticle = (item) => {
  const main = document.querySelector(".main");

  let div = document.createElement("section");
  div.classList.add("idea", "section");
  main.appendChild(div);

  let title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = `Idea #${item.id}: ${item.title}`;
  div.appendChild(title);

  let content = document.createElement("p");
  content.classList.add("content");
  content.textContent = `${item.description}`;
  div.appendChild(content);

  const dateTimeString = item.created_at;
  const dateTime = new Date(dateTimeString);
  const formattedDateTime = new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC', // Specify the time zone if needed
  }).format(dateTime);

  let creationDate = document.createElement("p");
  creationDate.classList.add("date");
  creationDate.textContent = `Added on ${formattedDateTime}`;
  div.appendChild(creationDate);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", `button-${item.id}`, "btn");
  deleteButton.textContent = "Delete Idea";
  div.appendChild(deleteButton);
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

(async () => {
  try {
    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();
    data.forEach(item => {
      createArticle(item);
    });
  }
  catch (error) {
    console.log(error);
  }
})();


