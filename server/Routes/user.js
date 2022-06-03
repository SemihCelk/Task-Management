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
// const changeUserStatus = async (req, res, next) => {
//   const status = req.body.statusData;
//   try {
//     const user = await userService.changestatus();
//     res.json(user);
//   } catch (error) {
//     next(error);
// }};
// const userList = async (req, res, next) => {
//   try {
// const userlist = await userService.userList();
//     res.json(getir.rows);
//   } catch (error) {
//     next(error);
//   }
// };
// const UserPageTable = async (req, res, next) => {
//   try {
//    const usertable = await userService.userPagetable()
//     console.log(usertable.rows);
//     res.json(usertable.rows);
//   } catch (error) {
//     next(error);
//   }
// };
// const AddNewUser = async (req, res, next) => {
//   const name = req.body.name;
//   const surname = req.body.surname;
//   const password = req.body.password;
//   const mail = req.body.mail;
//   const isAdmin = req.body.isAdmin;
//   console.log(name, surname, password, mail);
//   try {
//     const checkuser =
//       'SELECT name,surname,mail,password,"isAdmin" from userslist where name=$1 AND surname=$2 AND mail=$3';
//     const process = await connect.query(checkuser, [name, surname, mail]);
//     let total = process.rows;
//     if (total.length > 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Same user and project already extist!",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = `INSERT INTO userslist(name,surname,password,mail,"isAdmin") VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;

//     const response = await connect.query(sql, [
//       name,
//       surname,
//       hashedPassword,
//       mail,
//       isAdmin,
//     ]);
//     res.json([response.rows]);
//   } catch (error) {
//     next(error);
//   }
// };
// const UpdateUser = async (req, res, next) => {
//   try {
//     const password = req.body.password;
//     const name = req.body.name;
//     const surname = req.body.surname;
//     const mail = req.body.mail;
//     const isAdmin = req.body.isAdmin;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const update = `
//       update userslist
//         set name =$1,
//         surname= $2,
//         mail=$3,
//         password=$4,
//         "isAdmin"=$5
//       where id = $6
//       RETURNING *
//     `;
//     const response = await connect.query(update, [
//       name,
//       surname,
//       mail,
//       hashedPassword,
//       isAdmin,
//       req.params.id,
//     ]);
//     if (response.rows.length !== 1) {
//       throw new Error("User not found");
//     }
//     res.json(response.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// };
// const UserDelete = async (req, res, next) => {
//   try {
//     const deleteprojectuser = "delete from projectuser where id=$1";
//     const singledel = `delete from userslist where id = $1`;
//     const userdeleter = await connect.query(singledel, [req.params.id]);
//     const delpuser = await connect.query(deleteprojectuser, [req.params.id]);
//     res.json(userdeleter);
//   } catch (error) {
//     next(error);
//   }
// };
app.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Unknown Error";
  res.status(500).json({
    message,
    stack: err.stack,
  });
});

module.exports = processDataUser;
