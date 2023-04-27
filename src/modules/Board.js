import { ToDoList } from "./ToDoList.js";

//Board contains todo lists
export class Board {
  static board = [];
  static {
    this.board.push(new ToDoList("Main list"));
  }

  static getBoard() {
    return this.board;
  }

  static getList(index){
    return this.board[index];
  }

  static deleteList(index){
    this.board.splice(index, 1);
  }
}
