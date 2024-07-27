import Todo from './todo.js';
import Project from './project.js';
import ProjectList from './projectList.js';

export default function(){
    // const task = Todo("Feed cat", "Grain-Free Turkey", Date.now(), "high", false);
    // const task2 = Todo("Run", "Recovery run", Date.now(), "medium", false);
    // const task3 = Todo("JavaScript", "Project: The Weather App", Date.now(), "low", false);
    const noProject = Project("Main");
    // const newProject = Project("The Odin Project");
    // newProject.addTodo(task3)
    const projectList = ProjectList();
    projectList.addProject(noProject);
    // projectList.addProject(newProject);
    return projectList;
}
