import React, { useState } from "react";
import "./admin.css";
import "./navbar.css";
import UserList from "./userlist/UserList";
import Project from "./projects/Project";
function Admin({ setToken, setIsAdmin, name, setName }) {
  const [userListShow, setuserList] = useState(true);
  const [project, setProject] = useState();
  return (
    <div class="page">
      <div className="nav-bar">
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
      <div id="nav-container">
        <div className="bg"></div>
        
          <div className="button" tabindex="0">
          <div id="navbartext"> Welcome {name}</div>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </div>    
        <div id="nav-content" tabindex="0">
        <div className="sidebaritems">
          <div
            className="sidebar-userlist"
            onClick={() => {
              setuserList(true);
              setProject(false);
            }}
          >
            <i className="fa-solid fa-users ">
              {" "}
              <div className="sidebar-text">UserList Management</div>
            </i>
          </div>
          <br></br>
          <div
            className="sidebar-userlist"
            onClick={() => {
              setProject(true);
              setuserList(false);
            }}
          >
            <i className="fa-solid fa-file-code">
              <div className="sidebar-text">Project Management</div>
            </i>
          </div>
        </div>
        </div>
        </div>
      </div>
     

        {/* <div className="sidebar">
        <div className="sidebaritems">
          <div
            className="sidebar-userlist"
            onClick={() => {
              setuserList(true);
              setProject(false);
            }}
          >
            <i className="fa-solid fa-users ">
              {" "}
              <div className="sidebar-text">UserList Management</div>
            </i>
          </div>
          <br></br>
          <div
            className="sidebar-userlist"
            onClick={() => {
              setProject(true);
              setuserList(false);
            }}
          >
            <i className="fa-solid fa-file-code">
              <div className="sidebar-text">Project Management</div>
            </i>
          </div>
        </div>
      </div>  */}
      {/* </div> */}
      <div className="content">
        {userListShow && <UserList />}
        {project && <Project />}
      </div>
    </div>
  );
}
export default Admin;
