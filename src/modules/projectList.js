export default function () {
    let projectList = [];

    const addProject = (project) => projectList.push(project);
    const deleteProject = (index) => projectList.splice(index, 1);
    const getProjectList = () => projectList;

    return {addProject, deleteProject, getProjectList}
}