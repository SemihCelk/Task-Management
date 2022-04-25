import { React, useState,useEffect } from "react";

function Editsummary({ setShowedit, id, summaryUserfilter ,idHold,data,summaryData,tarih}) {
  const [userid, setUserid] = useState(data.taskuser);
  const [summary, setSummary] = useState(data.summary);
  const [description, setDescription] = useState(data.description);
  const [start, setStart] = useState(tarih[0]);
  const [finish, setFinish] = useState(tarih[1]);
console.log(tarih[1])
  const editSummary = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        userid,summary,description,start,finish,idHold
      }),
      redirect: "follow",
    };
    const callbackFunction1 = (result) => console.log(result);
    setShowedit(false);
    fetch("http://localhost:5000/api/summary/"+idHold, requestOptions)
      .then((response) => response.json())
      .then(callbackFunction1)
      .finally(summaryData)
      .catch((error) => console.log("error", error));
  };   
  return (
    <div className="addprojectbehind">
      <div className="container addsummary">
        <div>
          <span id="spanupdate">Add Summary</span>
          <i
            className="fa-solid fa-xmark x-add-summary"
            onClick={() => {
                setShowedit(false);
            }}
          ></i>
        </div>
        <hr className="line" />
        <form>
          <input
            className="addsummary-input"
            placeholder="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          ></input>
          <br></br>
          <div className="textarea-div">
            <textarea
              className="textarea"
              cols="39"
              value={description}
              placeholder="description"
              onChange={(e) =>setDescription(e.target.value)}
            ></textarea>
          </div>
          <br></br>
          <input
            className="addsummary-input"
            placeholder="started time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          ></input>
          <input
            className="addsummary-input"
            placeholder="finish time"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            required
          ></input>
          <select
            className="select"
            value={userid}
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
              <option>Choose one</option>
            {summaryUserfilter.map((item, i) => {
              if (item.projectid === id) {
                
                  return <option key={i}>{item.userid}</option>;
              }
            })}
          </select>
        </form>
        <button className="acceptbtn btn-add-summary" onClick={editSummary}>
          Add
        </button>
        <button
          className="acceptbtn btn-add-summary"
          onClick={() => {
            setShowedit(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Editsummary;
