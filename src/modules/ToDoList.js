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

    editToDoTask(index, title, description, date){
        this.getToDoTask(index).setTitle(title);
        this.getToDoTask(index).setDescription(description);
        this.getToDoTask(index).setDate(date);
    }

    deleteToDoTask(index){
        this.toDoTasks.splice(index, 1);
    }
}