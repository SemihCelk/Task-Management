const express = require("express");
const app = express();
const router = express.Router();
const auth = require("../Routes/auth");
const client = require("../dbconnection");
client.connect();
router.post("/login", auth);

module.exports = router;
