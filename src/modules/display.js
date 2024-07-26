import ProjectList from './defaults.js';
import Project from './project.js';
import Todo from './todo.js';
import { format } from "date-fns";
import {localListController} from './localStorageController.js';


localStorage.clear();

const ls = localListController();
const projectList = ProjectList();



export default function display(index) {
    const container = document.querySelector("#container");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    const projectHeaderTitle = document.createElement("h1");
    projectHeaderTitle.textContent = "To-Do";

    projectHeader.appendChild(projectHeaderTitle);
    // projectHeader.appendChild(addTaskBtn);    
    container.appendChild(projectHeader);
    const projectsDiv = document.createElement("div");
    projectsDiv.id = "project-list";
    projectList.getProjectList().forEach((project, projectIndex) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.classList.add(projectIndex);
        const projectName = document.createElement("h2");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;
        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.id = "project-delete";
        // deleteProjectButton.textContent = "Delete Project";
        projectItem.appendChild(projectName);
        projectItem.appendChild(deleteProjectButton);
        projectsDiv.appendChild(projectItem);
        projectItem.addEventListener("click", () => {
            displayTask(project, projectIndex);
        });
        deleteProjectButton.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            if(confirm("Want to delete?\n All project tasks will lost!")){
                ls.removeProject(project);
                project.empty();
                projectList.deleteProject(projectIndex);
                display(0);
            }
            return;
        })
    });
    const wrapper = document.createElement("div");
    wrapper.id = "project-wrapper";
    const btnItem = document.createElement("div");
    btnItem.id = "add-project-item";
    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "project-add";
    const addProjectSpan = document.createElement("span");
    addProjectSpan.textContent = "Add Project";
    wrapper.appendChild(addProjectBtn);
    wrapper.appendChild(addProjectSpan);
    btnItem.appendChild(wrapper);
    projectsDiv.appendChild(btnItem);
    const taskDiv = document.createElement("div");
    taskDiv.id = "task-list";
    const content = document.createElement("div");
    content.id = "content";
    content.appendChild(projectsDiv);
    content.appendChild(taskDiv);
    container.appendChild(content);
    addProject();
    const project = projectList.getProjectList();
    displayTask(project[index], index);
}

function displayTask(project, index){
    const taskList = document.querySelector("#task-list");

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;

    const taskListDiv = document.createElement("ul");
    taskListDiv.classList.add("task-list");
    taskListDiv.classList.add(index);
    if(project){
        project.getTodo().forEach((task, taskIndex) => {
            const taskItemDiv = document.createElement("li");
            taskItemDiv.classList.add("task-item");
            const markAsComplete = document.createElement("input");
            markAsComplete.setAttribute("type", "checkbox");
            const taskTitle = document.createElement("span");
            taskTitle.textContent = task.title;
            const dueDate = document.createElement("div");
            dueDate.textContent = format(task.dueDate, "E d MMM");
            const taskExpandBtn = document.createElement("button");
            taskExpandBtn.classList.add("task-expand");
            taskExpandBtn.classList.add(taskIndex);
            const taskPriority = document.createElement("div");
            taskPriority.textContent = task.priority;
            // taskExpandBtn.textContent = "Expand Task";
            const firstGroup = document.createElement("div");
            firstGroup.id = "task-first-group";
            const secondGroup = document.createElement("div");
            secondGroup.id = "task-second-group";
            if(task.priority === "high"){
                taskPriority.style.color = "#be123c";
            } else if(task.priority === "medium"){
                taskPriority.style.color = "#d97706";
            } else {
                taskPriority.style.color = "#0e7490";
            }
 
            firstGroup.appendChild(markAsComplete);
            firstGroup.appendChild(taskTitle);
            firstGroup.appendChild(taskExpandBtn);
            secondGroup.appendChild(dueDate);
            secondGroup.appendChild(taskPriority);
            taskItemDiv.appendChild(firstGroup);
            taskItemDiv.appendChild(secondGroup);
            taskListDiv.appendChild(taskItemDiv);
            markAsComplete.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                if(markAsComplete.checked){
                    taskTitle.style.textDecoration = "line-through";
                    task.isComplete = true;
                } else {
                    taskTitle.style.textDecoration = "none";
                    task.isComplete = false;
                }
            })
        });
        const addTaskItem = document.createElement("div");
        addTaskItem.id = "add-task-item";
        const addTaskBtn = document.createElement("button");
        addTaskBtn.id = "task-add";
        // addTaskBtn.textContent = "Add Task";
        const addTaskSpan = document.createElement("span");
        addTaskSpan.textContent = "Add Task";
        taskList.appendChild(projectName);
        taskList.appendChild(taskListDiv);
        addTaskItem.appendChild(addTaskBtn);
        addTaskItem.appendChild(addTaskSpan);
        taskList.appendChild(addTaskItem);
        addTask();
        expandTask();
    }

    
}


function addProject() {
    const projectListDiv = document.querySelector("#project-list");
    const addProjectBtn = document.querySelector("#project-wrapper");

    addProjectBtn.addEventListener("click", () => {
        addProjectBtn.style.display = "none";
        const btnItem = document.querySelector("#add-project-item");
        const form = document.createElement("div");
        form.id = "add-project-form"
        const projectTitle = document.createElement("input");
        projectTitle.id= "project-title";
        projectTitle.setAttribute("placeholder", "Project title ");
        projectTitle.required = true;
        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.value = "submit";
        submit.style.backgroundColor = "#bbf7d0";
        const cancel = document.createElement("input");
        cancel.setAttribute("type", "reset");
        cancel.value = "cancel";
        cancel.style.backgroundColor = "#be123c";
        cancel.style.color = "white";
        form.appendChild(projectTitle);
        form.appendChild(cancel);
        form.appendChild(submit);
        btnItem.appendChild(form);
        projectListDiv.appendChild(btnItem);
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            const project = Project(projectTitle.value);
            projectList.addProject(project);
            ls.setProject(project)
            display(projectList.getProjectList().length - 1);
        });
        // window.onclick = function(event) {
        //     if (event.target == form)  {
        //         addProjectBtn.style.display = "flex";
        //         form.remove();
        //     }
        // }
        cancel.addEventListener("click", () => {
                addProjectBtn.style.display = "flex";
                form.remove();
        });
    })
}

function addTask(){
    const taskResetBtn = document.querySelector("#task-reset");
    const modal = document.getElementById("myModal");
    const expandModal = document.getElementById("expand-modal");
    const addTaskBtn = document.querySelector("#add-task-item");
    window.onclick = function(event) {
        if (event.target == modal)  {
            modal.style.display = "none";
        }
        else if ( event.target == expandModal ){
            expandModal.style.display = "none";
        }
    }

    taskResetBtn.addEventListener("click", ()=> {
        modal.style.display = "none";
    })
    const form = document.querySelector("#task-form");
    addTaskBtn.addEventListener("click", () => { 
        if(projectList.getProjectList().length !== 0) { 
            modal.style.display = "block";
            form.addEventListener("submit", (e) =>{
                form.checkValidity();     
                e.preventDefault();
                e.stopImmediatePropagation();
                const title = document.querySelector("#task-form-title");
                const description = document.querySelector("#task-form-description");
                const dueDate = document.querySelector("#task-form-due-date");
                const dueDateFormat = new Date(dueDate.value);
                const priority = document.querySelector("#task-form-priority");
                const todo = Todo(title.value, description.value, dueDateFormat.toJSON(), priority.value, false);
                const index = document.querySelector(".task-list").classList[1];  
                const project = projectList.getProjectList()[index];
                project.addTodo(todo);
                ls.setTask(project, todo, project.getTodo().length - 1);
                form.reset(); 
                modal.style.display = "none";
                display(index);
            })
        }
        else {
            alert("Oops, Your project list is empty\n To add a task, please add a new project!")
        }
    })
}

function expandTask() {
    const modal = document.getElementById("expand-modal");
    const expandBtn = document.querySelectorAll(".task-expand");
    expandBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            modal.style.display = "block";
            const projectIndex = document.querySelector(".task-list").classList[1];
            // console.log("p " + projectIndex);
            const project = projectList.getProjectList()[projectIndex];
            // console.log(project1)
            const todo = project.getTodo()[btn.classList[1]];
            // console.log(todo)
            // const todo = project.getTodo()[btn.classList[1]];
            const date = format(todo.dueDate, 'uuuu-MM-dd');
            document.getElementById("task-expand-title").value = todo.title;
            document.getElementById("task-expand-priority").value =  todo.priority;
            document.getElementById("task-expand-due-date").value = date;
            document.getElementById("task-expand-description").value = todo.description;
            // console.log(document.getElementById("task-expand-description").value);
            const editBtn = document.querySelector("#task-edit");
            editBtn.className = "";
            editBtn.className = btn.classList[1];
            editBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const projectIndex = document.querySelector(".task-list").classList[1];
                const project = projectList.getProjectList()[projectIndex];
                const todo = project.getTodo()[editBtn.className];
                todo.title = document.getElementById("task-expand-title").value;
                document.getElementById("task-expand-title").select();
                todo.priority = document.getElementById("task-expand-priority").value;
                todo.description = document.getElementById("task-expand-description").value;
                todo.dueDate = document.getElementById("task-expand-due-date").value;
                modal.style.display = "none";
                display(projectIndex);
            });
            const deleteBtn = document.querySelector("#task-delete");
            deleteBtn.className = "";
            deleteBtn.className = btn.classList[1];
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const projectIndex = document.querySelector(".task-list").classList[1];
                const project = projectList.getProjectList()[projectIndex];
                if(confirm("Want to delete?")){
                    project.deleteTodo(deleteBtn.className);
                } 
                modal.style.display = "none";
                display(projectIndex);
            })
        });
    });
}


