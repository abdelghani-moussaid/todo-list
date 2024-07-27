import Todo from './todo.js';
import Project from './project.js';
import ProjectList from "./projectList";
import DefaultProjectList from './defaults.js';

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }


export function localListController(){
    
    const defaultProjectList = DefaultProjectList();
    const projectList = ProjectList();
    const localProjectList = [];
    const hasVisited = localStorage.getItem('hasVisited');


    const initialize = function(){
        if(!hasVisited && storageAvailable("localStorage")) {

            localStorage.setItem('hasVisited', true)  
            
            defaultProjectList.getProjectList().forEach((project, indexP) => {
    
                localProjectList.push({name: project.name, taskList: []});
                project.getTodo().forEach((task, indexT) => { 
                    localProjectList[indexP].taskList.push({id: indexT, task});
                });
            });
    
            // console.log(localProjectList);
            localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
            console.log("duh")
        }
    }
    

    const setProject = function(project){
        if (!storageAvailable("localStorage")) {
            return;
        }
        localProjectList.push({name: project.name, taskList: []});
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }

    const setTask = function(project, task) {
        if (!storageAvailable("localStorage")) {
            return;
        }
        // console.log(localProjectList.name)
        const tasks = localProjectList.find((element) => element.name === project.name).taskList;
        const id = tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1;
        localProjectList.find((element) => element.name === project.name).taskList.push({id,task});
        // localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }
    
    const removeProject = function(project){
        const projectIndex = localProjectList.findIndex((element) => element.name === project.name); 
        // console.log(projectIndex)
        if(projectIndex !== -1 && storageAvailable("localStorage")){
            localProjectList.splice(projectIndex, 1);
            // localStorage.removeItem("localProjectList");
            localStorage.setItem("localProjectList", JSON.stringify(localProjectList));

        }
    }
    
    const removeTask = function(project,todo){
        const projectIndex = localProjectList.findIndex((element) => element.name === project.name);
        const taskIndex = localProjectList[projectIndex].taskList.findIndex((element) =>  JSON.stringify(element.task) === JSON.stringify(todo));
        // console.log(projectIndex, taskIndex)
        if(projectIndex !== -1 && taskIndex !== -1){
            localProjectList[projectIndex].taskList.splice(taskIndex, 1);
            // localStorage.removeItem("localProjectList");
            if (storageAvailable("localStorage")) { 
                localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
            }
    
        }
    }
        
    const editTask = function(project, oldTask, newTask){
        if (!storageAvailable("localStorage")) {
            return;
        }
        const projectIndex = localProjectList.findIndex((element) => element.name === project.name);
        const taskIndex = localProjectList[projectIndex].taskList.findIndex((element) =>  JSON.stringify(element.task) === JSON.stringify(oldTask));
        
        // console.log(localProjectList[projectIndex].taskList)

        localProjectList[projectIndex].taskList[taskIndex].task = newTask;
        // localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }

    const getLocalProjectList = function(){
        if(!hasVisited){
            return defaultProjectList;
        }
        const projectListObject = JSON.parse(localStorage.getItem("localProjectList"));
        if(!projectListObject) return false;
        projectListObject.forEach((project, projectIndex) => {
            const newProject = Project(project.name);  
            localProjectList.push({name: project.name, taskList: []});
            project.taskList.forEach((item, taskIndex) => {
                const todo = item.task;
                const newTask = Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.isComplete);
                newProject.addTodo(newTask);
                localProjectList[projectIndex].taskList.push({id: taskIndex,task: newTask});
            });
            projectList.addProject(newProject);
        });

        console.log(localProjectList)
        return projectList;
    }

    return {setProject, setTask, removeProject, removeTask, editTask, getLocalProjectList, initialize}
}