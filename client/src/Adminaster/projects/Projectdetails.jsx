import React, { useState, useEffect } from "react";
import "./projectdetails.css";
import SummaryAdd from "./SummaryAdd";
import Projectuseradd from "./Projectuseradd";
import Editsummary from "./Editsummary";
function Projectdetails({
  projectname,
  setFolder,
  details,
  id,
  setProjectlist,
  summary,
  itemLoading,
}) {
  const [showEdit, setShowedit] = useState(false);
  const [showsummaryadd, setShowsummaryadd] = useState(false);
  const [del, setDel] = useState(false);
  const [idHold, setIdhold] = useState();
  const [userAdd, setUseradd] = useState(false);
  const [userlist, setUserlist] = useState([]);
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [data, setData] = useState([]);
  const [tarih, setTarih] = useState([]);
  const loadData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserlist(result))
      .catch((error) => console.log("error", error));
  };

  const userfilter = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/project/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserfilter(result))
      .catch((error) => console.log("error", error));
  };

  const singleDelete = () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://localhost:5000/api/project/summary/" + idHold, requestOptions)
      .then((response) => response.json())
      .finally(summary)
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="details-box">
      <i
        className="fa-solid fa-xmark questionx project-details-x"
        onClick={() => {
          setFolder(false);
          setProjectlist(true);
        }}
      ></i>
      {del && (
        <div className="pop-up-top">
          <div className="pop-up">
            <i
              className="fa-solid fa-xmark questionx"
              onClick={() => {
                setDel(false);
              }}
            ></i>
            <br></br>
            <div id="pop-up-text">
              Are you sure you want to delete this user?
            </div>
            <div className="sub-pop">
              <button
                className="acceptbtn question"
                onClick={() => {
                  setDel(false);
                }}
              >
                No
              </button>
              <button
                className="acceptbtn question"
                onClick={() => {
                  singleDelete();
                  setDel(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <h2>{projectname}</h2>
      <button
        className="delBTN details-right-btn"
        onClick={() => {
          loadData();
          setUseradd(true);
        }}
      >
        <span className="text">Add User</span>
        <span className="icon">+</span>
      </button>
      <button
        className="delBTN details-right-btn"
        onClick={() => {
          userfilter();
          setShowsummaryadd(true);
        }}
      >
        <span className="text">Add summary</span>
        <span className="icon">+</span>
      </button>
      <br></br>
      {itemLoading && <div>Loading...</div>}
      {showsummaryadd && (
        <SummaryAdd
          id={id}
          setShowsummaryadd={setShowsummaryadd}
          summaryData={summary}
          summaryUserfilter={summaryUserfilter}
        />
      )}
      {userAdd && (
        <Projectuseradd setUseradd={setUseradd} userlist={userlist} id={id} />
      )}
      {showEdit && (
        <Editsummary
          summaryUserfilter={summaryUserfilter}
          id={id}
          setShowedit={setShowedit}
          idHold={idHold}
          data={data}
          tarih={tarih}
          summaryData={summary}
        />
      )}
      <br></br>
      <div className="userlist-table-div">
        <table id="userlist-table">
          <thead>
          <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>SUMMARY</th>
              <th>DESCRİPTİON</th>
              <th>Status</th>
              <th>STARTED</th>
              <th>FİNİSH</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, i) => {
              const createdAt = new Date(item.start);
              const createdDate = createdAt.toLocaleDateString("tr-TR");
              const finishtime = new Date(item.finish);
              const finished = finishtime.toLocaleDateString("tr-TR");
              if (item.projectid === id)
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.taskuser}</td>
                    <td id="fill">{item.summary}</td>
                    <td id="fill">{item.description}</td>
                    <td className={item.statusid}>{item.statusid}</td>
                    <td>{createdDate}</td>
                    <td>{finished}</td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square edit"
                        onClick={() => {
                          userfilter();
                          setShowedit(true);
                          setIdhold(item.id);
                          setData(item);
                          setTarih([createdDate, finished]);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash dustbin"
                        onClick={() => {
                          setDel(true);
                          setIdhold(item.id);
                          console.log(item.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Projectdetails;
