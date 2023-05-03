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
      deleteTaskButton.classList.add("btn");
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

    const newTaskForm = document.createElement("div");
    newTaskForm.classList.add("form");
    newTaskForm.id = "new-task-form";
    const titleField = document.createElement("input");
    titleField.type = "text";
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "new-task-cancel";
    cancelButton.textContent = "Cancel";
    const addButton = document.createElement("button");
    addButton.classList.add("submit-btn");
    addButton.classList.add("text-clr-light");
    addButton.id = "new-task-add";
    addButton.textContent = "Add";

    newTaskForm.appendChild(titleField);
    newTaskForm.appendChild(cancelButton);
    newTaskForm.appendChild(addButton);

    main.appendChild(boardHeader);
    main.appendChild(tasks);
    main.appendChild(newTaskButton);
    main.appendChild(newTaskForm);

    //Add avent listeners to task's elements
    this.attachNewTaskButtonEventListener();
    this.attachNewTaskCancelEventListener();
    this.attachNewTaskAddEventListener();
    this.attachTasksEventListeners();
  }

  //Content clearing functions

  //Clear lists in sidebar
  static clearLists() {
    const lists = document.getElementById("lists");
    lists.textContent = "";
  }

  //Clear main
  static clearMain() {
    const main = document.querySelector("main");
    main.textContent = "";
  }

  //Attaching event listeners

  //Display new list form when Add new list button is clicked
  static attachNewListButtonEventListener() {
    const newListButton = document.getElementById("new-list-btn");
    newListButton.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListButton = document.getElementById("new-list-btn");
      newListButton.style.display = "none";
      newListForm.style.display = "grid";
    });
  }

  //Hide and reset new list form
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

  //Add new list and hide form
  static attachNewListAddEventListener() {
    const newListAdd = document.getElementById("new-list-add");
    newListAdd.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListInput = newListForm.firstElementChild;
      const newListButton = document.getElementById("new-list-btn");
      if (newListInput.value.trim() !== "") {
        Board.addList(newListInput.value);
        newListForm.style.display = "none";
        newListButton.style.display = "block";
        this.clearLists();
        this.displayLists();
      }
      newListInput.value = "";
    });
  }

  //Display new task form when Add new ltask button is clicked
  static attachNewTaskButtonEventListener() {
    const newTaskButton = document.getElementById("new-task-btn");
    newTaskButton.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskButton = document.getElementById("new-task-btn");
      newTaskButton.style.display = "none";
      newTaskForm.style.display = "grid";
    });
  }

  //Hide and reset new task form
  static attachNewTaskCancelEventListener() {
    const newTaskCancel = document.getElementById("new-task-cancel");
    newTaskCancel.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskInput = newTaskForm.firstElementChild;
      const newTaskButton = document.getElementById("new-task-btn");
      newTaskForm.style.display = "none";
      newTaskInput.value = "";
      newTaskButton.style.display = "block";
    });
  }

  //Add new task and hide form
  static attachNewTaskAddEventListener() {
    const newTaskAdd = document.getElementById("new-task-add");
    newTaskAdd.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskInput = newTaskForm.firstElementChild;
      const newTaskButton = document.getElementById("new-task-btn");
      if (newTaskInput.value.trim() !== "") {
        const main = document.querySelector("main");
        const listIndex = Number(
          main.getAttribute("data-displayed-list-index")
        );
        Board.getList(listIndex).addToDoTask(newTaskInput.value, "default");
        newTaskForm.style.display = "none";
        newTaskButton.style.display = "block";
        this.clearMain();
        this.displayMain(listIndex);
      }
      newTaskInput.value = "";
    });
  }

  //Display list in main or delete list when button is clicked
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

  //Delete task when button is clicked
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

  //Handling display after deleting or choosing elements

  //Display list details in main
  static displayList(listIndex) {
    this.clearMain();
    this.displayMain(listIndex);
  }

  //Handle list deletion
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

  //Handle task deletion
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
