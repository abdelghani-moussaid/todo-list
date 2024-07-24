import Todo from './todo.js';
import Project from './project.js';
import ProjectList from './projectList.js';

export default function(){
    const task = Todo("Feed cat", "beef", Date.now(), "high", false);
    const task2 = Todo("Run", "recovery run", Date.now(), "medium", false);
    const task3 = Todo("Study", "TOP JS", Date.now(), "low", false);
    const noProject = Project("Main");
    const newProject = Project("The Odin Project");
    noProject.addTodo(task);
    noProject.addTodo(task2);
    newProject.addTodo(task3)
    const projectList = ProjectList();
    projectList.addProject(noProject);
    projectList.addProject(newProject);
    return projectList;
}
