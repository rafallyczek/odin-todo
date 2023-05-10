import { ToDoList } from "./ToDoList.js";
import { Storage } from "./Storage.js";

//Board contains todo lists
export class Board {
  static board = [];

  static init(){
    if (Storage.isEmpty()) {
      this.board.push(new ToDoList("Main list"));
      Storage.save();
    } else {
      this.board = Storage.load();
    }
  }

  static getBoard() {
    return this.board;
  }

  static getList(index) {
    return this.board[index];
  }

  static addList(title) {
    this.board.push(new ToDoList(title));
    Storage.save();
  }

  static editList(index, title) {
    this.getList(index).setTitle(title);
    Storage.save();
  }

  static deleteList(index) {
    //Main list cannot be deleted
    if (index !== 0) {
      this.board.splice(index, 1);
      Storage.save();
    }
  }
}
