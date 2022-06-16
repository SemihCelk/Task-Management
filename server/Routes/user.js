const express = require("express");
const app = express();
const serviceUser = require("../services/user.service");
const userService = new serviceUser();

class processDataUser {
  userList = async (req, res, next) => {
    try {
      const userlist = await userService.userlist();
      res.json(userlist.rows);
    } catch (error) {
      next(error);
    }
  };
  changeUserStatus = async (req, res, next) => {
    const status = req.body.statusData;
    const id  = req.params.id
    try {
      const user = await userService.changestatus(status,id);
      res.json(user.rows);
    } catch (error) {
      next(error);
    }
  };

  UserPageTable = async (req, res, next) => {
    try {
      const usertable = await userService.userPagetable();
      res.json(usertable.rows);
    } catch (error) {
      next(error);
    }
  };
  AddNewUser = async (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const mail = req.body.mail;
    const isAdmin = req.body.isAdmin;
    console.log(name, surname, password, mail);
    try {
      const process = await userService.newUser(name,surname,mail);
      let total = process.rows;
      if (total.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Same user and project already extist!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await userService.newUserStepTwo(name,surname,hashedPassword,mail,isAdmin)
      res.json([response.rows]);
    } catch (error) {
      next(error);
    }
  };
  UpdateUser = async (req, res, next) => {
    try {
      const id = req.params.id
      const password = req.body.password;
      const name = req.body.name;
      const surname = req.body.surname;
      const mail = req.body.mail;
      const isAdmin = req.body.isAdmin;
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await userService.updateUser(name,surname,mail,hashedPassword,isAdmin,id)
      if (response.rows.length !== 1) {
        throw new Error("User not found");
      }
      res.json(response.rows[0]);
    } catch (error) {
      next(error);
    }
  };
  UserDelete = async (req, res, next) => {
    const id = req.params.id
    try {
      const userdeleter = await userService.userDelete(id);
      res.json(userdeleter);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = processDataUser;
