import { ToDoTask } from "./ToDoTask.js";

export class ToDoList {
    constructor(title){
        this.title = title;
        this.toDoTasks = [];
    }

    getTitle(){
        return this.title;
    }

    getToDoTasks(){
        return this.toDoTasks;
    }

    addToDoTask(title, description){
        this.toDoTasks.push(new ToDoTask(title, description));
    }

    deleteToDoTask(index){
        this.toDoTasks.splice(index, 1);
    }
}