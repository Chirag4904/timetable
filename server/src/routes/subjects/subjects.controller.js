const { getAllSubjects } = require("../../models/subjects.model");

async function httpGetAllSubjects(req, res) {
	const query = req.query;
	const subjects = await getAllSubjects(query);
	return res.send(subjects);
}

module.exports = {
	httpGetAllSubjects,
};
