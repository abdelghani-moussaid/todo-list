import Project from './project.js';
import ProjectList from './defaults.js';
import Display from './display.js';

export default function(){
    const projectListDiv = document.querySelector("#project-list");
    const addProjectBtn = document.querySelector("#project-add");
    const projectList = ProjectList();

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
            Display(projectList);
        })
    })
}