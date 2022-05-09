import React from "react";
import { useState } from "react";
import "./login.css";

function Login({ setIsAdmin, setToken,changeName,setSpecialid }) {
  const [username, setName] = useState();
  const [password, setPasword] = useState();
  const [isLogin, setIsLogin] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const sendLogin = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ username, password }),
      redirect: "follow",
    };
    const url = "http://localhost:5000/login";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (typeof res.accessToken === "string") {
          setToken(res.accessToken);
          localStorage.setItem("token", res.accessToken);
          setIsAdmin(res.isAdmin);
          localStorage.setItem("isAdmin", res.isAdmin);
          changeName(res.username);
          localStorage.setItem("name", res.username);
          setSpecialid(res.userid)
          localStorage.setItem("id",res.userid)
        }
      });
  };
  return (
    <div className="Mainlogindiv">
      <div className="login-box">
        <h2>Log in</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              placeholder="User Name"
              name="username" autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) => setPasword(e.target.value)}
            ></input>
            <label>Password</label>
          </div>
          <div>
            <input type="checkbox" className="checkbox" onClick={togglePassword}></input>
            <div id="showwpassword">Show Password</div>
          </div>
          {isLogin && (
            <div style={{ color: "white" }}>
              "username or password incorrect!"
            </div>
          )}
          <p onClick={sendLogin}>Submit</p>
        </form>
      </div>
    </div>
  );
}
export default Login;
