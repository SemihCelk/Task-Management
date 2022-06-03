const express = require("express");
const client = require("../dbconnection");
class SummaryService {
  async summaryUpdate(
    taskuser,
    summary,
    description,
    start,
    finish,
    status,
    bos,
    id
  ) {
    const update =
      "UPDATE task SET taskuser=$1, summary=$2, description=$3, start=$4, finish=$5 , statusid=$6 WHERE id=$7";
    if (taskuser === "Choose One") {
      return await client.query(update, [
        bos,
        summary,
        description,
        start,
        finish,
        status,
        id,
      ]);
    } else {
      return await client.query(update, [
        taskuser,
        summary,
        description,
        start,
        finish,
        status,
        id,
      ]);
    }
  }
  async summarylist() {
    const summarylist = `SELECT * FROM task ORDER BY id`;
    return await client.query(summarylist);
  }
  async summaryAdd(
    projectid,
    taskuser,
    summary,
    description,
    start,
    finish,
    status
  ) {
    const sql =
      "insert into task(projectid,taskuser,summary,description,start,finish,statusid) values($1,$2,$3,$4,$5,$6,$7) returning*;";
    return await client.query(sql, [
      projectid,
      taskuser,
      summary,
      description,
      start,
      finish,
      status,
    ]);
  }
  async SummaryDelete(id){
    const deleteduser = "delete from task where id=$1";
      return await client.query(deleteduser, [id]);
  }
}
module.exports = SummaryService;
