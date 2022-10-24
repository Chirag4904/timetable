const express = require("express");

const { httpGetAllTeachers } = require("./teachers.controller");

const teachersRouter = express.Router();

teachersRouter.get("/", httpGetAllTeachers);

module.exports = teachersRouter;
