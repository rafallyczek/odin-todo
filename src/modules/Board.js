import { ToDoList } from "./ToDoList.js";

//Board contains todo lists
export class Board {

    static board = [];
    static {
        this.board.push(new ToDoList("Main"));
    }

    static getBoard(){
        return this.board;
    }

}