import { React, useState} from "react";

function Editsummary({ setShowedit, id, summaryUserfilter ,idHold,data,summaryData,tarih}) {
  const [userid, setUserid] = useState(data.taskuser);
  const [summary, setSummary] = useState(data.summary);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data.statusid);
  const [start, setStart] = useState(tarih[0]);
  const [finish, setFinish] = useState(tarih[1]);
  const editSummary = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        userid,summary,description,start,finish,idHold,status
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
          <span id="spanupdate">Edit Summary</span>
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
          <div >
          <select size={1}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          >
            <option value={"Open"}>Open</option>
            <option value={"Progress"}>Progress</option>
            <option value={"Done"}>Done</option>
          </select>
          </div>
          <br></br>
          <div className="scrollable">
          <select size={1}
            className="select"
            value={userid}
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          >
            <option value={7}>Choose One</option>
            {summaryUserfilter.map((item, i) => {
              if (item.projectid === id) {
                if(item.userid!==null)
                  return <option key={i}>{item.userid}</option>;
              }
            })}
          </select>
          </div>
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
