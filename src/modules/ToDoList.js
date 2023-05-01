import { ToDoTask } from "./ToDoTask.js";

export class ToDoList {
    constructor(title){
        this.title = title;
        this.toDoItems = [];
    }

    getTitle(){
        return this.title;
    }

    deleteToDoTask(index){
        this.toDoItems.splice(index, 1);
    }
}