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
    newListButton.classList.add("text-hoverable-light");
    newListButton.id = "new-list-btn";

    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    text = document.createTextNode(" Add new list");

    newListButton.appendChild(icon);
    newListButton.appendChild(text);

    listsContainer.appendChild(listsHeader);
    listsContainer.appendChild(lists);
    listsContainer.appendChild(newListButton);

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

    //Add avent listener to new list button
    this.attachNewListButtonEventListener();
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

    const newTaskButton = document.createElement("button");
    newTaskButton.classList.add("btn-dark");
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
      console.log("newListButton clicked!");
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
      list.firstElementChild.addEventListener("click", () => {
        const listIndex = Number(
          document.getElementById(`list${i}`).getAttribute("id").slice(-1)
        );
        console.log(listIndex);
        this.clearMain();
        this.displayMain(listIndex);
      });
      //Main list cannot be deleted
      if (i !== 0) {
        list.lastElementChild.addEventListener("click", () => {
          const listIndex = Number(
            document.getElementById(`list${i}`).getAttribute("id").slice(-1)
          );
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
        });
      }
    }
  }
}
