const express = require("express");
const cors = require("cors");
const app = require("./app");
app.use(cors());
app.use(express.json());

// midlewares
const loginRoute = require("./api/login");
const userRoute = require("./api/user");
const projectRoute = require("./api/project");
const summaryRoute = require("./api/summary");

app.use("/", loginRoute);
app.use("/", userRoute);
app.use("/", projectRoute);
app.use("/", summaryRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Unknown Error";
  res.status(500).json({
    message,
    stack: err.stack,
  });
});
