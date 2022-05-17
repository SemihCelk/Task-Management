import React, { useState } from "react";
import "./newproject.css";
function AddNewProject({ setshowproject, userlist, projectData }) {
  const [projectid, setProjectid] = useState();
  const [projectName, setProjectname] = useState();
  const [userid, setUserid] = useState();
  const [hata, setHata] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      isNaN(projectid) ||
      projectid === null ||
      projectName === null ||
      projectName.startsWith(" ") ||
      projectName.endsWith(" ")||
      projectid.startsWith(" ") ||
      projectid.endsWith(" ")||
      projectid !==Number
    ) {
      setHata(true);
    } else {
      setHata(false);
      console.log(userid, projectid, projectName);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, projectid, projectName }),
      };

      const url = "http://localhost:5000/api/projects";
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(() => {
          projectData();
        })
        .finally(setshowproject(false))
        .catch((err) => setHata(true));
    }
  };

  return (
    <div className="addprojectbehind">
      <div className="container addproject">
        <div>
          <span id="spanupdate">Add Project</span>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setshowproject(false);
            }}
          ></i>
        </div>
        <hr className="line" />
        <form style={{ marginLeft: "10px" }}>
          <div className="add-project-group">
            <input
              autoComplete="off"
              type="text"
              placeholder="ID"
              name="id"
              onChange={(e) => setProjectid(e.target.value)}
              required
            ></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ID</label>
          </div>
          <div className="add-project-group">
            <input
              autoComplete="off"
              type="text"
              placeholder="Project Name"
              name="id"
              onChange={(e) => setProjectname(e.target.value)}
              required
            ></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Project Name</label>
          </div>
          {hata && <div id="err">{"Invalid data"}</div>}
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option>Choose one</option>
            {userlist.map((item, i) => {
              if (item.name !== "admin")
                return (
                  <option key={i} value={item.id}>
                    {item.id} {item.name}
                  </option>
                );
            })}
          </select>
        </form>
        <button className="acceptbtn btn-top-projectadd" onClick={onSubmit}>
          Add
        </button>
        <button
          className="acceptbtn btn-top-projectadd"
          onClick={() => {
            setshowproject(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddNewProject;
