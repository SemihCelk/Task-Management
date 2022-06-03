const express = require("express");
const client = require("../dbconnection");
const app = express();
const SummaryService = require("../services/summary.service");
const summaryService = new SummaryService();
class summaryRoute {
  summaryEdit = async (req, res, next) => {
    const taskuser = req.body.userid;
    const summary = req.body.summary;
    const description = req.body.description;
    const start = req.body.start;
    const finish = req.body.finish;
    const status = req.body.status;
    const bos = null;
    const id = req.params.id;
    try {
      console.log(taskuser, summary, description, start, finish, status);
      const update = await summaryService.summaryUpdate(
        taskuser,
        summary,
        description,
        start,
        finish,
        status,
        bos,
        id
      );
      res.json(update.rows);
    } catch (error) {
      next(error);
    }
  };
  summaryList = async (req, res, next) => {
    try {
      const summarygetir = await summaryService.summarylist();
      res.json(summarygetir.rows);
    } catch (error) {
      next(error);
    }
  };
  AddSummary = async (req, res, next) => {
    try {
      const projectid = req.body.id;
      const taskuser = req.body.userid;
      const summary = req.body.summary;
      const description = req.body.description;
      const start = req.body.start;
      const finish = req.body.finish;
      const status = req.body.status;
      const response = await summaryService.summaryAdd(
        projectid,
        taskuser,
        summary,
        description,
        start,
        finish,
        status
      );
      res.json([response.rows]);
    } catch (error) {
      next(error);
    }
  };
  DeleteSummary = async (req, res, next) => {
    const id = req.params.id
    try {
      const userdeleter = await summaryService.SummaryDelete(id);
      res.json([userdeleter]);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = summaryRoute;
