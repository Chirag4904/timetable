const express = require("express");

const {
	httpGetAllSubjects,
	httpUpdateSubjectState,
} = require("./subjects.controller");

const subjectsRouter = express.Router();

subjectsRouter.get("/", httpGetAllSubjects);
// subjectsRouter.post("/status", httpUpdateSubjectState)

module.exports = subjectsRouter;
