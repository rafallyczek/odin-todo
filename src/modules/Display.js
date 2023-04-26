import { Board } from "./Board.js";

export class Display {
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
    newListButton.classList.add("btn-light");
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

    content.appendChild(header);
    content.appendChild(sidebar);
    content.appendChild(main);
  }

  static displayLists() {
    const lists = document.getElementById("lists");
    for (const list of Board.getBoard()) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const text = document.createElement("span");
      text.textContent = list.getTitle();
      const icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-xmark");
      listItem.appendChild(text);
      listItem.appendChild(icon);
      lists.appendChild(listItem);
    }
  }

  static clearLists() {
    const lists = document.getElementById("lists");
    lists.textContent = "";
  }

  static displayListTasks(list) {
    this.clearBoard();

    const boardHeader = document.createElement("h2");
    boardHeader.textContent = list.getTitle();

    const newTaskButton = document.createElement("button");
    newTaskButton.classList.add("btn-dark");
    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    text = document.createTextNode(" Add new task");
    newTaskButton.appendChild(icon);
    newTaskButton.appendChild(text);

    main.appendChild(boardHeader);
    main.appendChild(newTaskButton);
  }

  static clearBoard() {
    const main = document.querySelector("main");
    main.textContent = "";
  }
}
