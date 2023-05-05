export class ToDoTask {
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
    }

    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getDate(){
        return this.date;
    }
}