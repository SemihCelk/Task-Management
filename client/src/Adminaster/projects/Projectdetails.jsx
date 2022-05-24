import React, { useState } from "react";
import "./projectdetails.css";
import SummaryAdd from "./SummaryAdd";
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
  const [userlist, setUserlist] = useState([]);
  const [summaryUserfilter, setUserfilter] = useState([]);
  const [data, setData] = useState([]);
  const [tarih, setTarih] = useState([]);
  const [worker, setWroker] = useState(true);

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

    fetch("http://localhost:5000/api/project/user/" + id, requestOptions)
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
  if (worker) {
    loadData();
    setWroker(false);
  }
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
          <div className="summary-pop-up">
            <i
              className="fa-solid fa-xmark questionx"
              onClick={() => {
                setDel(false);
              }}
            ></i>
            <br></br>
            <div id="pop-up-text">
              Are you sure you want to delete {data.summary}?
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
              <th>USER</th>
              <th>SUMMARY</th>
              <th>DESCRIPTION</th>
              <th>STATUS</th>
              <th>STARTED</th>
              <th>FINISH</th>
              <th>EDIT</th>
            </tr>
          </thead>
          {details.map((item, i) => {
            const createdAt = new Date(item.start);
            const createdDate = createdAt.toLocaleDateString("tr-TR");
            const finishtime = new Date(item.finish);
            const finished = finishtime.toLocaleDateString("tr-TR");
            let a = "";
            if (item.projectid === id) {
              userlist.map((data) => {
                if (data.id === item.taskuser) {
                  a = data.name;
                }
                else if(item.taskuser ===null){
                  a = " NULL"
                }
                console.log(a);
              });
            }
            if (item.projectid === id) {
              return (
                <tr key={i}>
                  <td>{item.id}</td> 
                  <td id="fill">{a}</td>
                  <td id="fill">{item.summary}</td>
                  <td id="fill">{item.description}</td>
                  <td className={item.statusid}>{item.statusid}</td>
                  <td>{createdDate}</td>
                  <td>{finished}</td>
                  <td>
                    <i
                      id="icon"
                      className="fa-solid fa-pen-to-square edit"
                      onClick={() => {
                        userfilter();
                        setShowedit(true);
                        setIdhold(item.id);
                        setData(item);
                        setTarih([createdDate, finished]);
                        loadData();
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash dustbin"
                      onClick={() => {
                        setDel(true);
                        setData(item);
                        setIdhold(item.id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
}
export default Projectdetails;
