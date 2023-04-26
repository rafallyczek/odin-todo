import { Board } from "./Board.js";

export class Display {

  static init() {
    this.displayPage();
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

    const lists = document.createElement("section");
    lists.textContent = "This section will contain lists";

    const footer = document.createElement("footer");

    const authorInfo = document.createElement("p");
    const github = document.createElement("a");
    github.textContent = "rafallyczek";
    github.href = "https://github.com/rafallyczek";
    const text = document.createTextNode(" © 2023");

    authorInfo.appendChild(github);
    authorInfo.appendChild(text);

    footer.appendChild(authorInfo);

    sidebar.appendChild(lists);
    sidebar.appendChild(footer);

    const main = document.createElement("main");
    main.classList.add("bgc-light");
    main.classList.add("text-clr-dark");
    main.textContent = "This is main board";

    content.appendChild(header);
    content.appendChild(sidebar);
    content.appendChild(main);
  }
}
