import { useState } from "react";
import "./useropop.css";
function UserPopup({ data, setPop,summary }) {
  const createdAt = new Date(data.start);
  const createdDate = createdAt.toLocaleDateString("tr-TR");
  const finishtime = new Date(data.finish);
  const finished = finishtime.toLocaleDateString("tr-TR");
  const [color, setColor] = useState("");
  const [work, setWork] = useState(true);
  const [x, setX] = useState("");
  const [isTrue,setTrue]=useState(false)
  const [statusData,setStatus]=useState()
  const [hata,setHata]=useState(false)
  if (work) {
    console.log("çalıştı");
    if (data.statusid === "Open") {
      setX("Open");
      setColor("Open");
    } else if (data.statusid === "Inprogress") {
      setX(" In Progress");
      setColor("Inprogress");
    } else {
      setColor("Done");
      setX(" Done");
    }
    const userid = localStorage.getItem("id")
    const convertToid= parseInt(userid)
    if(convertToid ===data.taskuser){
      setTrue(true)
    }
    else{
      setTrue(false)
    }
    setWork(false);
  }
const statusChanger=()=>{
  console.log(statusData)
  if(statusData ==="Choose One" || statusData===undefined){
    setHata(true)
  }
  else{
    setHata(false)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        statusData,
      }),
      redirect: "follow",
    };
    const callbackFunction1 = (result) => console.log(result);
    setPop(false)
    fetch("http://localhost:5000/api/summary/user/" + data.id, requestOptions)
      .then((response) => response.json())
      .then(callbackFunction1)
      .finally(summary)
      .catch((error) => console.log("error", error));
  
  }
 
}
  

  return (
    <div className="background">
      <div className="container user-pop-up">
        <i
          className="fa-solid fa-xmark user-x"
          onClick={() => {
            setPop(false);
          }}
        ></i>
        <br></br>
        <div className="text-white user-right">
          <div className="">
            Started Time:
            <span> {createdDate}</span>
          </div>
          <div className="">
            Finish Time:
            <span> {finished}</span>
          </div>
          <div>
            Status:  
            <span className={color}> {x}</span>
          </div>
          {
            isTrue && (
              <div className="hide-div">
              <select name="ask" id="hide-selected"
              onChange={(e)=>{
                  setStatus(e.target.value)
              }}>
                <option value="Choose One">Choose One</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Done">Done</option>
              </select>
              <button onClick={statusChanger} className="hide-btn">CHANGE</button>
              </div>
            )
          }{
            hata &&(
              <div id="red">invalid Status</div>
            )
          }

        </div>
        <div className="border-right-line">
          <div className="text-white user-left">
            <div className="">
              <div className="summary-user-header">{data.summary}</div>
            </div>
            <div style={{ marginBottom: "2%" }}>
              Description: 
              <div className="summary-border">{data.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserPopup;
