import { Board } from "./Board.js";
import { format, parseISO } from "date-fns";

export class Display {
  static NO_DISPLAYED_LIST = -1;

  static init() {
    this.displayPage();
    this.displayLists();
  }

  static displayPage() {
    const content = document.querySelector(".content");

    //Header
    const header = document.createElement("header");
    header.classList.add("bgc-dark");

    const pageTitle = document.createElement("h1");

    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-note-sticky");

    let text = document.createTextNode(" ToDo Notes");

    pageTitle.appendChild(icon);
    pageTitle.appendChild(text);

    header.appendChild(pageTitle);

    //Sidebar
    const sidebar = document.createElement("aside");
    sidebar.classList.add("bgc-primary");

    //Section containing lists
    const listsContainer = document.createElement("section");

    //Title
    const listsHeader = document.createElement("h2");

    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-list");
    text = document.createTextNode(" Lists");

    listsHeader.appendChild(icon);
    listsHeader.appendChild(text);

    //List of todo lists
    const lists = document.createElement("ul");
    lists.id = "lists";

    //Button which show new list form
    const newListButton = document.createElement("button");
    newListButton.classList.add("btn");
    newListButton.classList.add("text-hoverable-light");
    newListButton.id = "new-list-btn";

    icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    text = document.createTextNode(" Add new list");

    newListButton.appendChild(icon);
    newListButton.appendChild(text);

    //New list form
    const newListForm = document.createElement("div");
    newListForm.classList.add("form");
    newListForm.id = "new-list-form";

    let formTitle = document.createElement("h3");
    formTitle.textContent = "Add list";
    newListForm.appendChild(formTitle);

    //New list's title input
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "list-title";
    let titleField = document.createElement("input");
    titleField.id = "list-title";
    titleField.type = "text";
    inputGroup.appendChild(titleLabel);
    inputGroup.appendChild(titleField);

    //Button which hides new list form
    let cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "new-list-cancel";
    cancelButton.textContent = "Cancel";
    const addButton = document.createElement("button");
    addButton.classList.add("submit-btn");
    addButton.classList.add("text-clr-light");
    addButton.id = "new-list-add";
    addButton.textContent = "Add";

    newListForm.appendChild(inputGroup);
    newListForm.appendChild(cancelButton);
    newListForm.appendChild(addButton);

    //Edit list form
    const editListForm = document.createElement("dialog");
    editListForm.id = "edit-list-form";

    const editListContent = document.createElement("div");
    editListContent.classList.add("form");

    formTitle = document.createElement("h3");
    formTitle.textContent = "Edit list";
    editListContent.appendChild(formTitle);

    //Edit list's title input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "edit-list-title";
    titleField = document.createElement("input");
    titleField.id = "edit-list-title";
    titleField.type = "text";
    inputGroup.appendChild(titleLabel);
    inputGroup.appendChild(titleField);

    //Button which hides edit list form
    cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "edit-list-cancel";
    cancelButton.textContent = "Cancel";
    const saveButton = document.createElement("button");
    saveButton.classList.add("submit-btn");
    saveButton.classList.add("text-clr-light");
    saveButton.id = "edit-list-save";
    saveButton.textContent = "Save";

    editListContent.appendChild(inputGroup);
    editListContent.appendChild(cancelButton);
    editListContent.appendChild(saveButton);

    editListForm.appendChild(editListContent);

    listsContainer.appendChild(listsHeader);
    listsContainer.appendChild(lists);
    listsContainer.appendChild(newListButton);
    listsContainer.appendChild(newListForm);
    listsContainer.appendChild(editListForm);

    //Footer
    const footer = document.createElement("footer");

    const authorInfo = document.createElement("p");
    const github = document.createElement("a");
    github.classList.add("text-hoverable-light");
    github.textContent = "rafallyczek";
    github.href = "https://github.com/rafallyczek";
    github.target = "_blank";
    text = document.createTextNode(" © 2023");

    authorInfo.appendChild(github);
    authorInfo.appendChild(text);

    footer.appendChild(authorInfo);

    sidebar.appendChild(listsContainer);
    sidebar.appendChild(footer);

    //Main
    const main = document.createElement("main");
    main.classList.add("bgc-light");
    main.classList.add("text-clr-dark");
    main.textContent = "Choose list to see tasks.";
    main.setAttribute("data-displayed-list-index", this.NO_DISPLAYED_LIST);

    content.appendChild(header);
    content.appendChild(sidebar);
    content.appendChild(main);

    //Add avent listeners
    this.attachNewListButtonEventListener();
    this.attachNewListCancelEventListener();
    this.attachNewListAddEventListener();
    this.attachEditListCancelEventListener();
    this.attachEditListSaveEventListener();
  }

  static displayLists() {
    const lists = document.getElementById("lists");
    for (const [index, list] of Board.getBoard().entries()) {
      //ToDoList
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.classList.add("text-hoverable-light");
      listItem.id = `list${index}`;

      const listTitle = document.createElement("span");
      listTitle.textContent = list.getTitle();

      listItem.appendChild(listTitle);

      //Main list cannot be deleted nor edited
      if (index !== 0) {
        const editListButton = document.createElement("button");
        editListButton.classList.add("btn");
        editListButton.classList.add("text-hoverable-light");
        editListButton.title = "Edit list";

        const deleteListButton = document.createElement("button");
        deleteListButton.classList.add("btn");
        deleteListButton.classList.add("text-hoverable-light");
        deleteListButton.title = "Delete list";

        let icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-xmark");

        deleteListButton.appendChild(icon);

        icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-pen");
        icon.classList.add("fa-sm");

        editListButton.appendChild(icon);

        listItem.appendChild(editListButton);
        listItem.appendChild(deleteListButton);
      }

      lists.appendChild(listItem);
    }

    //Add avent listeners to list's elements
    this.attachListsEventListeners();
  }

  static displayMain(listIndex) {
    const list = Board.getList(listIndex);
    const main = document.querySelector("main");
    main.setAttribute("data-displayed-list-index", listIndex);

    const boardHeader = document.createElement("h2");
    boardHeader.textContent = list.getTitle();

    const tasks = document.createElement("ul");
    tasks.id = "tasks";

    for (const [index, todotask] of Board.getList(listIndex)
      .getToDoTasks()
      .entries()) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.classList.add("bgc-gray");
      listItem.classList.add("text-dark");
      listItem.id = `to-do-task${index}`;

      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task");

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("title");
      taskTitle.textContent = todotask.getTitle();

      const taskDate = document.createElement("span");
      taskDate.classList.add("date");
      taskDate.textContent = format(parseISO(todotask.getDate()), "dd-MM-yyyy");

      const taskDescription = document.createElement("span");
      taskDescription.classList.add("description");
      taskDescription.textContent = todotask.getDescription();

      taskContainer.appendChild(taskTitle);
      taskContainer.appendChild(taskDate);
      taskContainer.appendChild(taskDescription);

      listItem.appendChild(taskContainer);

      const editTaskButton = document.createElement("button");
      editTaskButton.classList.add("btn");
      editTaskButton.classList.add("text-hoverable-dark");
      editTaskButton.title = "Edit task";

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("btn");
      deleteTaskButton.classList.add("text-hoverable-dark");
      deleteTaskButton.title = "Delete task";

      let icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-xmark");

      deleteTaskButton.appendChild(icon);

      icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-pen");
      icon.classList.add("fa-sm");

      editTaskButton.appendChild(icon);

      listItem.appendChild(editTaskButton);
      listItem.appendChild(deleteTaskButton);

      tasks.appendChild(listItem);
    }

    //Button which opens new task form
    const newTaskButton = document.createElement("button");
    newTaskButton.classList.add("btn");
    newTaskButton.classList.add("text-hoverable-dark");
    newTaskButton.id = "new-task-btn";
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-plus");
    const text = document.createTextNode(" Add new task");
    newTaskButton.appendChild(icon);
    newTaskButton.appendChild(text);

    //New task form
    const newTaskForm = document.createElement("div");
    newTaskForm.classList.add("form");
    newTaskForm.id = "new-task-form";

    let formTitle = document.createElement("h3");
    formTitle.textContent = "Add task";
    newTaskForm.appendChild(formTitle);

    //New task's title input
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "task-title";
    let titleField = document.createElement("input");
    titleField.id = "task-title";
    titleField.type = "text";
    inputGroup.appendChild(titleLabel);
    inputGroup.appendChild(titleField);
    newTaskForm.appendChild(inputGroup);

    //New task's description input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    let descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    descriptionLabel.htmlFor = "task-description";
    let descriptionField = document.createElement("textarea");
    descriptionField.id = "task-description";
    inputGroup.appendChild(descriptionLabel);
    inputGroup.appendChild(descriptionField);
    newTaskForm.appendChild(inputGroup);

    //New task's date input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    let dateLabel = document.createElement("label");
    dateLabel.textContent = "Date";
    dateLabel.htmlFor = "task-date";
    let dateField = document.createElement("input");
    dateField.id = "task-date";
    dateField.type = "date";
    dateField.valueAsDate = new Date();
    inputGroup.appendChild(dateLabel);
    inputGroup.appendChild(dateField);
    newTaskForm.appendChild(inputGroup);

    //Button which hides new task form
    let cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "new-task-cancel";
    cancelButton.textContent = "Cancel";
    const addButton = document.createElement("button");
    addButton.classList.add("submit-btn");
    addButton.classList.add("text-clr-light");
    addButton.id = "new-task-add";
    addButton.textContent = "Add";

    newTaskForm.appendChild(cancelButton);
    newTaskForm.appendChild(addButton);

    //Edit task form
    const editTaskForm = document.createElement("dialog");
    editTaskForm.id = "edit-task-form";

    const editTaskContent = document.createElement("div");
    editTaskContent.classList.add("form");

    formTitle = document.createElement("h3");
    formTitle.textContent = "Edit task";
    editTaskContent.appendChild(formTitle);

    //Edit task's title input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "edit-task-title";
    titleField = document.createElement("input");
    titleField.id = "edit-task-title";
    titleField.type = "text";
    inputGroup.appendChild(titleLabel);
    inputGroup.appendChild(titleField);
    editTaskContent.appendChild(inputGroup);

    //Edit task's description input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    descriptionLabel.htmlFor = "edit-task-description";
    descriptionField = document.createElement("textarea");
    descriptionField.id = "edit-task-description";
    inputGroup.appendChild(descriptionLabel);
    inputGroup.appendChild(descriptionField);
    editTaskContent.appendChild(inputGroup);

    //Edit task's date input
    inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    dateLabel = document.createElement("label");
    dateLabel.textContent = "Date";
    dateLabel.htmlFor = "edit-task-date";
    dateField = document.createElement("input");
    dateField.id = "edit-task-date";
    dateField.type = "date";
    dateField.valueAsDate = new Date();
    inputGroup.appendChild(dateLabel);
    inputGroup.appendChild(dateField);
    editTaskContent.appendChild(inputGroup);

    //Button which hides edit task form
    cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.classList.add("text-clr-light");
    cancelButton.id = "edit-task-cancel";
    cancelButton.textContent = "Cancel";
    const saveButton = document.createElement("button");
    saveButton.classList.add("submit-btn");
    saveButton.classList.add("text-clr-light");
    saveButton.id = "edit-task-save";
    saveButton.textContent = "Save";

    editTaskContent.appendChild(cancelButton);
    editTaskContent.appendChild(saveButton);

    editTaskForm.appendChild(editTaskContent);

    main.appendChild(boardHeader);
    main.appendChild(tasks);
    main.appendChild(newTaskButton);
    main.appendChild(newTaskForm);
    main.appendChild(editTaskForm);

    //Add avent listeners to task's elements
    this.attachTasksEventListeners();
    this.attachNewTaskButtonEventListener();
    this.attachNewTaskCancelEventListener();
    this.attachNewTaskAddEventListener();
    this.attachEditTaskCancelEventLitener();
    this.attachEditTaskSaveEventListener();
  }

  //Content clearing functions

  //Clear lists in sidebar
  static clearLists() {
    const lists = document.getElementById("lists");
    lists.textContent = "";
  }

  //Clear main
  static clearMain() {
    const main = document.querySelector("main");
    main.textContent = "";
  }

  //Attaching event listeners

  //Display new list form when Add new list button is clicked
  static attachNewListButtonEventListener() {
    const newListButton = document.getElementById("new-list-btn");
    newListButton.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListButton = document.getElementById("new-list-btn");
      newListButton.style.display = "none";
      newListForm.style.display = "grid";
    });
  }

  //Hide and reset new list form
  static attachNewListCancelEventListener() {
    const newListCancel = document.getElementById("new-list-cancel");
    newListCancel.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListInput = document.getElementById("list-title");
      const newListButton = document.getElementById("new-list-btn");
      newListForm.style.display = "none";
      newListInput.value = "";
      newListButton.style.display = "block";
    });
  }

  //Add new list and hide form
  static attachNewListAddEventListener() {
    const newListAdd = document.getElementById("new-list-add");
    newListAdd.addEventListener("click", () => {
      const newListForm = document.getElementById("new-list-form");
      const newListInput = document.getElementById("list-title");
      const newListButton = document.getElementById("new-list-btn");
      if (newListInput.value.trim() !== "") {
        Board.addList(newListInput.value);
        newListForm.style.display = "none";
        newListButton.style.display = "block";
        this.clearLists();
        this.displayLists();
      }
      newListInput.value = "";
    });
  }

  //Hide edit list form modal
  static attachEditListCancelEventListener() {
    const editListCancel = document.getElementById("edit-list-cancel");
    editListCancel.addEventListener("click", () => {
      const editListForm = document.getElementById("edit-list-form");
      editListForm.close();
    });
  }

  static attachEditListSaveEventListener() {
    const editListSave = document.getElementById("edit-list-save");
    editListSave.addEventListener("click", () => {
      const editListForm = document.getElementById("edit-list-form");
      const listIndex = Number(editListForm.getAttribute("edit-list-index"));
      const titleField = document.getElementById("edit-list-title");
      if (titleField.value.trim() !== "") {
        this.editList(listIndex, titleField.value);
        editListForm.close();
      }
      titleField.value = "";
    });
  }

  //Display new task form when Add new ltask button is clicked
  static attachNewTaskButtonEventListener() {
    const newTaskButton = document.getElementById("new-task-btn");
    newTaskButton.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskButton = document.getElementById("new-task-btn");
      newTaskButton.style.display = "none";
      newTaskForm.style.display = "grid";
    });
  }

  //Hide and reset new task form
  static attachNewTaskCancelEventListener() {
    const newTaskCancel = document.getElementById("new-task-cancel");
    newTaskCancel.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskTitle = document.getElementById("task-title");
      const newTaskDescription = document.getElementById("task-description");
      const newTaskDate = document.getElementById("task-date");
      const newTaskButton = document.getElementById("new-task-btn");
      newTaskForm.style.display = "none";
      newTaskTitle.value = "";
      newTaskDescription.value = "";
      newTaskDate.valueAsDate = new Date();
      newTaskButton.style.display = "block";
    });
  }

  //Add new task and hide form
  static attachNewTaskAddEventListener() {
    const newTaskAdd = document.getElementById("new-task-add");
    newTaskAdd.addEventListener("click", () => {
      const newTaskForm = document.getElementById("new-task-form");
      const newTaskTitle = document.getElementById("task-title");
      const newTaskDescription = document.getElementById("task-description");
      const newTaskDate = document.getElementById("task-date");
      const newTaskButton = document.getElementById("new-task-btn");
      if (newTaskTitle.value.trim() !== "") {
        const main = document.querySelector("main");
        const listIndex = Number(
          main.getAttribute("data-displayed-list-index")
        );
        Board.getList(listIndex).addToDoTask(
          newTaskTitle.value,
          newTaskDescription.value,
          newTaskDate.value
        );
        newTaskForm.style.display = "none";
        newTaskButton.style.display = "block";
        this.clearMain();
        this.displayMain(listIndex);
      }
      newTaskTitle.value = "";
      newTaskDescription.value = "";
      newTaskDate.valueAsDate = new Date();
    });
  }

  //Hide edit task form modal
  static attachEditTaskCancelEventLitener() {
    const editTaskCancel = document.getElementById("edit-task-cancel");
    editTaskCancel.addEventListener("click", () => {
      const editTaskForm = document.getElementById("edit-task-form");
      editTaskForm.close();
    });
  }

  static attachEditTaskSaveEventListener() {
    const editTaskSave = document.getElementById("edit-task-save");
    editTaskSave.addEventListener("click", () => {
      const editTaskForm = document.getElementById("edit-task-form");
      const taskIndex = Number(editTaskForm.getAttribute("edit-task-index"));
      const titleField = document.getElementById("edit-task-title");
      const descriptionField = document.getElementById("edit-task-description");
      const dateField = document.getElementById("edit-task-date");
      if (titleField.value.trim() !== "") {
        this.editTask(
          taskIndex,
          titleField.value,
          descriptionField.value,
          dateField.value
        );
        editTaskForm.close();
      }
      titleField.value = "";
    });
  }

  //Display list in main or delete list when button is clicked
  static attachListsEventListeners() {
    const lists = document.getElementById("lists").children;
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const listIndex = Number(
        document.getElementById(`list${i}`).getAttribute("id").slice(-1)
      );
      list.children[0].addEventListener("click", () => {
        this.displayList(listIndex);
      });
      //Main list cannot be deleted nor edited
      if (i !== 0) {
        list.children[1].addEventListener("click", () => {
          const editListForm = document.getElementById("edit-list-form");
          editListForm.setAttribute("edit-list-index", listIndex);
          const titleField = document.getElementById("edit-list-title");
          titleField.value = Board.getList(listIndex).getTitle();
          editListForm.showModal();
        });
        list.children[2].addEventListener("click", () => {
          this.deleteList(listIndex);
        });
      }
    }
  }

  //Delete task when button is clicked
  static attachTasksEventListeners() {
    const tasks = document.getElementById("tasks").children;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const taskIndex = Number(
        document.getElementById(`to-do-task${i}`).getAttribute("id").slice(-1)
      );
      task.children[1].addEventListener("click", () => {
        const editTaskForm = document.getElementById("edit-task-form");
        editTaskForm.setAttribute("edit-task-index", taskIndex);
        const main = document.querySelector("main");
        const displayedListIndex = Number(
          main.getAttribute("data-displayed-list-index")
        );
        const titleField = document.getElementById("edit-task-title");
        const descriptionField = document.getElementById(
          "edit-task-description"
        );
        const dateField = document.getElementById("edit-task-date");
        titleField.value = Board.getList(displayedListIndex)
          .getToDoTask(taskIndex)
          .getTitle();
        descriptionField.value = Board.getList(displayedListIndex)
          .getToDoTask(taskIndex)
          .getDescription();
        dateField.value = Board.getList(displayedListIndex)
          .getToDoTask(taskIndex)
          .getDate();
        editTaskForm.showModal();
      });
      task.children[2].addEventListener("click", () => {
        this.deleteTask(taskIndex);
      });
    }
  }

  //Handling display after deleting or choosing elements

  //Display list details in main
  static displayList(listIndex) {
    this.clearMain();
    this.displayMain(listIndex);
  }

  //Handle list deletion
  static deleteList(listIndex) {
    Board.deleteList(listIndex);
    this.clearLists();
    this.displayLists();
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    //If currently displayed list is deleted clear main
    if (displayedListIndex === listIndex) {
      this.clearMain();
      main.textContent = "Choose list to see tasks.";
    }
  }

  //Handle task deletion
  static deleteTask(taskIndex) {
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    Board.getList(displayedListIndex).deleteToDoTask(taskIndex);
    this.clearMain();
    this.displayMain(displayedListIndex);
  }

  //Handle list modification
  static editList(listIndex, title) {
    Board.getList(listIndex).setTitle(title);
    this.clearLists();
    this.displayLists();
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    //If currently displayed list is deleted refresh main
    if (displayedListIndex === listIndex) {
      this.clearMain();
      this.displayMain(listIndex);
    }
  }

  //Handle task modification
  static editTask(taskIndex, title, description, date) {
    const main = document.querySelector("main");
    const displayedListIndex = Number(
      main.getAttribute("data-displayed-list-index")
    );
    Board.getList(displayedListIndex).getToDoTask(taskIndex).setTitle(title);
    Board.getList(displayedListIndex)
      .getToDoTask(taskIndex)
      .setDescription(description);
    Board.getList(displayedListIndex).getToDoTask(taskIndex).setDate(date);
    this.clearMain();
    this.displayMain(displayedListIndex);
  }
}
