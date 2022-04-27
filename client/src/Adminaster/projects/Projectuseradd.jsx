import React, { useState } from "react";

function Projectuseradd({ setUseradd, userlist, id }) {
  const [userid, setUserid] = useState();
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [work, setWork] = useState(true);
  const [detailuser, setDetailuser] = useState([]);
  const adduser = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userid }),
    };
    const url = "http://localhost:5000/api/projects/" + id;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .finally(setUseradd(false))
      .catch((err) => console.log(err.data));
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

  if (work) {
    userfilter();
    setWork(false);
  }
  return (
    <div className="addprojectbehind">
      <div className="add-user">
        <div>
          <span id="spanupdate">Add User</span>
          <i
            className="fa-solid fa-xmark x-add-user"
            onClick={() => {
              setUseradd(false);
            }}
          ></i>
        </div>
        <hr className="line add-user-hr" />
        <form className="bottom">
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
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
        <div>
          Added Users
          <hr className="line add-user-hr"></hr>
          {summaryUserfilter.map((user, i) => {
            return <div key={i} className="sayı">{user.userid}</div>;
          })} 
        </div>
        <button className="acceptbtn btn-add-user" onClick={adduser}>
          Add
        </button>
        <button
          className="acceptbtn btn-add-user"
          onClick={() => {
            setUseradd(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Projectuseradd;
