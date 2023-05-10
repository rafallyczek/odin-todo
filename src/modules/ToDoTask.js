export class ToDoTask {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }
}
