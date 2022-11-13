const express = require("express");

const {
	httpGetAllTeachers,
	httpAddNewTeacher,
} = require("./teachers.controller");

const teachersRouter = express.Router();

teachersRouter.get("/", httpGetAllTeachers);
teachersRouter.post("/", httpAddNewTeacher);

module.exports = teachersRouter;
