const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


const connect = require("../dbconnection");
connect.connect();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const key = process.env.SECRET_KEY
  try {
    const list = `select * from userslist order by id`;
    const process = await connect.query(list);
    const data = process.rows;
    const user = data.find((u) => {
      return u.name === username;
    });
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Incorrect entry",
      });
    } else {
      const passDecoder = await bcrypt.compare(password, user.password);
      if (passDecoder) {
        const accessToken = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          key
        );
        res.status(200).json({
          username: user.name,
          isAdmin: user.isAdmin,
          accessToken,
          userid: user.id,
          success: true,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Incorrect entry",
        });
      }
    }
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
module.exports = router;
