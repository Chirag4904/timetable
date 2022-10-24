const express = require("express");

const { httpGetAllSubjects } = require("./subjects.controller");

const subjectssRouter = express.Router();

subjectssRouter.get("/", httpGetAllSubjects);

module.exports = subjectssRouter;
