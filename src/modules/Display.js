import { Board } from "./Board.js";

//Display is in charge of displaying content on page
export class Display {
  //For now dummy content
  static init() {
    const content = document.querySelector(".content");
    content.appendChild(document.createTextNode("ToDoLists: "));
    const board = Board.getBoard();
    for (const list of board) {
        content.appendChild(document.createTextNode(list.getTitle()));
    }
  }
}
