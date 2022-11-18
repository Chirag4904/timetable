const express = require("express");

const { httpGetAllSubjects, httpUpdateSubjectState, httpAddTeacherToSubject } = require("./subjects.controller");

const subjectsRouter = express.Router();

subjectsRouter.get("/", httpGetAllSubjects);
subjectsRouter.post("/", httpUpdateSubjectState);
subjectsRouter.post("/addTeacher", httpAddTeacherToSubject);

module.exports = subjectsRouter;
