const pg = require("pg");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const client = new pg.Client({
  connectionString:
    "postgres://gzinafdz:l6E9pDuoWrWJ127aAZI6pOEmGRD9b1Oc@surus.db.elephantsql.com/gzinafdz",
});
pg.types.setTypeParser(1114, function(stringValue) {
  return stringValue;  //1114 for time without timezone type
});
client.connect();
app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  client.query(`select * from userslist order by id`, (err, result) => {
    if (!err) {
      const userlist = result.rows;
      const user = userlist.find((u) => {
        return u.name === username && u.password === password;
      });
      if (user) {
        if (user.isAdmin) {
          const accessToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            "secretkey"
          );
          res.json({
            username: user.name,
            isAdmin: user.isAdmin,
            accessToken,
          });
        } else {
          const accessToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            "userkey"
          );
          res.json({
            username: user.name,
            isAdmin: user.isAdmin,
            accessToken,
            userid: user.id
          });
        }
      }
    } else {
      res.status(401).json({ loginError: "username or password incorrect!" });
    }
  });
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secretkey", (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not access");
  }
};
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
    console.log(req.params.id)
    const taskuser = req.body.userid;
    const summary = req.body.summary;
    const description = req.body.description;
    const start = req.body.start;
    const finish = req.body.finish;
    const status = req.body.status
    console.log(status)
    try {
      console.log(taskuser,summary,description,start,finish,status)
      const update =
        "UPDATE task SET taskuser=$1, summary=$2, description=$3, start=$4, finish=$5 , statusid=$6 WHERE id=$7";
      const updater = await client.query(update, [ 
        taskuser,
        summary,
        description, 
        start, 
        finish,
        status,
        req.params.id
      ]); 
      res.json("a");
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
    console.log("hata");
    next(error);
  }
});
//Project user add
app.post("/api/projects/:id/", async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const projectid = req.body.id;
    const projectuser =
      "insert into projectuser(userid,projectid) values($1,$2) returning*;";
    const userAdd = await client.query(projectuser, [userid, projectid]);
    res.json(userAdd.rows);
  } catch (error) {
    console.log("hata");
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
//Proje silme
app.delete("/api/projects/:id/", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deleteprojectuser = "delete from projectuser where projectid= $1";
    const singledel = `delete from project where id = $1`;
    const delpuser = await client.query(deleteprojectuser, [req.params.id]);
    const singledeleter = await client.query(singledel, [req.params.id]);
    res.json(singledeleter);
  } catch (error) {
    next(error);
  }
});
//EKLEME
app.post("/api/user", async (req, res, next) => {
  try {
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const mail = req.body.mail;
    const isAdmin = req.body.isAdmin;
    console.log(name, surname, password, mail);
    const sql = `INSERT INTO userslist(name,surname,password,mail,"isAdmin") VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;
    const response = await client.query(sql, [
      name,
      surname,
      password,
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
      status
    ]);
    res.json([response.rows]);
  } catch (error) {
    next(error);
  }
});
//summary silme
app.delete("/api/project/summary/:id/", async (req, res, next) => {
  try {
    const deletesummary = "delete from task where id=$1";
    const singledeleter = await client.query(deletesummary, [req.params.id]);
    res.json([singledeleter]);
    console.log(req.params.id)
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
      password,
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
    const singledeleter = await client.query(singledel, [req.params.id]);
    const delpuser = await client.query(deleteprojectuser, [req.params.id]);
    res.json(singledeleter);
    console.log("silimdi.")
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
