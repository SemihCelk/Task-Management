import { useState} from "react";
import React from "react";
import Login from "./Login/Login";
import Admin from "./Adminaster/Admin";
import UserPage from "./User/UserPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userSpecialid,setSpecialid]=useState(localStorage.getItem("id"))
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
const [name,setName]=useState(localStorage.getItem("name"));
  if (!token) {
    return <Login setToken={setToken} setIsAdmin={setIsAdmin} changeName={setName} setSpecialid={setSpecialid}/>;
  }
  return (
    <div>
      {isAdmin === true ? (
        <Admin setToken={setToken} setIsAdmin={setIsAdmin} name={name} setName={setName}/>
      ) : (
        <UserPage setToken={setToken} setIsAdmin={setIsAdmin} name={name} setName={setName} userSpecialid={userSpecialid}/>
      )}
    </div>
  );
}

export default App;
