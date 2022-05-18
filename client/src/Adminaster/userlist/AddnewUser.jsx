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
  const [passwordErr, setPasswordErr] = useState(false);
  const [addErr,setAdderr]=useState()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
 
    if (isAdmin === "null") {
      console.log(isAdmin);
      setIsAdmin(false);
    }
    let lenght = password.length;
    if (
      name.startsWith(" ") || 
      surname.endsWith(" ") ||
      password.startsWith(" ") 
      || lenght < 7
    ) {
      console.log(lenght,"lenght")
      setThrowError(true);
      setPasswordErr(true);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, password, mail, isAdmin }),
      };
      const url = "http://localhost:5000/api/user";
      fetch(url, requestOptions)
      .then((response) => response.json())
        .then((res)=>{
          if(res.success===false){
            setAdderr(res.message)
          }
          else{
            setShowAddComp(false);
          }
        })
        .finally(() => {
          loadData();
        })
        .catch((err) => console.log(err.data));
    }
  };
  console.log(addErr)
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
            <div className="add-user-group">
              <input
                autoComplete="off"
                type="text"
                placeholder="UserName*"
                name="UserName"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>UserName*</label>
            </div>
            <div className="add-user-group">
              <input
                autoComplete="off"
                type="text"
                placeholder="Name*"
                name="Name"
                onChange={(e) => setSurname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name*</label>
            </div>
            <div className="add-user-group">
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
              {
                passwordErr&&(
                  <div id="red">You have to use minimum 8 character</div>
                )
              }
            </div>
            <div className="add-user-group">
              <input
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
                onChange={(e) => setMail(e.target.value)}
              />
              {errors.Email && <div id="red">{errors.Email.message}</div>}
              {throwError && <div id="red">Invalid character</div>}
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email*</label>
            </div>
            <div>
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
          <div style={{ color: "red" }}>{addErr}</div>
            <br></br>
            <button className="acceptbtn">Add</button>
            <button
             className="acceptbtn"
             onClick={()=>{
               setShowAddComp(false)
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
