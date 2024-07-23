export default function (title, description, dueDate, priority, isComplete){
    
    const markAsComplete = () => this.isDone = true;

    return {title, description, dueDate, priority, isComplete, markAsComplete}
}