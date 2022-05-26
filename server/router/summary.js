const express = require("express")
const router = express.Router()
const connect = require("../connection")


// //Project summary edit
router.put("/api/summary/:id/", async (req, res, next) => {
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
        const updater = await connect.query(update, [
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
        const updater = await connect.query(update, [
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
  router.get("/api/projects/summary/", async (req, res, next) => {
    try {
      const summarylist = `SELECT * FROM task ORDER BY id`;
      const summarygetir = await connect.query(summarylist);
      res.json(summarygetir.rows);
    } catch (error) {
      next(error);
    }
  });
  //summary ekleme
router.post("/api/project/summary", async (req, res, next) => {
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
      const response = await connect.query(sql, [
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
  router.delete("/api/project/summary/:id/", async (req, res, next) => {
    try {
      const deleteduser = "delete from task where id=$1";
      const userdeleter = await connect.query(deleteduser, [req.params.id]);
      res.json([userdeleter]);
      console.log(req.params.id);
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
  module.exports= router