import React, { useState } from "react";
import "./addsummary.css"
export default function SummaryAdd({ id, setShowsummaryadd ,summaryData,idHold}) {
  const [userid, setUserid] = useState();
  const [summary, setSummary] = useState();
  const [description, setDescription] = useState();
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();
  const data = 27//silinecek
  const addTask = () => {
    console.log(id,summary,description,start,finish)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id,summary,description,start,finish,data }),
    }; 
    fetch("http://localhost:5000/api/project/summary", requestOptions)
      .then((res) => res.json())
      .finally(summaryData(id))
      .catch((err) => console.log(err.data));
  };
  return (
    <div className="addprojectbehind">
      <div className="container addsummary">
        <div>
          <span id="spanupdate">Add Summary</span>
          <i
            className="fa-solid fa-xmark x-add-summary"
            onClick={() => {
              setShowsummaryadd(false);
            }}
          ></i>
        </div>
        <hr className="line" />
        <form>
          <input
            className="addsummary-input"
            placeholder="summary"
            onChange={(e) => setSummary(e.target.value)}
            required
          ></input><br></br>
          <div className="textarea-div">
          <textarea className="textarea" cols="39"
          placeholder="description"
          onChange={(e)=>setDescription(e.target.value)}>
          </textarea></div><br></br>
          <input
            className="addsummary-input"
            placeholder="started time"
            onChange={(e) => setStart(e.target.value)}
            required
          ></input>
          <input
            className="addsummary-input"
            placeholder="finish time"
            onChange={(e) => setFinish(e.target.value)}
            required
          ></input>
          <select
            className="select-add-summary"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option>Choose one</option>
          </select>
        </form>
        <button className="acceptbtn btn-add-summary" onClick={addTask}>
          Add
        </button>
        <button
          className="acceptbtn btn-add-summary"
          onClick={() => {
            setShowsummaryadd(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
