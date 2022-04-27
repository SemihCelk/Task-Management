import { useState } from "react";
import "./useropop.css";
function UserPopup({ subdetail, setFolderpop }) {
  const createdAt = new Date(subdetail.start);
  const createdDate = createdAt.toLocaleDateString("tr-TR");
  const finishtime = new Date(subdetail.finish);
  const finished = finishtime.toLocaleDateString("tr-TR");
  const [color, setColor] = useState("");
  const [work, setWork] = useState(true);
  if (work) {
    console.log("çalıştı")
    if (subdetail.statusid === "Open") setColor("green");
    else if (subdetail.statusid === "Progress") setColor("orange");
    else{
      setColor("red");
    }
    setWork(false);
  }
  console.log(color);
  return (
    <div className="background">
      <div className="container user-pop-up">
        <i
          className="fa-solid fa-xmark user-pop-up-x"
          onClick={() => {
            setFolderpop(false);
          }}
        ></i>
        <br></br>
        <div className="text-white user-right">
          <div className="">
            Started Time:
            {createdDate}
          </div>
          <div className="">
            Finish Time:
            {finished}
          </div>
          <div>
            Status:
            <span className={color}> {subdetail.statusid}</span>
          </div>
        </div>
        <div className="text-white user-left">
          <div className="">
            Summary:
            <div className="summary-border">{subdetail.summary}</div>
          </div>
          <div>
            Description:
            <div className="summary-border">{subdetail.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserPopup;
