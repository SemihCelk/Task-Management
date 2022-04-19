import React from "react";
import "./user.css";
function UserPage({ setToken, setIsAdmin, name, setName }) {
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
                <th>Project Name</th>
                <th>Summary</th>
                <th>created time</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>x</td>
                <td>x</td>
                <td>x</td>
                <td>
                  <button>Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
