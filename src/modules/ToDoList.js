import { ToDoTaks} from "./ToDoTask.js";

//ToDoList contains tasks to do
export class ToDoList {
    constructor(title){
        this.title = title;
        this.toDoItems = [];
    }

    getTitle(){
        return this.title;
    }
}