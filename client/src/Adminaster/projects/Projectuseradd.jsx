import React, { useState,useEffect } from "react";
import "./projectuseradd.css"

function Projectuseradd({ setUseradd, userlist, id,summary}) {
  const [userid, setUserid] = useState();
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [work, setWork] = useState(true);
  const [hata,setHata]=useState(false)
  const [addUserErr,setErr]=useState(false)
  const adduser = () => {
    if(userid!=="Choose One"){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userid }),
      };
      const close =()=>{
        setErr(false)
        setHata(false)
        
      }
      const url = "http://localhost:5000/api/projects/" + id;
      fetch(url, requestOptions)
        .then((res) => {
          if(res.status===404){
            setErr(true)
          }
        })
        .finally(userfilter)
        .finally(close())
        .catch((data) => console.log(data.message));
    }
    else{
      console.log("hata")
      setHata(true)
    }
  
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
  return (
    <div className="addprojectbehind">
      <div className="project-user-add">
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
            className="select select-project-user-add"
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

        </form>
        {
          addUserErr&&(
            <div id="invalid-user">Same user and project already extist!</div>
          )
        }
        {hata&&(
            <div id="invalid-user">Invalid user</div>
          )}
        <div>
          Added Users
          <hr className="line add-user-hr"></hr>
          <div className="project-user-add-div">
          <table className="project-user-add-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            {summaryUserfilter.map((item, key) => {
              return (
                <tbody key={key}>
                  {userlist.map((user, i) => {
                    if (item.projectid === id && item.userid === user.id)
                      return (
                        <tr key={i}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>
                            <i
                              className="fa-solid fa-trash dustbin"
                              onClick={() => {
                                deleteuser(user.id);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>
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
