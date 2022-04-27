import { useState } from "react";
import { useForm } from "react-hook-form";
import "./newuser.css";
function AddnewUser({ loadData, setShowAddComp }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const [mail, setMail] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const [throwError, setThrowError] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = () => {
    if(isAdmin ==="null"){
      console.log(isAdmin,)
      setIsAdmin(false)
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, password, mail,isAdmin }),
    };
    const url = "http://localhost:5000/api/user";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .finally(() => {
        loadData();
        setShowAddComp(false)
      })
      .catch((err) => console.log(err.data));
  };
  return (
    <div className="behind">
      <div className="container left">
        <div>
          <span id="spanupdate">Add User</span>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setShowAddComp(false);
            }}
          ></i>
        </div>
        <hr className="line" />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="update-data">
            <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="Name*"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name*</label>
            </div>
            <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="Surname*"
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Surname*</label>
            </div>
            <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="Password*"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password*</label>
            </div>
            <div className="group">
              <input
              autoComplete="off"
                type="text"
                placeholder="E-mail*"
                name="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                onChange={(e) => setMail(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>E-mail*</label>
            </div>{" "}
            <div style={{ marginTop: "-7%" }}>
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
            <button className="acceptbtn" >Add</button>
            <button
              className="acceptbtn"
              onClick={() => {
                setShowAddComp(false);
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
export default AddnewUser;
