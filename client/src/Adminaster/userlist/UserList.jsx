import { useState, useEffect } from "react";
import AddnewUser from "./AddnewUser";
import Updateuser from "./Updateuser";
import "./userlist.css";
function UserList() {
  const [userList, setUserList] = useState([]);
  const [showAddcomp, setShowAddComp] = useState(false);
  const [showEditcomp, setShowEditComp] = useState(false);
  const [idHolder, setIdHolder] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const loadData = () => {
    fetch("http://localhost:5000/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadData();
  }, []);
  const singleDelete = () => {
    const requestOptions = {
      method: "DELETE",
    };
    const link = "http://localhost:5000/api/user/" + idHolder;
    fetch(link, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .finally(loadData)
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="userlist-maindiv">
      <h2>Userlist Management</h2>
      <button
        className="delBTN"
        onClick={() => {
          setShowAddComp(true);
        }}
      >
        <span className="text">Add New User</span>
        <span className="icon">+</span>
      </button>
      <br></br>
      <br></br>
      {deleted && (
        <div className="pop-up-top">
          <div className="pop-up">
            <i
              className="fa-solid fa-xmark questionx"
              onClick={() => {
                setDeleted(false);
              }}
            ></i>
            <br></br>
            <div id="pop-up-text">
              Are you sure you want to delete this user?
            </div>
            <div className="sub-pop">
              <button
                className="acceptbtn question"
                onClick={() => {
                  setDeleted(false);
                }}
              >
                No
              </button>
              <button
                className="acceptbtn question"
                onClick={() => {
                  singleDelete();
                  setDeleted(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {showAddcomp && (
        <AddnewUser loadData={loadData} setShowAddComp={setShowAddComp} />
      )}
      {showEditcomp && (
        <Updateuser
          setShowEditComp={setShowEditComp}
          loadData={loadData}
          showEditcomp={showEditcomp}
          data={data}
        />
      )}
      <br></br>
      <div className="userlist-table-div">
        <table id="userlist-table">
          <thead >
            <tr>
              <th id="userid-padding-left" >ID</th>
              <th id="name-padding-left">Username</th>
              <th id="surname-padding-left">Name</th>
              <th>Mail</th>
              <th>Password</th>
              <th>isAdmin</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody >
            {userList.map((user, i) => {
              if (user.name !== "admin") {
                return (
                  <tr key={i}>
                    <td id="userid-padding-left">{user.id}</td>
                    <td id="name-padding-left">{user.name}</td>
                    <td id="surname-padding-left">{user.surname}</td>
                    <td id="mail-padding-left">{user.mail}</td>
                    <td className="hidetext">{user.password}</td>
                    <td>{String(user.isAdmin)}</td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square edit"
                        onClick={() => {
                          setIdHolder(user.id);
                          setData(user);
                          setShowEditComp(true);
                          console.log(idHolder, "id");
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash dustbin"
                        onClick={() => {
                          setIdHolder(user.id);
                          setDeleted(true);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
