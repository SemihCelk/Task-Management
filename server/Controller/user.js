const express = require("express");
const router = express.Router();
const processDataUser = require("../Routes/user");
const serviceUser = new processDataUser();

//LİSTELEME 
router.get("/api/user", serviceUser.userList);
//status changer
router.put("/api/summary/user/:id/", serviceUser.changeUserStatus);
//userTABle
router.get("/api/project/userpage/user", serviceUser.UserPageTable);
//EKLEME
router.post("/api/user", serviceUser.AddNewUser);
// Güncelleme
router.put("/api/user/:id/", serviceUser.UpdateUser);
// Single Delete
router.delete("/api/user/:id/", serviceUser.UserDelete);
module.exports = router;
