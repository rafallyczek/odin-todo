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
    //Main list cannot be deleted
    if(index!==0){
      this.board.splice(index, 1);
    }
  }
}
