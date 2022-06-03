const express = require("express");
const client = require("../dbconnection");
class authentication {
   async auth(){
    const list = `select * from userslist order by id`;
    return await client.query(list);
   }
}
module.exports=authentication