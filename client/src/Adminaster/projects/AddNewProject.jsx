import React, { useState } from "react";
import "./newproject.css";
function AddNewProject({ setshowproject, userlist, projectData }) {
  const [projectid, setProjectid] = useState();
  const [projectName, setProjectname] = useState();
  const [userid, setUserid] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
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
        console.log(test);
      })
      .finally(setshowproject(false))
      .finally()
      .catch((err) => console.log(err.data));
  };
  console.log(userlist)
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
        <form>
          <input
            className="addnewproject-input"
            placeholder="id"
            onChange={(e) => setProjectid(e.target.value)}
            required
          ></input>
          <input
            className="addnewproject-input"
            placeholder="project name"
            onChange={(e) => setProjectname(e.target.value)}
            required
          ></input>
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option value={null}>Choose one</option>
            {userlist.map((item, i) => {
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
