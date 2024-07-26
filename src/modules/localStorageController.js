// import project from "./project";
// import ProjectList from "./projectList";
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
    
    const projectList = DefaultProjectList();
    const localProjectList = [];
    const hasVisited = localStorage.getItem('hasVisited');

    if(!hasVisited && storageAvailable("localStorage")) {

        localStorage.setItem('hasVisited', true)  
        
        projectList.getProjectList().forEach((project, index) => {

            localProjectList.push({name: project.name, taskList: []});
            project.getTodo().forEach(task => { 
                localProjectList[index].taskList.push({id: index,task: {task}});
            });

        });
        localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }

    const setProject = function(project){
        if (!storageAvailable("localStorage")) {
            return;
        }
        localProjectList.push({name: project.name, taskList: []});
        localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }

    const setTask = function(project, task, index) {
        if (!storageAvailable("localStorage")) {
            return;
        }
        console.log(localProjectList.name)
        localProjectList.find((element) => element.name === project.name).taskList.push({id: index,task: {task}});
        localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }
    
    const removeProject = function(project){

        
        const projectIndex = localProjectList.findIndex(x => x.name === project.name); 
        if(projectIndex !== -1){
            localProjectList.splice(projectIndex, 1);
            localStorage.removeItem("localProjectList");
            if (storageAvailable("localStorage")) { 
                localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
            }
        }
    }
    
    const removeTask = function(project,index){
        const projectIndex = localProjectList.findIndex((element) => element.name === project.name);
        const taskIndex = localProjectList[projectIndex].taskList.findIndex((element) => element.id === index);
        if(projectIndex !== -1 && taskIndex !== -1){
            localProjectList[projectIndex].taskList.splice(taskIndex, 1);
            localStorage.removeItem("localProjectList");
            if (storageAvailable("localStorage")) { 
                localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
            }
    
        }
    }
        
    const editTask = function(project, newTask, index){
        if (!storageAvailable("localStorage")) {
            return;
        }
        projectIndex = localProjectList.findIndex((element) => element.name === project.name);
        taskIndex = localProjectList[taskIndex].taskList.findIndex((element) => element.id === index);
        localProjectList[projectIndex].taskList[taskIndex].task = newTask;
        localStorage.removeItem("localProjectList");
        localStorage.setItem("localProjectList", JSON.stringify(localProjectList));
    }

    const getLocalProjectList = function(){
        return JSON.parse(localStorage.getItem("user"));
    }

    return {setProject, setTask, removeProject, removeTask, editTask, getLocalProjectList}
}