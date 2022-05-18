const pg = require("pg");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = new pg.Client({
  connectionString:
    "postgres://gzinafdz:l6E9pDuoWrWJ127aAZI6pOEmGRD9b1Oc@surus.db.elephantsql.com/gzinafdz",
});

client.connect();
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const rows = `SELECT id,name,password,"isAdmin" FROM userslist WHERE name=$1`;
    const get = await client.query(rows, [username]);

    if (username == "admin" && password == "admin") {
      const perm = get.rows[0].isAdmin;
      const idHolder = get.rows[0].id;
      const accessToken = jwt.sign({ idHolder, perm }, "secretkey");
      res.json({
        accessToken,
        username: username,
        isAdmin: perm,
        success: true,
      });
    } else {
      console.log(get.rows)
      if (get.rows.length > 0) { 
        const hashpassword = get.rows[0].password;
        const passDecoder = await bcrypt.compare(password, hashpassword);
        if(passDecoder){
          const perm = get.rows[0].isAdmin;
          const idHolder = get.rows[0].id;
          const accessToken = jwt.sign({ idHolder, perm }, "secretkey");
          res.json({
            accessToken,
            username: username,
            isAdmin: perm,
            userid: idHolder,
            success: true,
          });
        }
        else{
          res.status(404).json({
            success: false,
            error: "Incorrect entry",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          error: "Incorrect entry",
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
//Connection port
app.listen(5000, () => {
  console.log("working on port 5000");
});
//LİSTELEME
app.get("/api/user", async (req, res, next) => {
  try {
    const list = "select * from userslist order by id";
    const getir = await client.query(list);
    res.json(getir.rows);
  } catch (error) {
    next(error);
  }
});

//ProjectList
app.get("/api/projects", async (req, res, next) => {
  try {
    const projectlist = "SELECT * FROM public.project ORDER BY id";
    const projectgetir = await client.query(projectlist);
    res.json(projectgetir.rows);
  } catch (error) {
    console.log("hata");
    next(error);
  }
});
//Yeni Proje Ekleme
app.post("/api/projects", async (req, res, next) => {
  try {
    const projectName = req.body.projectName;
    const userid = req.body.userid;
    const projectid = req.body.projectid;
    console.log(userid, projectName, projectid);
    const get = " select id from project where id=$1;";
    const checkproject = await client.query(get, [projectid]);
    let response = checkproject.rows;
    console.log(response);
    if (response.length > 0) {
      return res.status(404).json("Same user and project already extist!");
    }
    const projectcreate =
      "insert into project(id,project_name) values ($1,$2) RETURNING * ;";
    const projectuser =
      "insert into projectuser(id,userid,projectid) values($1,$2,$3) RETURNING * ;";
    const created = await client.query(projectcreate, [projectid, projectName]);
    const userAdd = await client.query(projectuser, [
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
// //Project summary edit
app.put("/api/summary/:id/", async (req, res, next) => {
  console.log(req.params.id);
  const taskuser = req.body.userid;
  const summary = req.body.summary;
  const description = req.body.description;
  const start = req.body.start;
  const finish = req.body.finish;
  const status = req.body.status;
  const bos = null;
  try {
    console.log(taskuser, summary, description, start, finish, status);
    const update =
      "UPDATE task SET taskuser=$1, summary=$2, description=$3, start=$4, finish=$5 , statusid=$6 WHERE id=$7";
    if (taskuser === "Choose One") {
      const updater = await client.query(update, [
        bos,
        summary,
        description,
        start,
        finish,
        status,
        req.params.id,
      ]);
      res.json("null");
    } else {
      const updater = await client.query(update, [
        taskuser,
        summary,
        description,
        start,
        finish,
        status,
        req.params.id,
      ]);
      res.json("not null");
    }
  } catch (error) {
    next(error);
  }
});
//SummaryList
app.get("/api/projects/summary/", async (req, res, next) => {
  try {
    const summarylist = `SELECT * FROM task ORDER BY id`;
    const summarygetir = await client.query(summarylist);
    res.json(summarygetir.rows);
  } catch (error) {
    next(error);
  }
});
//Project user add
app.post("/api/projects/:id/", async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const projectid = req.body.id;
    const get = `select userid,projectid from projectuser where userid=$1 AND projectid=$2`;
    const projectidandUserid = await client.query(get, [userid, projectid]);
    let response = projectidandUserid.rows;
    if (response.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Same user and project already extist!",
      });
    }
    const projectuser =
      "insert into projectuser(userid,projectid) values($1,$2) returning*;";
    const userAdd = client.query(projectuser, [userid, projectid]);
    res.json(userAdd.rows);
  } catch (error) {
    next(error);
  }
});
// Project-user-delete
app.delete("/api/projects/user/:id/", async (req, res, next) => {
  try {
    const deleteduser = "delete from projectuser where userid=$1";
    const taskdel = "update task set taskuser=null where taskuser=$1";
    const userdeleter = await client.query(deleteduser, [req.params.id]);
    const usertaskdel = await client.query(taskdel, [req.params.id]);
    res.json([userdeleter]);
    console.log(req.params.id);
  } catch (error) {
    next(error);
  }
});
//Proje silme
app.delete("/api/projects/:id/", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const deleteprojectuser = "delete from projectuser where projectid= $1";
    const singledel = `delete from project where id = $1`;
    const delpuser = await client.query(deleteprojectuser, [req.params.id]);
    const userdeleter = await client.query(singledel, [req.params.id]);
    res.json(userdeleter);
  } catch (error) {
    next(error);
  }
});
//project user filter
app.get("/api/project/user", async (req, res, next) => {
  try {
    const list = "SELECT * FROM public.projectuser ORDER BY id";
    const getir = await client.query(list);
    res.json(getir.rows);
  } catch (error) {
    next(error);
  }
});
//proje update
app.put("/api/projects/:id/", async (req, res, next) => {
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
    const response = await client.query(update, [projectName, req.params.id]);
    if (response.rows.length !== 1) {
      throw new Error("User not found");
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

//EKLEME
app.post("/api/user", async (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  const mail = req.body.mail;
  const isAdmin = req.body.isAdmin;
  console.log(name, surname, password, mail);
  try {
    const checkuser = 'SELECT name,surname,mail,password,"isAdmin" from userslist where name=$1 AND surname=$2 AND mail=$3'
    const process = await client.query(checkuser,[name,surname,mail]);
    let total = process.rows;
    if(total.length > 0){
      return res.status(404).json({
        success: false,
        message: "Same user and project already extist!"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO userslist(name,surname,password,mail,"isAdmin") VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;

    const response = await client.query(sql, [
      name,
      surname,
      hashedPassword,
      mail,
      isAdmin,
    ]);
    res.json([response.rows]);
  } catch (error) {
    next(error);
  }
});
//summary ekleme
app.post("/api/project/summary", async (req, res, next) => {
  try {
    const projectid = req.body.id;
    const taskuser = req.body.userid;
    const summary = req.body.summary;
    const description = req.body.description;
    const start = req.body.start;
    const finish = req.body.finish;
    const status = req.body.status;
    const sql =
      "insert into task(projectid,taskuser,summary,description,start,finish,statusid) values($1,$2,$3,$4,$5,$6,$7) returning*;";
    const response = await client.query(sql, [
      projectid,
      taskuser,
      summary,
      description,
      start,
      finish,
      status,
    ]);
    res.json([response.rows]);
  } catch (error) {
    next(error);
  }
});
//summary silme
app.delete("/api/project/summary/:id/", async (req, res, next) => {
  try {
    const deleteduser = "delete from task where id=$1";
    const userdeleter = await client.query(deleteduser, [req.params.id]);
    res.json([userdeleter]);
    console.log(req.params.id);
  } catch (error) {
    next(error);
  }
});

// Güncelleme
app.put("/api/user/:id/", async (req, res, next) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const mail = req.body.mail;
    const isAdmin = req.body.isAdmin;
    const hashedPassword = await bcrypt.hash(password, 10);
    const update = `
      update userslist 
        set name =$1,
        surname= $2,
        mail=$3,
        password=$4,
        "isAdmin"=$5
      where id = $6
      RETURNING *
    `;
    const response = await client.query(update, [
      name,
      surname,
      mail,
      hashedPassword,
      isAdmin,
      req.params.id,
    ]);
    if (response.rows.length !== 1) {
      throw new Error("User not found");
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});
// Single Delete
app.delete("/api/user/:id/", async (req, res, next) => {
  try {
    const deleteprojectuser = "delete from projectuser where id=$1";
    const singledel = `delete from userslist where id = $1`;
    const userdeleter = await client.query(singledel, [req.params.id]);
    const delpuser = await client.query(deleteprojectuser, [req.params.id]);
    res.json(userdeleter);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Unknown Error";
  res.status(500).json({
    message,
    stack: err.stack,
  });
});
