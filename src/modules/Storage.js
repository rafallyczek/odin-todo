import { Board } from "./Board.js";
import { ToDoList } from "./ToDoList.js";
import { ToDoTask } from "./ToDoTask.js";

export class Storage {
  static save() {
    localStorage.setItem("board", JSON.stringify(Board.getBoard()));
  }

  static load() {
    const loadedLists = JSON.parse(localStorage.getItem("board"));
    const board = [];
    loadedLists.forEach((list) => {
      const toDoList = Object.assign(new ToDoList(), list);
      const loadedTasks = toDoList.getToDoTasks();
      const tasks = [];
      loadedTasks.forEach((task) =>
        tasks.push(Object.assign(new ToDoTask(), task))
      );
      toDoList.setToDoTasks(tasks);
      board.push(toDoList);
    });
    return board;
  }

  static isEmpty() {
    if (localStorage.getItem("board") == null) {
      return true;
    }
    return false;
  }
}
