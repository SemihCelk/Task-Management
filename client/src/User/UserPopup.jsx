import { useState } from "react";
import "./useropop.css";
function UserPopup({ data, setPop }) {
  const createdAt = new Date(data.start);
  const createdDate = createdAt.toLocaleDateString("tr-TR");
  const finishtime = new Date(data.finish);
  const finished = finishtime.toLocaleDateString("tr-TR");
  const [color, setColor] = useState("");
  const [work, setWork] = useState(true);
  const [x, setX] = useState("");
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
    setWork(false);
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
