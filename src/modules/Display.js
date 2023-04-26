import { Board } from "./Board.js";

export class Display {

  static init() {
    this.displayPage();
    this.displayLists();
  }

  static displayPage(){
    const content = document.querySelector(".content");

    const header = document.createElement("header");
    header.classList.add("bgc-dark");

    const pageTitle = document.createElement("h1");
    pageTitle.textContent = "ToDo Notes";

    header.appendChild(pageTitle);

    const sidebar = document.createElement("aside");
    sidebar.classList.add("bgc-primary");

    const listsContainer = document.createElement("section");
    const listsHeader = document.createElement("h2");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-list");
    let text = document.createTextNode(" Lists");
    listsHeader.appendChild(icon);
    listsHeader.appendChild(text);
    const lists = document.createElement("ul");
    lists.id = "lists";

    listsContainer.appendChild(listsHeader);
    listsContainer.appendChild(lists);

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

    const main = document.createElement("main");
    main.classList.add("bgc-light");
    main.classList.add("text-clr-dark");
    main.textContent = "This is main board";

    content.appendChild(header);
    content.appendChild(sidebar);
    content.appendChild(main);
  }

  static displayLists(){
    const lists = document.getElementById("lists");
    for(const list of Board.getBoard()){
      const listItem = document.createElement("li");
      listItem.textContent = list.getTitle();
      lists.appendChild(listItem);
    }
  }
}
