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

    addToDoTask(title, description, date){
        this.toDoTasks.push(new ToDoTask(title, description, date));
    }

    deleteToDoTask(index){
        this.toDoTasks.splice(index, 1);
    }
}