const express = require("express");
const router = express.Router();
const connect = require("../dbconnection");
const summaryRoute = require("../Routes/summary");
const RouteSummary = new summaryRoute();
// //Project summary edit
router.put("/api/summary/:id/", RouteSummary.summaryEdit);
//SummaryList
router.get("/api/projects/summary/", RouteSummary.summaryList);
//summary ekleme
router.post("/api/project/summary", RouteSummary.AddSummary);
//summary silme
router.delete("/api/project/summary/:id/",RouteSummary.DeleteSummary);

module.exports = router;
 