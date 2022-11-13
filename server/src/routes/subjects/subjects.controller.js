const { getAllSubjects } = require("../../models/subjects.model");
const { convertIntObj } = require("../../utils");

async function httpGetAllSubjects(req, res) {
	const query = req.query;
    const subjects = await getAllSubjects(convertIntObj(query));
	return res.send(subjects);
}

module.exports = {
	httpGetAllSubjects,
};
