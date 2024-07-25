import ProjectList from './defaults.js';
import project from './project.js';
import Project from './project.js';
import Todo from './todo.js';
import { format } from "date-fns";

const projectList = ProjectList();

export default function display(index) {
    const container = document.querySelector("#container");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    const projectHeaderTitle = document.createElement("h1");
    projectHeaderTitle.textContent = "Let's To Do";

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
                project.empty();
                projectList.deleteProject(projectItem);
                display(0);
            }
            return;
        })
    });
    const btnItem = document.createElement("div");
    btnItem.id = "add-project-item";
    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "project-add";
    const addProjectSpan = document.createElement("span");
    addProjectSpan.textContent = "Add Project";
    btnItem.appendChild(addProjectBtn);
    btnItem.appendChild(addProjectSpan);
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
            const dueDate = document.createElement("span");
            dueDate.textContent = format(task.dueDate, "E d MMM");
            const taskExpandBtn = document.createElement("button");
            taskExpandBtn.classList.add("task-expand");
            taskExpandBtn.classList.add(taskIndex);
            // taskExpandBtn.textContent = "Expand Task";
            taskItemDiv.appendChild(markAsComplete);
            taskItemDiv.appendChild(taskTitle);
            taskItemDiv.appendChild(dueDate);
            taskItemDiv.appendChild(taskExpandBtn);
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
    const addProjectBtn = document.querySelector("#project-add");

    addProjectBtn.addEventListener("click", (e) => {
        addProjectBtn.style.display = "none";
        const btnItem = document.querySelector("#add-project-item");
        const form = document.createElement("div");
        const projectTitle = document.createElement("input");
        projectTitle.id= "project-title";
        projectTitle.setAttribute("placeholder", "What project are you working on? ");
        projectTitle.required = true;
        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        const cancel = document.createElement("input");
        cancel.setAttribute("type", "reset");
        cancel.value = "cancel";
        form.appendChild(projectTitle);
        form.appendChild(submit);
        form.appendChild(cancel);
        btnItem.appendChild(form);
        projectListDiv.appendChild(btnItem);
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            const project = Project(projectTitle.value);
            projectList.addProject(project);
            display(projectList.getProjectList().length - 1);
        });
        cancel.addEventListener("click", () => {
                addProjectBtn.style.display = "inline-block";
                form.remove();
        });
    })
}

function addTask(){
    const taskResetBtn = document.querySelector("#task-reset");
    const modal = document.getElementById("myModal");
    const expandModal = document.getElementById("expand-modal");
    const addTaskBtn = document.querySelector("#task-add");
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
                const todo = Todo(title.value, description.value, dueDateFormat, priority.value, false);
                const index = document.querySelector(".task-list").classList[1];  
                const project = projectList.getProjectList()[index];
                project.addTodo(todo);
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


