const pg = require("pg");
const express = require("express");
require('dotenv').config()
const dbConnect =process.env.DB_KEY

const client = new pg.Client({
    connectionString:dbConnect,
  }); 
  
module.exports = client