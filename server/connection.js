const pg = require("pg");
const express = require("express");

const client = new pg.Client({
    connectionString:
      "postgres://gzinafdz:l6E9pDuoWrWJ127aAZI6pOEmGRD9b1Oc@surus.db.elephantsql.com/gzinafdz",
  }); 
  
module.exports = client