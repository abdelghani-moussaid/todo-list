
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
    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "task-add";
    addTaskBtn.textContent = "Add Task";
    projectHeader.appendChild(projectHeaderTitle);
    projectHeader.appendChild(addTaskBtn);    
    container.appendChild(projectHeader);
    const projectsDiv = document.createElement("div");
    projectsDiv.id = "project-list";
    projectList.getProjectList().forEach((project, projectIndex) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        const projectName = document.createElement("h2");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;
        projectName.style.display = "inline-block";
        const projectExpandBtn = document.createElement("button");
        projectExpandBtn.classList.add("project-expand");
        projectExpandBtn.classList.add(projectIndex);
        projectExpandBtn.textContent = "Expand Project";
        projectDiv.appendChild(projectName);
        projectDiv.appendChild(projectExpandBtn);
        projectItem.appendChild(projectDiv);
        // const taskDiv = document.createElement("div");
        // taskDiv.classList.add("tasks");
        // const taskListDiv = document.createElement("ul");
        // taskListDiv.classList.add("task-list");
        // project.getTodo().forEach((task, taskIndex) => {
        //     const taskItemDiv = document.createElement("li");
        //     taskItemDiv.classList.add("task-item");
        //     const taskTitle = document.createElement("span");
        //     taskTitle.textContent = task.title;
        //     const taskExpandBtn = document.createElement("button");
        //     taskExpandBtn.classList.add("task-expand");
        //     taskExpandBtn.classList.add(taskIndex);
        //     taskExpandBtn.textContent = "Expand Task";
        //     taskItemDiv.appendChild(taskTitle);
        //     taskItemDiv.appendChild(taskExpandBtn);
        //     taskListDiv.appendChild(taskItemDiv);
        //     taskDiv.appendChild(taskListDiv);
        //     projectItem.appendChild(taskDiv);
        // })
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
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks-list");


    addProject();
}


function addProject() {
    const projectListDiv = document.querySelector("#project-list");
    const addProjectBtn = document.querySelector("#project-add");

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
        const cancel = document.createElement("input");
        cancel.setAttribute("type", "reset");
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
        });
        document.onclick = function(e){
            if(e.target !== projectTitle && e.target !== addProjectBtn){
              //element clicked wasn't the form input; hide the form
                addProjectBtn.style.display = "inline-block";
                form.style.display = 'none';
            }
          };
    })
}