const express = require("express");

const {
	httpGetAllSubjects,
	httpUpdateSubjectState,
} = require("./subjects.controller");

const subjectsRouter = express.Router();

subjectsRouter.get("/", httpGetAllSubjects);
subjectsRouter.post("/", httpUpdateSubjectState);

module.exports = subjectsRouter;
