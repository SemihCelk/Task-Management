import React, { useState, useEffect } from "react";

function Editproject({
  setshowprojectedit,
  id,
  projectname,
  projectData,
  loadData,
  userlist,
  summary,
}) {
  const [projectName, setProjectname] = useState(projectname);
  const [hata, setHata] = useState(false);
  const [userid, setUserid] = useState();
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [work, setWork] = useState(true);
  const [addUserErr, setErr] = useState(false);

  const adduser = () => {
    if (userid !== "Choose One") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userid }),
      };
      const close = () => {
        setErr(false);
        setHata(false);
      };
      const url = "http://localhost:5000/api/projects/" + id;
      fetch(url, requestOptions)
        .then((res) => {
          if (res.status === 404) {
            setErr(true);
          }
        })
        .finally(userfilter)
        .finally(close())
        .catch((data) => console.log(data.message));
    } else {
      console.log("hata");
      setHata(true);
    }
  };
  const userfilter = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/project/user/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => setUserfilter(result))
      .catch((error) => console.log("error", error));
  };
  const deleteuser = (xid) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://localhost:5000/api/projects/user/" + xid, requestOptions)
      .then((response) => response.json())
      .then(summary)
      .finally(userfilter)
      .catch((error) => console.log("error", error));
  };

  if (work) {
    userfilter();
    setWork(false);
  }
  useEffect(() => {
    userfilter();
  }, []);

  const editproject = () => {
    if (
      projectName === "" ||
      projectName.startsWith(" ") ||
      projectName.endsWith(" ")
    ) {
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
        <span id="spanupdate">Add User</span>
        <form className="bottom box-top">
          <select
            className="select-update-project "
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option value="Choose One">Choose One</option>
            {userlist.map((item, i) => {
              if (item.name !== "admin")
                return (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                );
            })}
          </select>
          <i className="fa-solid fa-square-plus add-user-projectedit" onClick={adduser}></i>
        </form>
        {addUserErr && (
          <div id="invalid-user">Same user and project already extist!</div>
        )}
        {hata && <div id="invalid-user">Invalid user</div>}
        <div className="project-user-add-div">
          <table className="project-user-add-table table-update-p">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {summaryUserfilter.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item[0].id}</td>
                    <td>{item[0].name}</td>
                    <td>
                      <i
                        className="fa-solid fa-trash dustbin"
                        onClick={() => {
                          deleteuser(item[0].id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button className="acceptbtn update-p-btn" onClick={editproject}>
          Confirm
        </button>
        <button
        className="acceptbtn update-p-btn"
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
