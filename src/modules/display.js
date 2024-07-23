
import Project from './project.js';
import ProjectList from './defaults.js';

const projectList = ProjectList();

export default function display () {
    const container = document.querySelector("#container");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    const projectHeaderTitle = document.createElement("h1");
    projectHeaderTitle.textContent = "Todo List";
    projectHeader.appendChild(projectHeaderTitle);    
    container.appendChild(projectHeader);
    
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

    addProject();
}


function addProject() {
    const projectListDiv = document.querySelector("#project-list");
    const addProjectBtn = document.querySelector("#project-add");


    console.log(addProjectBtn);

    addProjectBtn.addEventListener('click', (e) => {
        addProjectBtn.style.display = "none";
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        const form = document.createElement("form");
        const projectTitle = document.createElement("input");
        projectTitle.id= "project-title";
        projectTitle.setAttribute("placeholder", "What project are you working on? ");
        projectTitle.required = true;
        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        const cancel = document.createElement("button");
        cancel.innerText = "cancel";
        form.appendChild(projectTitle);
        form.appendChild(submit);
        form.appendChild(cancel);
        projectItem.appendChild(form);
        projectListDiv.appendChild(projectItem);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const project = Project(projectTitle.value);
            projectList.addProject(project);
            display(projectList);
        })
    })
}