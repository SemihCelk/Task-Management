import React, { useState } from "react";
import "./newproject.css";
function AddNewProject({ setshowproject, userlist, projectData }) {
  const [projectid, setProjectid] = useState();
  const [projectName, setProjectname] = useState();
  const [userid, setUserid] = useState();
  const [hata,setHata]=useState()
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
      })
      .finally(setshowproject(false))
      .catch((err) => setHata("proje eklenemedi"));
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
        <form>
        <div className="group">
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
            <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="project name"
                name="id"
                onChange={(e) => setProjectname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>project name</label>
            </div>
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option value={null}>Choose one</option>
            {userlist.map((item, i) => {
              console.log(item.id)
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
