import React, { useState, useEffect } from "react";
import AddNewProject from "./AddNewProject";
import Editproject from "./Editproject";
import Projectdetails from "./Projectdetails";
import Projectlist from "./Projectlist";
function Project() {
  const [userlist, setUserList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [details, setDetails] = useState([]);
  const [projectname, setProjectname] = useState();
  const [projectlist, setProjectlist] = useState(true);
  const [folder, setFolder] = useState(false);
  const [shownewproject, setshowproject] = useState(false);
  const [shownewprojectedit, setshowprojectedit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [id, setid] = useState();
  const [loading, setLoading] = useState(true);
  const [itemLoading, setitemLoading] = useState(true);
  const projectData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects", requestOptions)
      .then((response) => response.json())
      .then((result) => setProjects(result))
      .finally(setLoading(false))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    projectData();
  }, []);
  const loadData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log("error", error));
  };
  const singleDelete = () => {
    const requestOptions = {
      method: "DELETE",
    };
    const link = "http://localhost:5000/api/projects/" + id;
    fetch(link, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .finally(projectData)
      .catch((error) => console.log("error", error));
  };

  const summary = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/projects/summary/", requestOptions)
      .then((response) => response.json())
      .then((result) => setDetails(result))
      .finally(setitemLoading(false))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    summary();
  }, []);

  return (
    <div className="project">
      {deleted && (
        <div className="pop-up-top">
          <div className="pop-up-projectlist">
            <i
              className="fa-solid fa-xmark questionx"
              onClick={() => {
                setDeleted(false);
              }}
            ></i>
            <br></br>
            <div id="pop-up-text">
              Are you sure you want to delete this project?
            </div>
            <div className="sub-pop">
              <button
                className="acceptbtn question"
                onClick={() => {
                  setDeleted(false);
                }}
              >
                No
              </button>
              <button
                className="acceptbtn question"
                onClick={() => {
                  singleDelete();
                  setDeleted(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {shownewproject && (
        <AddNewProject
          setshowproject={setshowproject}
          projectData={projectData}
          userlist={userlist}
          loadData={loadData}

        />
      )}
      {shownewprojectedit && (
        <Editproject
          projectData={projectData}
          projects={projects}
          userlist={userlist}
          id={id}
          summary={summary}
          projectname={projectname}
          setshowprojectedit={setshowprojectedit}
        />
      )}
      {folder && (
        <Projectdetails
          projectname={projectname}
          setFolder={setFolder}
          details={details}
          id={id}
          summary={summary}
          setProjectlist={setProjectlist}
          userlist={userlist}
          itemLoading={itemLoading}

        />
      )}

      {projectlist && (
        <Projectlist
          setFolder={setFolder}
          folder={folder}
          projects={projects}
          loadData={loadData}
          setshowproject={setshowproject}
          setProjectname={setProjectname}
          summary={summary}
          setid={setid}
          setshowprojectedit={setshowprojectedit}
          setDeleted={setDeleted}
          setProjectlist={setProjectlist}
          loading={loading}
        />
      )}
    </div>
  );
}
export default Project;
