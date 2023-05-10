import { ToDoList } from "./ToDoList.js";
import { Storage } from "./Storage.js";

//Board contains todo lists
export class Board {
  static board = [];
  static {
    this.board.push(new ToDoList("Main list"));
    if(Storage.isEmpty()){
      Storage.save(this.board);
    }else{
      this.setBoard(Storage.load());
    }
  }

  static getBoard() {
    return this.board;
  }

  static setBoard(board){
    this.board = board;
  }

  static getList(index){
    return this.board[index];
  }

  static addList(title){
    this.board.push(new ToDoList(title));
  }

  static editList(index, title){
    this.getList(index).setTitle(title);
  }

  static deleteList(index){
    //Main list cannot be deleted
    if(index!==0){
      this.board.splice(index, 1);
    }
  }
}
