import React, { useState } from "react";

function Editproject({
  setshowprojectedit,
  id,
  projectname,
  projectData,
  loadData,
}) {
  const [projectName, setProjectname] = useState(projectname);
  const [hata, setHata] = useState(false);

  const editproject = () => {
    if (projectName === ""||projectName.startsWith(" ") || projectName.endsWith(" ")) {
      setHata(true);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          projectName,
        }),
        redirect: "follow",
      };
      const callbackFunction1 = (result) => console.log(result);
      setshowprojectedit(false);
      fetch("http://localhost:5000/api/projects/" + id, requestOptions)
        .then((response) => response.json())
        .then(callbackFunction1)
        .then(loadData)
        .finally(projectData)
        .catch((error) => console.log("error", error));
    }
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
          <div className="edit-project">
            <input
              autoComplete="off"
              type="text"
              placeholder="Project Name"
              value={projectName}
              name="name"
              onChange={(e) => setProjectname(e.target.value)}
              required
            ></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Project Name</label>
          </div>
          {hata && <div id="err">{"Invalid data"}</div>}
        </form>
        <button className="acceptbtn" onClick={editproject}>
          Add
        </button>
        <button
          className="acceptbtn "
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
