const express = require("express")
const router = express.Router()
const connect = require("../dbconnection")

//LİSTELEME
router.get("/api/user", async (req, res, next) => {
    try {
      const list = "select * from userslist order by id";
      const getir = await connect.query(list);
      res.json(getir.rows);
    } catch (error) {
      next(error);
    }
  });
  //status changer
router.put("/api/summary/user/:id/", async (req, res, next) => {
    const status = req.body.statusData;
    try {
      const update = "UPDATE task SET statusid=$1 WHERE id=$2";
      const updater = await connect.query(update, [status, req.params.id]);
      res.json(updater.rows);
    } catch (error) {
      next(error);
    }
  });

  //userTABle
router.get("/api/project/userpage/user", async (req, res, next) => {
    try {
      const list = "SELECT userid,projectid from projectuser";
      const getir = await connect.query(list);
      console.log(getir.rows);
      res.json(getir.rows);
    } catch (error) {
      next(error);
    }
  });
  //EKLEME
router.post("/api/user", async (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const mail = req.body.mail;
    const isAdmin = req.body.isAdmin;
    console.log(name, surname, password, mail);
    try {
      const checkuser =
        'SELECT name,surname,mail,password,"isAdmin" from userslist where name=$1 AND surname=$2 AND mail=$3';
      const process = await connect.query(checkuser, [name, surname, mail]);
      let total = process.rows;
      if (total.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Same user and project already extist!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO userslist(name,surname,password,mail,"isAdmin") VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;
  
      const response = await connect.query(sql, [
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
// Güncelleme
router.put("/api/user/:id/", async (req, res, next) => {
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
      const response = await connect.query(update, [
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
  router.delete("/api/user/:id/", async (req, res, next) => {
    try {
      const deleteprojectuser = "delete from projectuser where id=$1";
      const singledel = `delete from userslist where id = $1`;
      const userdeleter = await connect.query(singledel, [req.params.id]);
      const delpuser = await connect.query(deleteprojectuser, [req.params.id]);
      res.json(userdeleter);
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
  