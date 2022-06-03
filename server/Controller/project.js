const express = require("express");
const router = express.Router();
const dataProject = require("../Routes/project")
const projectData = new dataProject()
//ProjectList
router.get("/api/projects", projectData.projectList);
//Yeni Proje Ekleme
router.post("/api/projects",projectData.addNewProject);
//Project user add
router.post("/api/projects/:id/", projectData.projectUserAdd);
// Project-user-delete
router.delete("/api/projects/user/:id/", projectData.ProjectUserDelete);
//Proje silme
router.delete("/api/projects/:id/",projectData.projectDelete);
//project user filter
router.get("/api/project/user/:id/",projectData.projectUserFliter);
//proje update
router.put("/api/projects/:id/",projectData.projectUpdate);

module.exports = router;
 