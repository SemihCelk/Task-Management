const express = require("express");
const client = require("../dbconnection");
class UserService {
  async userlist() {
    const list = "select * from userslist order by id";
    return await client.query(list);
  }
  async changestatus(status, id) {
    const update = "UPDATE task SET statusid=$1 WHERE id=$2";
    return await client.query(update, [status, id]);
  }
  async userPagetable() {
    const list = "SELECT userid,projectid from projectuser";
    return await client.query(list);
  }
  async newUser(name, surname, mail) {
    const checkuser =
      'SELECT name,surname,mail,password,"isAdmin" from userslist where name=$1 AND surname=$2 AND mail=$3';
    return await client.query(checkuser, [name, surname, mail]);
  }
  async newUserStepTwo(name, surname, hashedPassword, mail, isAdmin) {
    const sql = `INSERT INTO userslist(name,surname,password,mail,"isAdmin") VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;
    return await client.query(sql, [
      name,
      surname,
      hashedPassword,
      mail,
      isAdmin,
    ]);
  }
  async updateUser(name, surname, mail, hashedPassword, isAdmin, id) {
    const update = `
    update userslist 
      set name =$1,
      surname= $2,
      mail=$3,
      password=$4,
      "isAdmin"=$5
    where id = $6
    RETURNING *
  `;

    return await connect.query(update, [
      name,
      surname,
      mail,
      hashedPassword,
      isAdmin,
      id,
    ]);
  }
  async userDelete(id){
    const deleteprojectuser = "delete from projectuser where id=$1";
    const singledel = `delete from userslist where id = $1`;
    const delpuser = await connect.query(deleteprojectuser, [id])
    return await connect.query(singledel, [id]);
  }
}

module.exports = UserService;
