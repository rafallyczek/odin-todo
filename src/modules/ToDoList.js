import { ToDoTask } from "./ToDoTask.js";

export class ToDoList {
    constructor(title){
        this.title = title;
        this.toDoTasks = [];
        this.toDoTasks.push(new ToDoTask("Test 1", "Desc"));
        this.toDoTasks.push(new ToDoTask("Test 2", "Desc"));
    }

    getTitle(){
        return this.title;
    }

    getToDoTasks(){
        return this.toDoTasks;
    }

    deleteToDoTask(index){
        this.toDoTasks.splice(index, 1);
    }
}