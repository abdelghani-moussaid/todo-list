export default function (name){
    let todoList = [];
    const addTodo = (todo) => todoList.push(todo);
    const deleteTodo = (index) => todoList.splice(index, 1);
    const getTodo = () => todoList;
    const empty = () => todoList = [];

    return { name ,addTodo, deleteTodo, getTodo, empty }

}