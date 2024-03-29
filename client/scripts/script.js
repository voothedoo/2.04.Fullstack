const allIdeasHere = document.querySelector(".allIdeasHere");
const main = document.querySelector(".main");
const host = "https://brilliantminds1-52eg515h.b4a.run";

const createConfirmationModal = (item) => {
  const confirmForm = document.createElement("div");
  confirmForm.classList.add("confirmForm");
  main.appendChild(confirmForm);

  const confirmationModal = document.createElement("h2");
  confirmationModal.textContent = "Are you sure you want to delete this idea?";
  confirmationModal.classList.add("confirmModal");
  confirmForm.appendChild(confirmationModal);

  const deleteCancelWrapper = document.createElement("div");
  deleteCancelWrapper.classList.add("deleteCancelWrapper");
  confirmForm.appendChild(deleteCancelWrapper);

  const deleteModal = document.createElement("button");
  deleteModal.textContent = "Delete";
  deleteModal.classList.add("deleteModal");
  deleteCancelWrapper.appendChild(deleteModal);
  deleteModal.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await fetch(`${host}/delete/${item.id}`, { method: "DELETE" });
      console.log(`Item with id ${item.id} was deleted successfully`);
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
    window.location.href = "https://brilliant-minds-site-alex.netlify.app/";
  });


  const cancelModal = document.createElement("button");
  cancelModal.textContent = "Cancel";
  cancelModal.classList.add("cancelModal");
  deleteCancelWrapper.appendChild(cancelModal);
  cancelModal.addEventListener("click", (event) => {
    event.preventDefault();
    confirmForm.hidden = true;
    allIdeasHere.hidden = false;
  });
};

const createDateElement = (item, wrapper) => {
  if (item.created_at === item.updated_at) {
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

  } else {
    const dateTimeString = item.updated_at;
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
    creationDate.textContent = `Last edited on ${formattedDateTime}`;
    wrapper.appendChild(creationDate);
  }

};
const createDeleteButton = (item, buttonWrapper) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", "btn");
  deleteButton.textContent = "Delete Idea";
  buttonWrapper.appendChild(deleteButton);
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    createConfirmationModal(item);
    allIdeasHere.hidden = true;
  });
};
const createEditButton = (item, buttonWrapper) => {
  let editButton = document.createElement("button");
  editButton.classList.add("edit", "btn");
  editButton.textContent = "Edit";
  buttonWrapper.appendChild(editButton);
  editButton.addEventListener("click", async (event) => {
    let div = document.querySelector(`.no${item.id}`);
    let title = document.querySelector(`.label${item.id}`);
    let content = document.querySelector(`.description${item.id}`);
    let wrapper = document.querySelector(`.cover${item.id}`);
    event.preventDefault();
    if (editButton.textContent === "Edit") {
      div.removeChild(title);
      div.removeChild(content);
      const inputContent = document.createElement("textarea");
      inputContent.required = true;
      inputContent.classList.add(`tempContent${item.id}`);
      inputContent.value = content.textContent;
      div.insertBefore(inputContent, wrapper);
      const inputTitle = document.createElement("input");
      inputTitle.required = true;
      inputTitle.classList.add(`tempTitle${item.id}`);
      inputTitle.value = title.textContent;
      div.insertBefore(inputTitle, inputContent);
      editButton.textContent = "Save";
    } else if (editButton.textContent === "Save") {
      const id = item.id;
      const title = div.children[1];
      const content = div.children[2];
      try {
        await fetch(`${host}/edit`, {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            title: title.value,
            description: content.value,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        });
        window.location.href = "https://brilliant-minds-site-alex.netlify.app/";
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  });
};

const createArticle = (item) => {
  let div = document.createElement("section");
  div.classList.add(`no${item.id}`, "idea", "section");
  allIdeasHere.prepend(div);

  let ideaNo = document.createElement("h3");
  ideaNo.classList.add(`tought${item.id}`, "ideaNo");
  ideaNo.textContent = `Idea # ${item.id}`;
  div.appendChild(ideaNo);

  let title = document.createElement("h4");
  title.classList.add(`label${item.id}`, "title");
  title.textContent = `${item.title}`;
  div.appendChild(title);

  let content = document.createElement("p");
  content.classList.add(`description${item.id}`, "content");
  content.textContent = `${item.description}`;
  div.appendChild(content);

  const wrapper = document.createElement("div");
  wrapper.classList.add(`cover${item.id}`, "wrapper");
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
    const response = await fetch(`${host}`);
    const data = await response.json();
    data.forEach(item => {
      createArticle(item);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();


