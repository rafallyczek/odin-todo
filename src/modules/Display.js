import { Board } from "./Board.js";

export class Display {
  static NO_DISPLAYED_LIST = -1;

  static init() {
    this.displayPage();
    this.displayLists();
  }

  static displayPage() {
    const content = document.querySelector(".content");

    //Header
    const header = document.createElement("header");
    header.classList.add("bgc-dark");

    const pageTitle = document.createElement("h1");

    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-list-check");

    let text = document.createTextNode(" ToDo Notes");

    pageTitle.appendChild(icon);
    pageTitle.appendChild(text);

    header.appendChild(pageTitle);

    //Sidebar
    const sidebar = document.createElement("aside");
    sidebar.classList.add("bgc-primary");

    //List of todo lists
    const listsContainer = document.createElement("section");

    const listsHeader = document.createElement("h2");

    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-list");
    text = document.createTextNode(" Lists");

    listsHeader.appendChild(icon);
    listsHeader.appendChild(text);

    const lists = document.createElement("ul");
    lists.id = "lists";

    const newListButton = document.createElement("button");
    newListButton.classList.add("btn");
    newListButton.classList.add("text-hoverable-light");
    newListButton.id = "new-list-btn";

    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    text = document.createTextNode(" Add new list");

    newListButton.appendChild(icon);
    newListButton.appendChild(text);

    const newListForm = document.createElement("div");
    newListForm.classList.add("form");
    newListForm.id = "new-list-form";
    const titleField = document.createElement("input");
    titleField.type = "text";
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "new-list-cancel";
    cancelButton.textContent = "Cancel";
    const addButton = document.createElement("button");
    addButton.classList.add("submit-btn");
    addButton.classList.add("text-clr-light");
    addButton.id = "new-list-add";
    addButton.textContent = "Add";

    newListForm.appendChild(titleField);
    newListForm.appendChild(cancelButton);
    newListForm.appendChild(addButton);

    listsContainer.appendChild(listsHeader);
    listsContainer.appendChild(lists);
    listsContainer.appendChild(newListButton);
    listsContainer.appendChild(newListForm);

    //Footer
    const footer = document.createElement("footer");

    const authorInfo = document.createElement("p");
    const github = document.createElement("a");
    github.classList.add("text-hoverable-light");
    github.textContent = "rafallyczek";
    github.href = "https://github.com/rafallyczek";
    github.target = "_blank";
    text = document.createTextNode(" © 2023");

    authorInfo.appendChild(github);
    authorInfo.appendChild(text);

    footer.appendChild(authorInfo);

    sidebar.appendChild(listsContainer);
    sidebar.appendChild(footer);

    //Main
    const main = document.createElement("main");
    main.classList.add("bgc-light");
    main.classList.add("text-clr-dark");
    main.textContent = "Choose list to see tasks.";
    main.setAttribute("data-displayed-list-index", this.NO_DISPLAYED_LIST);

    content.appendChild(header);
    content.appendChild(sidebar);
    content.appendChild(main);

    //Add avent listeners
    this.attachNewListButtonEventListener();
    this.attachNewListCancelEventListener();
    this.attachNewListAddEventListener();
  }

  static displayLists() {
    const lists = document.getElementById("lists");
    for (const [index, list] of Board.getBoard().entries()) {
      //ToDoList
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.classList.add("text-hoverable-light");
      listItem.id = `list${index}`;

      const listTitle = document.createElement("span");
      listTitle.textContent = list.getTitle();

      listItem.appendChild(listTitle);

      //Main list cannot be deleted
      if (index !== 0) {
        const deleteListButton = document.createElement("button");
        deleteListButton.classList.add("btn");
        deleteListButton.classList.add("text-hoverable-light");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-xmark");

        deleteListButton.appendChild(icon);

        listItem.appendChild(deleteListButton);
      }

      lists.appendChild(listItem);
    }

    //Add avent listeners to list's elements
    this.attachListsEventListeners();
  }

  static displayMain(listIndex) {
    const list = Board.getList(listIndex);
    const main = document.querySelector("main");
    main.setAttribute("data-displayed-list-index", listIndex);

    const boardHeader = document.createElement("h2");
    boardHeader.textContent = list.getTitle();

    const tasks = document.createElement("ul");
    tasks.id = "tasks";

    for (const [index, todotask] of Board.getList(listIndex)
      .getToDoTasks()
      .entries()) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.classList.add("text-hoverable-dark");
      listItem.id = `to-do-task${index}`;

      const taskTitle = document.createElement("span");
      taskTitle.textContent = todotask.getTitle();

      listItem.appendChild(taskTitle);

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("text-hoverable-dark");

      const icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-xmark");

      deleteTaskButton.appendChild(icon);

      listItem.appendChild(deleteTaskButton);

      tasks.appendChild(listItem);
    }

    const newTaskButton = document.createElement("button");
    newTaskButton.classList.add("btn");
    newTaskButton.classList.add("text-hoverable-dark");
    newTaskButton.id = "new-task-btn";
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    const text = document.createTextNode(" Add new task");
    newTaskButton.appendChild(icon);
    newTaskButton.appendChild(text);

    main.appendChild(boardHeader);
    main.appendChild(tasks);
    main.appendChild(newTaskButton);

    //Add avent listener to new task button
    this.attachNewTaskButtonEventListener();
    this.attachTasksEventListeners();
  }

  static clearLists() {
    const lists = document.getElementById("lists");
    lists.textContent = "";
  }

  static clearMain() {
    const main = document.querySelector("main");
    main.textContent = "";
  }

  static attachNewListButtonEventListener() {
    const newListButton = document.getElementById("new-list-btn");
    newListButton.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListButton = document.getElementById("new-list-btn");
      newListButton.style.display = "none";
      newListForm.style.display = "grid";
    });
  }

  static attachNewListCancelEventListener() {
    const newListCancel = document.getElementById("new-list-cancel");
    newListCancel.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListInput = newListForm.firstElementChild;
      const newListButton = document.getElementById("new-list-btn");
      newListForm.style.display = "none";
      newListInput.value = "";
      newListButton.style.display = "block";
    });
  }

  static attachNewListAddEventListener() {
    const newListAdd = document.getElementById("new-list-add");
    newListAdd.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListInput = newListForm.firstElementChild;
      const newListButton = document.getElementById("new-list-btn");
      if (newListInput.value.trim() !== "") {
        Board.addList(newListInput.value);
        newListForm.style.display = "none";
        newListInput.value = "";
        newListButton.style.display = "block";
        this.clearLists();
        this.displayLists();
      } else {
        newListInput.value = "";
      }
    });
  }

  static attachNewTaskButtonEventListener() {
    const newTaskButton = document.getElementById("new-task-btn");
    newTaskButton.addEventListener("click", () => {
      console.log("newTaskButton clicked!");
    });
  }

  static attachListsEventListeners() {
    const lists = document.getElementById("lists").children;
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const listIndex = Number(
        document.getElementById(`list${i}`).getAttribute("id").slice(-1)
      );
      list.firstElementChild.addEventListener("click", () => {
        this.displayList(listIndex);
      });
      //Main list cannot be deleted
      if (i !== 0) {
        list.lastElementChild.addEventListener("click", () => {
          this.deleteList(listIndex);
        });
      }
    }
  }

  static displayList(listIndex) {
    this.clearMain();
    this.displayMain(listIndex);
  }

  static deleteList(listIndex) {
    Board.deleteList(listIndex);
    this.clearLists();
    this.displayLists();
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    //If currently displayed list is deleted clear main
    if (displayedListIndex === listIndex) {
      this.clearMain();
      main.textContent = "Choose list to see tasks.";
    }
  }

  static attachTasksEventListeners() {
    const tasks = document.getElementById("tasks").children;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const taskIndex = Number(
        document.getElementById(`to-do-task${i}`).getAttribute("id").slice(-1)
      );
      task.lastElementChild.addEventListener("click", () => {
        this.deleteTask(taskIndex);
      });
    }
  }

  static deleteTask(taskIndex) {
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    Board.getList(displayedListIndex).deleteToDoTask(taskIndex);
    this.clearMain();
    this.displayMain(displayedListIndex);
  }
}
