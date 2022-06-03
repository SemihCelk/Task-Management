const express = require("express");
const client = require("../dbconnection");
class ProjectService {
  async list() {
    const projectlist = "SELECT * FROM public.project ORDER BY id";
    return await client.query(projectlist);
  }
  async newProject(projectid) {
    const get = " select id from project where id=$1;";
    return await client.query(get, [projectid]);
  }
  async newProjectStepTwo(projectName, projectid, userid) {
    const projectcreate =
      "insert into project(id,project_name) values ($1,$2) RETURNING * ;";
    const projectuser =
      "insert into projectuser(id,userid,projectid) values($1,$2,$3) RETURNING * ;";
    const userAdd = await client.query(projectuser, [ 
      projectid,
      userid,
      projectid,
    ]);
    return await client.query(projectcreate, [projectid, projectName]);
  }
  async ProjectUserAdd(userid, projectid) {
    const get = `select userid,projectid from projectuser where userid=$1 AND projectid=$2`;
    return await client.query(get, [userid, projectid]);
  }
  async ProjectUserAddStepTwo(userid, projectid) {
    const projectuser =
      "insert into projectuser(userid,projectid) values($1,$2) returning*;";
    return client.query(projectuser, [userid, projectid]);
  }
  async Delete(id) {
    const deleteduser = "delete from projectuser where userid=$1";
    const taskdel = "update task set taskuser=null where taskuser=$1";
    const usertaskdel = await client.query(taskdel, [id]);
    return await client.query(deleteduser, [id]); 
  }
  async projectDelete(id) {
    const deleteprojectuser = "delete from projectuser where projectid= $1";
    const singledel = `delete from project where id = $1`;
    const delpuser = await client.query(deleteprojectuser, [id]);
    return await client.query(singledel, [id]);
  } 
  async userfilter(projectid) {
    const list ="SELECT userid,projectid from projectuser WHERE projectid=$1";
    return await client.query(list, [projectid]); 
  }
  async projectUpdate(projectName, id) {
    const update = ` 
        update project 
        set	project_name=$1   
          WHERE id=$2
        RETURNING *
      `;
    return await client.query(update, [projectName, id]);
  }
}

module.exports = ProjectService;
