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
  const [passwordErr, setPasswordErr] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (e) => {
    let lenght = password.length;
    if (
      name.startsWith(" ") ||
      surname.endsWith(" ") ||
      password.startsWith(" ")
      || lenght < 7
    ) {
      setThrowError(true);
      setPasswordErr(true)
    } else {
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
    }
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
                placeholder="Password"
                value={password}
                name="date"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
              {
                passwordErr&&(
                  <div id="red">You have to use Minimum 8 character</div>
                )
              }
            </div>
            <div className="group-update">
              <input
                value={mail}
                type="text"
                placeholder="Email*"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "invalid email address",
                  },
                })}
                autoComplete="off"
                onChange={(e) => {
                  setMail(e.target.value);
                }}
              />
              {errors.Email && <div id="red">{errors.Email.message}</div>}
              {throwerror && <div id="red">Invalid character</div>}
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email*</label>
            </div>
            <div style={{ marginTop: "-5%" }}>
              <span>IsAdmin:</span>
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
