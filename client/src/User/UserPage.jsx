import React, { useState } from "react";
import "./user.css";
import Userpagedetails from "./Userpagedetails";
function UserPage({ setToken, setIsAdmin, name, setName, userSpecialid }) {
  const [projects, setProjects] = useState([]);
  const [listen, setListen] = useState(true);
  const [details, setDetails] = useState([]);
  const [subdetail, setSubdetails] = useState([]);
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [folderPop, setFolderpop] = useState(false);
  const [userid, setUserid] = useState();
  const [projectid, setProjectid] = useState();
  const [show, setShow] = useState(true);
  const data = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects", requestOptions)
      .then((response) => response.json())
      .then((result) => setProjects(result));
  };
  const summary = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects/summary", requestOptions)
      .then((response) => response.json())
      .then((result) => setDetails(result))
      .catch((error) => console.log("error", error));
  };
  const userfilter = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/project/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserfilter(result))
      .catch((error) => console.log("error", error));
  };
  if (listen) {
    summary();
    data();
    userfilter();
    setListen(false);
  }
  return (
    <div className="userpage">
      <div className="top-bar">
        <div id="navbar-text"> Welcome {name}</div>
        <div className="log-out-user">
          <div className="logout-btn-user">
            <i
              className="fa-solid fa-arrow-right-from-bracket logout-user"
              title="Log Out"
              onClick={() => {
                setToken(localStorage.setItem("token", ""));
                setIsAdmin(localStorage.setItem("isAdmin", ""));
                setName(localStorage.setItem("name", ""));
              }}
            ></i>
          </div>
        </div>
      </div>
      {folderPop && (
        <Userpagedetails
          projectid={projectid}
          userid={userid}
          subdetail={subdetail}
          details={details}
          setFolderpop={setFolderpop}
          setShow={setShow}
        />
      )}{" "}
      {show && (
        <div className="user-body">
          <h2 id="h2">Projects</h2>
          <div className="project-table">
            <table style={{ color: "white" }}>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Project Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              {summaryUserfilter.map((item, key) => {
                const data = parseInt(userSpecialid);
                return (
                  <tbody key={key}>
                    {projects.map((proje, i) => {
                      if (item.userid === data && item.projectid === proje.id) {
                        return (
                          <tr key={i}>
                            <td>{proje.id}</td>
                            <td>{proje.project_name}</td>
                            <td>
                              <i
                                className="fa-solid fa-folder-open open-folder"
                                onClick={() => {
                                  setUserid(item);
                                  setProjectid(proje);
                                  console.log(details);
                                  setFolderpop(true);
                                  setShow(false);
                                }}
                              ></i>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
