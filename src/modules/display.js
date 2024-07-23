// import ProjectList from './defaults.js';
import AddedProject from './events.js';

export default function (projectList) {
    const container = document.querySelector("#container");
    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    const projectHeaderTitle = document.createElement("h1");
    projectHeaderTitle.textContent = "Todo List";
    projectHeader.appendChild(projectHeaderTitle);    
    container.appendChild(projectHeader);
    // const projectList = ProjectList();
    
    const projectsDiv = document.createElement("div");
    projectsDiv.id = "project-list";
    projectList.getProjectList().forEach((project, projectIndex) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        const projectLi = document.createElement("div");
        projectLi.classList.add("project");
        const projectName = document.createElement("h2");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;
        const projectExpandBtn = document.createElement("button");
        projectExpandBtn.classList.add("project-expand");
        projectExpandBtn.classList.add(projectIndex);
        projectExpandBtn.textContent = "Expand Project";
        projectLi.appendChild(projectName);
        projectLi.appendChild(projectExpandBtn);
        projectItem.appendChild(projectLi);
        const taskLi = document.createElement("div");
        taskLi.classList.add("tasks");
        const taskListDiv = document.createElement("ul");
        taskListDiv.classList.add("task-list");
        project.getTodo().forEach((task, taskIndex) => {
            const taskItemDiv = document.createElement("li");
            taskItemDiv.classList.add("task-item");
            const taskTitle = document.createElement("span");
            taskTitle.textContent = task.title;
            const taskExpandBtn = document.createElement("button");
            taskExpandBtn.classList.add("task-expand");
            taskExpandBtn.classList.add(taskIndex);
            taskExpandBtn.textContent = "Expand Task";
            taskItemDiv.appendChild(taskTitle);
            taskItemDiv.appendChild(taskExpandBtn);
            taskListDiv.appendChild(taskItemDiv);
            taskLi.appendChild(taskListDiv);
            projectItem.appendChild(taskLi);
        })
        projectsDiv.appendChild(projectItem);
    });
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "project-add";
    addProjectBtn.textContent = "Add Project";
    projectItem.appendChild(addProjectBtn);
    projectsDiv.appendChild(projectItem);
    container.appendChild(projectsDiv);
}