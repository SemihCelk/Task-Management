import React, { useState } from "react";
import "./addsummary.css";
export default function SummaryAdd({
  id,
  setShowsummaryadd,
  summaryData,
  summaryUserfilter,
}) {
  const [userid, setUserid] = useState();
  const [summary, setSummary] = useState();
  const [description, setDescription] = useState();
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();
  const addTask = () => {
    console.log(id, summary, description, userid,start, finish);
    const status = "Open"
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, summary, description, start, finish, userid,status }),
    };
    console.log(userid,"ssss")
    fetch("http://localhost:5000/api/project/summary", requestOptions)
      .then((res) => res.json())
      .then(setShowsummaryadd(false))
      .finally(summaryData)
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
        <form className="form-add-summary">
        <div className="group">
              <input
              autoComplete="off"
                type="text"
            placeholder="Summary"
                name="name"
                onChange={(e) => setSummary(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Summary</label>
            </div>
          <div className="textarea-div">
            <textarea
              className="textarea"
              cols="39"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="group">
              <input
              placeholder="started time"
              autoComplete="off"
                type="text"
                name="name"
                onChange={(e) => setStart(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>started time</label>
            </div>
            <div className="group">
              <input
              placeholder="finish time"
              autoComplete="off"
                type="text"
                name="name"
                onChange={(e) => setFinish(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>finish time</label>
            </div>
          <select
            className="select"
            onChange={(e) => {
              setUserid(e.target.value)
              console.log(e.target.value);
            }}
            value={userid}
          >
            <option value={7}>Choose One</option>
            {summaryUserfilter.map((item, i) => {
              if (item.projectid === id) {
                if(item.userid!==null)
                  return <option key={i} value={item.userid}>{item.userid}</option>;
              }
            })}
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
