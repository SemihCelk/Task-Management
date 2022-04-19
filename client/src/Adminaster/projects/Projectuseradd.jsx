import React, { useState } from "react";

function Projectuseradd({ setUseradd, userlist, id }) {
  const [userid, setUserid] = useState();
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

  return (
    <div className="addprojectbehind">
      <div className="container addsummary">
        <div>
          <span id="spanupdate">Add Summary</span>
          <i className="fa-solid fa-xmark x-add-summary" onClick={() => {setUseradd(false)}}></i>
        </div>
        <hr className="line" />
        <form>
          <br></br>
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            {userlist.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {item.id} {item.name}
                </option>
              );
            })}
          </select>
        </form>
        <div>
          Userlist
          <hr></hr>
          <div>
            <ol>
              <li></li>
            </ol>
          </div>
        </div>
        <button className="acceptbtn btn-add-summary" onClick={adduser}>Add</button>
        <button
          className="acceptbtn btn-add-summary"
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
