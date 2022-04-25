import React, { useState } from "react";
import "./user.css";
function UserPage({ setToken, setIsAdmin, name, setName, userSpecialid }) {
  const [projects, setProjects] = useState([]);
  const [listen, setListen] = useState(true);
  const [details, setDetails] = useState([]);
  const [asd, setAsd] = useState(true);
  const [userid, setUserid] = useState([]);
  const [summaryUserfilter, setUserfilter] = useState([]);
  const data = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects", requestOptions)
      .then((response) => response.json())
      .then((result) => setProjects(result))
      .catch((error) => console.log("error", error));
  };
  const summary = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects/summary/", requestOptions)
      .then((response) => response.json())
      .then((result) => setDetails(result))
      .finally(console.log(details))
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
  if (asd) {
    details.map((item) => {
      if (item.taskuser !== userSpecialid) {
        setAsd(false);
        setUserid(item.taskuser);
        return <div>aa</div>;
      }
    });
  }
console.log(summaryUserfilter)
  return (
    <div className="userpage">
      <div className="nav-bar">
        <div id="navbartext"> hoşgeldin {name}</div>
        <div className="logout-btn">
          <div className="logout-btn">
            <i
              className="fa-solid fa-arrow-right-from-bracket logout"
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
      <div className="user-body">
        <h2 id="h2">Projects</h2>
        <div className="project-table">
          <table style={{ color: "white" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Project Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item, i) => {
                console.log(item);
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.project_name}</td>
                    <td>
                      <button
                        onClick={() => {
                      
                        }}
                      >
                        Details
                      </button>
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

export default UserPage;
