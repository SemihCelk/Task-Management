import React, { useState, useEffect } from "react";
import "./projectdetails.css";
import SummaryAdd from "./SummaryAdd";
function Projectdetails({
  projectname,
  setFolder,
  details,
  id,
  setProjectlist,
  summary,
}) {
  const [showsummaryadd, setShowsummaryadd] = useState(false);
  const [del, setDel] = useState(false);
  const [idHold, setIdhold] = useState();
  const singleDelete = () => {
    const requestOptions = {
      method: "DELETE",
    };
    console.log(id);
    fetch("http://localhost:5000/api/project/summary/" + idHold, requestOptions)
      .then((response) => response.json())
      .finally(summary(id))
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
          setShowsummaryadd(true);
        }}
      >
        <span className="text">Add summary</span>
        <span className="icon">+</span>
      </button>
      <br></br>
      {showsummaryadd && (
        <SummaryAdd
          id={id}
          setShowsummaryadd={setShowsummaryadd}
          summaryData={summary}
          idHold={idHold}
        />
      )}
      <br></br>
      <div className="details-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>SUMMARY</th>
              <th>DESCRİPTİON</th>
              <th>STARTED</th>
              <th>FİNİSH</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.taskuser}</td>
                  <td>{item.summary}</td>
                  <td>{item.description}</td>
                  <td>{item.start}</td>
                  <td>{item.finish}</td>
                  <td>
                    <i className="fa-solid fa-pen-to-square edit"></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash dustbin"
                      onClick={() => {
                        setDel(true);
                        setIdhold(item.id);
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
