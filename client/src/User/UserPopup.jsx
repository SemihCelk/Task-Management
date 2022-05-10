import { useState } from "react";
import "./useropop.css";
function UserPopup({ data, setPop }) {
  const createdAt = new Date(data.start);
  const createdDate = createdAt.toLocaleDateString("tr-TR");
  const finishtime = new Date(data.finish);
  const finished = finishtime.toLocaleDateString("tr-TR");
  const [color, setColor] = useState("");
  const [work, setWork] = useState(true);
  if (work) {
    console.log("çalıştı");
    if (data.statusid === "Open") setColor("Open");
    else if (data.statusid === "Progress") setColor("Progress");
    else {
      setColor("Done");
    }
    setWork(false);
  }
  console.log(color);
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
            {createdDate}
          </div>
          <div className="">
            Finish Time:
            {finished}
          </div>
          <div>
            Status:
            <span className={color}> {data.statusid}</span>
          </div>
        </div>
        <div className="border-right-line">
          <div className="text-white user-left">
            <div className="">
              <div className="summary-user-header">{data.summary}</div>
            </div>
            <div>
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
