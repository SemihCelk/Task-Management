import React from "react";
import "./projectslist.css";
function Projectlist({
  loadData,
  setshowproject,
  setProjectname,
  summary,
  setid,
  setshowprojectedit,
  setDeleted,
  folder,
  setFolder,
  projects,
  setProjectlist,
}) {
  return (
    <div>
      <h2>Projects List</h2>
      <div className="project-main-div">
        <button
          className="delBTN"
          onClick={() => {
            loadData();
            setshowproject(true);
          }}
        >
          <span className="text">Create Project</span>
          <span className="icon">+</span>
        </button>
        <br></br>
        <div className="project-table-div">
          <table id="projectlist-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => {
                return (
                  <tr key={i}>
                    <td>{project.id}</td>
                    <td>{project.project_name}</td>
                    <td>
                      <i
                        className="fa-solid fa-folder-open open-folder"
                        onClick={() => {
                          loadData();
                          setFolder(!folder);
                          setProjectname(project.project_name);
                          summary(project.id);
                          setid(project.id);
                          setProjectlist(false);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square edit"
                        onClick={() => {
                          setid(project.id);
                          setProjectname(project.project_name);
                          setshowprojectedit(true);
                          loadData()
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash dustbin"
                        onClick={() => {
                          setDeleted(true);
                          setid(project.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projectlist;
