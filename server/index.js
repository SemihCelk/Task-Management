const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
//Connection port
app.listen(5000, () => {
  console.log("working on port 5000");
});
const loginRoute = require("./router/login")
app.use("/",loginRoute);
const userRoute = require("./router/user")
app.use("/",userRoute);
const projectRoute = require("./router/project")
app.use("/",projectRoute)
const summaryRoute = require("./router/summary")
app.use("/",summaryRoute)

app.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Unknown Error";
  res.status(500).json({
    message,
    stack: err.stack,
  });
});
