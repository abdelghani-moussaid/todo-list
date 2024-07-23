import Todo from './todo.js';
import Project from './project.js';
import ProjectList from './projectList.js';

export default function(){
    const task = Todo("Feed cat", "beef", "today", 1, false);
    const task2 = Todo("Run", "recovery run", "today", 1, false);
    const task3 = Todo("Study", "TOP JS", "today", 1, false);
    const noProject = Project("No Project");
    const newProject = Project("New Project");
    noProject.addTodo(task);
    noProject.addTodo(task2);
    newProject.addTodo(task3)
    const projectList = ProjectList();
    projectList.addProject(noProject);
    projectList.addProject(newProject);
    return projectList;
}
