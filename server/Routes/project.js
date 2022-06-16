const express = require("express");
const client = require("../dbconnection");
const app = express();
const ProjectService = require("../services/project.service");
const project = new ProjectService();
class dataProject {
  projectList = async (req, res, next) => {
    try {
      const projectlList = await project.list();
      res.json(projectlList.rows);
    } catch (error) {
      console.log("project");
      next(error);
    } 
  };
  addNewProject = async (req, res, next) => {
    try {
      const projectName = req.body.projectName;
      const userid = req.body.userid;
      const projectid = req.body.projectid;
      console.log(userid, projectName, projectid);
      const get = " select id from project where id=$1;";
      const checkproject = await project.newProject(
        projectid,
        );
      let response = checkproject.rows;
      console.log(response);
      if (response.length > 0) {
        return res.status(404).json("Same user and project already extist!");
      }
      const created = await project.newProjectStepTwo(
        projectName,
        projectid,
        userid
      );
      res.json([created.rows]);
    } catch (error) {
      console.log("hata");
      next(error);
    }
  };
  projectUserAdd = async (req, res, next) => {
    try {
      const userid = req.body.userid;
      const projectid = req.body.id;
      const projectidandUserid = await project.ProjectUserAdd(
        userid,
        projectid
      );
      let response = projectidandUserid.rows;
      if (response.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Same user and project already extist!",
        });
      }
      const userAdd = await project.ProjectUserAddStepTwo(userid, projectid);
      res.json(userAdd.rows);
    } catch (error) {
      next(error);
    }
  };
  ProjectUserDelete = async (req, res, next) => {
    const id = req.params.id
    try {
      const userdeleter = await project.Delete(id);
      res.json([userdeleter]);
    } catch (error) {
      next(error);
    }
  };
  projectDelete = async (req, res, next) => {
    try {
      const id = req.params.id
      console.log(req.params.id);
      const deleteprojectuser = "delete from projectuser where projectid= $1";
      const singledel = `delete from project where id = $1`;
      const userdeleter = await project.projectDelete(id)
      res.json(userdeleter.rows);
    } catch (error) {
      next(error);
    }
  };
  projectUserFliter = async (req, res, next) => {
    const projectid = req.params.id;
    console.log(projectid);
    try {
      const getir = await project.userfilter(projectid);
      const data = getir.rows;
      const filtrele = "SELECT id,name from userslist WHERE id=$1";
      let userInfo = [];
      for (let i = 0; i < data.length; i++) {
        const dataset = await client.query(filtrele, [data[i].userid]);
        userInfo[i] = dataset.rows;
      }
      res.json(userInfo);
    } catch (error) {
      next(error);
    }
  };
  projectUpdate = async (req, res, next) => {
    try {
      const projectName = req.body.projectName;
      const id = req.params.id
      console.log(projectName);
      const response = await project.projectUpdate(projectName,id)
      if (response.rows.length !== 1) {
        throw new Error("User not found");
      }
      res.json(response.rows[0]);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = dataProject;
