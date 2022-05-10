import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./update.css";

function Updateuser({ loadData, data, setShowEditComp }) {
  const [name, setName] = useState(data.name);
  const [surname, setSurname] = useState(data.surname);
  const [password, setPassword] = useState(data.password);
  const [mail, setMail] = useState(data.mail);
  const [isAdmin, setIsAdmin] = useState(data.isAdmin);
  const [throwerror, setThrowError] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        name,
        surname,
        password,
        mail,
        isAdmin,
      }),
      redirect: "follow",
    };
    const callbackFunction1 = (result) => console.log(result);
    setShowEditComp(false);
    fetch("http://localhost:5000/api/user/" + data.id, requestOptions)
      .then((response) => response.json())
      .then(callbackFunction1)
      .finally(loadData) 
      .catch((error) => console.log("error", error));
    console.log(isAdmin);
  };
  return (
    <div className="behind">
      <div className="update container">
        <div>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setShowEditComp(false);
            }}
          ></i>
          <span id="spanupdate">Update Data</span>
        </div>
        <hr className="update-line"></hr>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="update-data">
            <div className="group-update">
              <input
              autoComplete="off"
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name</label>
            </div>
            <div className="group-update">
              <input
              autoComplete="off"
                type="text"
                placeholder="Surname"
                value={surname}
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Surname</label>
            </div>
            <div className="group-update">
              <input
              autoComplete="off"
                type="text"
                placeholder="password"
                value={password}
                name="date"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>password</label>
            </div>
            <div className="group-update">
              <input
              autoComplete="off"
                type="text"
                placeholder="E-mail"
                name="mail"
                value={mail}
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>E-mail</label>
            </div>
            <div style={{ marginTop: "-5%" }}>
              <span>Admin:</span>
              <select
                name="ask"
                id="ask"
                value={isAdmin} 
                onChange={(e) => {
                  setIsAdmin(e.target.value);
                }}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>
            <br></br>
            <button className="acceptbtn">Update</button>
            <button
              className="acceptbtn"
              onClick={(e) => {
                setShowEditComp(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updateuser;
