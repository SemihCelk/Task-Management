import React, { useState } from "react";
import UserPopup from "./UserPopup";

function Userpagedetails({
  userid,
  projectid,
  details,
  setFolderpop,
  setShow,
}) {
  const [data, setData] = useState();
  const [pop, setPop] = useState(false);
  console.log(projectid);
  console.log(details);
  if (userid.userid)
    return (
      <div className="summary-user-table">
        <i
          className="fa-solid fa-xmark user-pop-up-x"
          onClick={() => {
            setFolderpop(false);
            setShow(true);
          }}
        ></i>

        <h2 id="h2">SummaryList</h2>
        {pop && <UserPopup data={data} setPop={setPop} />}
        <div className="project-table">
          <table style={{ color: "white" }}>
            <thead>
              <tr>
                <th>Summary</th>
                <th>Description</th>
                <th>Status</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, i) => {
                if (
                  userid.userid === item.taskuser &&
                  projectid.id === item.projectid
                ) {
                  return (
                    <tr key={i}>
                      <td id="fill">{item.summary}</td>
                      <td id="fill">{item.description}</td>
                      <td className={item.statusid}>{item.statusid}</td>
                      <td>
                        <i
                          className="fa-solid fa-folder-open open-folder"
                          onClick={() => {
                            setData(item);
                            setPop(true);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Userpagedetails;
