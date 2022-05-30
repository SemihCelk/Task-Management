const express = require("express");
const router = express.Router();
const connect = require("../dbconnection");

//ProjectList
router.get("/api/projects", async (req, res, next) => {
  try {
    const projectlist = "SELECT * FROM public.project ORDER BY id";
    const projectgetir = await connect.query(projectlist);
    res.json(projectgetir.rows);
  } catch (error) {
    console.log("hata");
    next(error);
  }
});
//Yeni Proje Ekleme
router.post("/api/projects", async (req, res, next) => {
  try {
    const projectName = req.body.projectName;
    const userid = req.body.userid;
    const projectid = req.body.projectid;
    console.log(userid, projectName, projectid);
    const get = " select id from project where id=$1;";
    const checkproject = await connect.query(get, [projectid]);
    let response = checkproject.rows;
    console.log(response);
    if (response.length > 0) {
      return res.status(404).json("Same user and project already extist!");
    }
    const projectcreate =
      "insert into project(id,project_name) values ($1,$2) RETURNING * ;";
    const projectuser =
      "insert into projectuser(id,userid,projectid) values($1,$2,$3) RETURNING * ;";
    const created = await connect.query(projectcreate, [
      projectid,
      projectName,
    ]);
    const userAdd = await connect.query(projectuser, [
      projectid,
      userid,
      projectid,
    ]);
    res.json([created.rows]);
  } catch (error) {
    console.log("hata");
    next(error);
  }
});

//Project user add
router.post("/api/projects/:id/", async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const projectid = req.body.id;
    const get = `select userid,projectid from projectuser where userid=$1 AND projectid=$2`;
    const projectidandUserid = await connect.query(get, [userid, projectid]);
    let response = projectidandUserid.rows;
    if (response.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Same user and project already extist!",
      });
    }
    const projectuser =
      "insert into projectuser(userid,projectid) values($1,$2) returning*;";
    const userAdd = connect.query(projectuser, [userid, projectid]);
    res.json(userAdd.rows);
  } catch (error) {
    next(error);
  }
});

// Project-user-delete
router.delete("/api/projects/user/:id/", async (req, res, next) => {
  try {
    const deleteduser = "delete from projectuser where userid=$1";
    const taskdel = "update task set taskuser=null where taskuser=$1";
    const userdeleter = await connect.query(deleteduser, [req.params.id]);
    const usertaskdel = await connect.query(taskdel, [req.params.id]);
    res.json([userdeleter]);
    console.log(req.params.id);
  } catch (error) {
    next(error);
  }
});
//Proje silme
router.delete("/api/projects/:id/", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const deleteprojectuser = "delete from projectuser where projectid= $1";
    const singledel = `delete from project where id = $1`;
    const delpuser = await connect.query(deleteprojectuser, [req.params.id]);
    const userdeleter = await connect.query(singledel, [req.params.id]);
    res.json(userdeleter);
  } catch (error) {
    next(error);
  }
});
//project user filter
router.get("/api/project/user/:id/", async (req, res, next) => {
  const projectid = req.params.id;
  console.log(projectid);
  try {
    const list = "SELECT userid,projectid from projectuser WHERE projectid=$1";
    const getir = await connect.query(list, [projectid]);
    const data = getir.rows;
    const filtrele = "SELECT id,name from userslist WHERE id=$1";
    let userInfo = [];
    for (let i = 0; i < data.length; i++) {
      const dataset = await connect.query(filtrele, [data[i].userid]);
      userInfo[i] = dataset.rows;
    }
    res.json(userInfo);
    console.log(userInfo);
  } catch (error) {
    next(error);
  }
});
//proje update
router.put("/api/projects/:id/", async (req, res, next) => {
  try {
    const projectName = req.body.projectName;
    const project_user = req.body.userid;
    console.log(projectName);
    const update = `
        update project 
        set	project_name=$1  
          WHERE id=$2
        RETURNING *
      `;
    const response = await connect.query(update, [projectName, req.params.id]);
    if (response.rows.length !== 1) {
      throw new Error("User not found");
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Unknown Error";
  res.status(500).json({
    message,
    stack: err.stack,
  });
});
module.exports = router;
