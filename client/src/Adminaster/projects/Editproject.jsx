import React, { useState } from "react";

function Editproject({ setshowprojectedit, id, projectname, projectData,userlist,loadData}) {
  const [projectName, setProjectname] = useState(projectname);
  const editproject = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        projectName
      }),
      redirect: "follow",
    };
    const callbackFunction1 = (result) => console.log(result);
    setshowprojectedit(false);
    fetch("http://localhost:5000/api/projects/"+id, requestOptions)
      .then((response) => response.json())
      .then(callbackFunction1)
      .then(loadData)
      .finally(projectData)
      .catch((error) => console.log("error", error));
  };
 
  return (
    <div className="addprojectbehind">
      <div className="container updateproject">
        <div>
          <span id="spanupdate">Project Edit</span>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setshowprojectedit(false);
            }}
          ></i>
        </div>
        <hr className="project-edit-hr-line" />
        <form>
        <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="project name"
                value={projectName}
                name="name"
                onChange={(e) => setProjectname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>project name</label>
            </div>
        </form>
        <button className="acceptbtn project-edit-btn" onClick={editproject}>Add</button>
        <button
          className="acceptbtn project-edit-btn"
          onClick={() => {
            setshowprojectedit(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Editproject;
