import React, { useState } from "react";

function Editproject({ setshowprojectedit, id, projectname, projectData,userlist,loadData}) {
  const [projectid, setProjectid] = useState(id);
  const [projectName, setProjectname] = useState(projectname);
  const [userid,setUserid]=useState()
  const editproject = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        projectName,userid
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
      <div className="container addproject">
        <div>
          <span id="spanupdate">Project Edit</span>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setshowprojectedit(false);
            }}
          ></i>
        </div>
        <hr className="line" />
        <form>
          <input
            className="addnewproject-input"
            placeholder="id"
            value={projectid}
            onChange={(e) => setProjectid(e.target.value)}
            required
          ></input>
          <input
            className="addnewproject-input"
            placeholder="project name"
            value={projectName}
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
        <button className="acceptbtn btn-top-projectadd" onClick={editproject}>Add</button>
        <button
          className="acceptbtn btn-top-projectadd"
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
