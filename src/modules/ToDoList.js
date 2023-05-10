import { ToDoTask } from "./ToDoTask.js";

export class ToDoList {
    constructor(title){
        this.title = title;
        this.toDoTasks = [];
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getToDoTask(index){
        return this.toDoTasks[index];
    }

    getToDoTasks(){
        return this.toDoTasks;
    }

    setToDoTasks(toDoTasks){
        this.toDoTasks = toDoTasks;
    }

    addToDoTask(title, description, date){
        this.toDoTasks.push(new ToDoTask(title, description, date));
    }

    deleteToDoTask(index){
        this.toDoTasks.splice(index, 1);
    }
}