import React, { useState } from "react";
import "./addsummary.css";
import { useForm } from "react-hook-form";
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
  const [hataSummary, setHatasummary] = useState(false);
  const [descriptionerr, setDescriptionerr] = useState(false);
  const { handleSubmit, register } = useForm("");
  const onSubmit = () => {
    const isValidDate = Date.parse(start);
    const isValidDatef = Date.parse(finish);
    if (
      summary === Number ||
      description === Number ||
      isNaN(isValidDate) ||
      isNaN(isValidDatef) ||
      description === ""
    ) {
      setHatasummary(true);
    } else if (description === "") {
      setDescriptionerr(true);
    } else {
      console.log(id, summary, description, userid, start, finish);
      console.log(userid);
      const status = "Open";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          summary,
          description,
          start,
          finish,
          userid,
          status,
        }),
      };
      fetch("http://localhost:5000/api/project/summary", requestOptions)
        .then((res) => res.json())
        .then(setShowsummaryadd(false))
        .finally(summaryData)
        .catch((err) => console.log(err.data));
    }
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
        <form className="form-add-summary" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-summary-group" style={{ marginBottom: "2%" }}>
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
            <div style={{ marginBottom: "1%" }}>Description</div>
            <textarea
              className="textarea"
              cols="39"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {descriptionerr && <div>Please fill the gaps.</div>}
          </div>
          <div className="add-summary-group">
            <input
              placeholder="Started Time"
              autoComplete="off"
              type="text"
              name="name"
              onChange={(e) => setStart(e.target.value)}
              required
            ></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Started Time</label>
          </div>
          <div className="add-summary-group">
            <input
              placeholder="Finish Time"
              autoComplete="off"
              type="text"
              name="name"
              onChange={(e) => setFinish(e.target.value)}
              required
            ></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Finish Time</label>
            {hataSummary && <div id="add-summary-err">Invalid data type</div>}
          </div>
          <div className="sub-choose">
            <span className="sub-choose-span">Select User:</span>

            <select
              className="select"
              onChange={(e) => {
                setUserid(e.target.value);
              }}
              value={userid}
            >
              <option value={7}>Choose One</option>;
              {summaryUserfilter.map((item, i) => {
                return (
                  item.map((data,key)=>{
                    return <option key={key} value={data.id}>{data.name}</option>
                  })
                )
              })}
            </select>
          </div>
          <button
            className="acceptbtn btn-add-summary"
            style={{ marginRight: "13%" }}
          >
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
        </form>
      </div>
    </div>
  );
}
