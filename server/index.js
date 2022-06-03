const express = require("express");
const cors = require("cors");
const app = require("./app");
app.use(cors());
app.use(express.json());
require('dotenv').config()



// midlewares
const loginRoute = require("./Controller/login");
const userRoute = require("./Controller/user");
const projectRoute = require("./Controller/project");
const summaryRoute = require("./Controller/summary");

app.use("/", loginRoute);
app.use("/", userRoute);
app.use("/", projectRoute);
app.use("/", summaryRoute);
