import ProjectList from './defaults.js';
import Project from './project.js';
import Todo from './todo.js';
import { compareAsc, format } from "date-fns";

const projectList = ProjectList();

export default function display(index) {
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
        projectItem.classList.add(projectIndex);
        const projectName = document.createElement("h2");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;
        projectName.style.display = "inline-block";
        projectItem.appendChild(projectName);
        projectsDiv.appendChild(projectItem);
        projectItem.addEventListener("click", () => {
            displayTask(project, projectIndex);
            expandTask(project);
        });
    });
    const btnItem = document.createElement("div");
    btnItem.id = "btn-item";
    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "project-add";
    addProjectBtn.textContent = "Add Project";
    btnItem.appendChild(addProjectBtn);
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
    expandTask(project[index]);
    addTask();
}

function displayTask(project, index){
    const taskList = document.querySelector("#task-list");

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
    const taskListDiv = document.createElement("ul");
    taskListDiv.classList.add("task-list");
    taskListDiv.classList.add(index);
    project.getTodo().forEach((task, taskIndex) => {
        const taskItemDiv = document.createElement("li");
        taskItemDiv.classList.add("task-item");
        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        const dueDate = document.createElement("span");
        dueDate.textContent = format(task.dueDate, "E M MMM");
        const taskExpandBtn = document.createElement("button");
        taskExpandBtn.classList.add("task-expand");
        taskExpandBtn.classList.add(taskIndex);
        taskExpandBtn.textContent = "Expand Task";
        taskItemDiv.appendChild(taskTitle);
        taskItemDiv.appendChild(dueDate);
        taskItemDiv.appendChild(taskExpandBtn);
        taskListDiv.appendChild(taskItemDiv);
    })

    taskList.appendChild(taskListDiv);
}


function addProject() {
    const projectListDiv = document.querySelector("#project-list");
    const addProjectBtn = document.querySelector("#project-add");

    addProjectBtn.addEventListener('click', (e) => {
        addProjectBtn.style.display = "none";
        const btnItem = document.querySelector("#btn-item");
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
              //element clicked wasn't the form input; hide the form
                addProjectBtn.style.display = "inline-block";
                form.remove();
          });
    })
}

function addTask(){
    const taskResetBtn = document.querySelector("#task-reset");

    // Get the modal
    const modal = document.getElementById("myModal");
    const expandModal = document.getElementById("expand-modal");
    // Get the button that opens the modal
    const addTaskBtn = document.querySelector("#task-add");
    // When the user clicks the button, open the modal 
    addTaskBtn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks anywhere outside of the modal, close it
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
    // const select = document.querySelector("#task-form-project");
    // while(select.firstChild){
    //     select.removeChild(select.firstChild);
    // }
    // projectList.getProjectList().forEach((project, index) => {
    //     const option = document.createElement("option");
    //     option.classList.add("option");
    //     option.classList.add(index);
    //     option.value = index;
    //     option.innerText = project.name;
    //     select.appendChild(option);
    // });
    addTaskBtn.addEventListener("click", () => {  
        form.addEventListener("submit", (e) =>{
            form.checkValidity();     
            e.preventDefault();
            e.stopImmediatePropagation();
            const title = document.querySelector("#task-form-title");
            const description = document.querySelector("#task-form-description");
            const dueDate = document.querySelector("#task-form-due-date");
            const dueDateFormat = format(dueDate.value, "E M MMM");

            const priority = document.querySelector("#task-form-priority");
            // const projectIndex = document.querySelector("#task-form-project");
            const todo = Todo(title.value, description.value, dueDateFormat, priority.value, false);

            const index = document.querySelector(".task-list").classList[1];  
            // const index = projectIndex.value;

            const project = projectList.getProjectList()[index];
            project.addTodo(todo);   
            form.reset(); 
            modal.style.display = "none";
            display(index);
        })
    })
}

function expandTask(project) {
    
    const form = document.querySelector("#expand-task");
    // Get the modal
    const modal = document.getElementById("expand-modal");

    // Get the button that opens the modal
    const expandBtn = document.querySelectorAll(".task-expand");


    // taskResetBtn.addEventListener("click", ()=> {
    //     modal.style.display = "none";
    // })

    // When the user clicks the button, open the modal 
    expandBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            modal.style.display = "block";
            const todo = project.getTodo()[btn.classList[1]];
            const date = format(todo.dueDate, 'uuuu-MM-dd');
            document.getElementById("task-expand-title").value = todo.title;
            document.getElementById("task-expand-priority").value =  todo.priority;
            document.getElementById("task-expand-due-date").value = date;
            document.getElementById("task-expand-description").innerText = todo.description;
            // document.getElementById("task-expand-project").setAttribute("value", todo.project);
            // modal.style.display = "block";
        })
    })
}


