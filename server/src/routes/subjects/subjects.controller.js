const {
	getAllSubjects,
	updateSubjectState,
} = require("../../models/subjects.model");

async function httpGetAllSubjects(req, res) {
	const query = req.query;
	const subjects = await getAllSubjects(query);
	return res.send(subjects);
}

async function httpUpdateSubjectState(req, res) {
	const subject = req.body;
	//validation
	if (!subject.id && !subject.isAssigned) {
		return res.status(400).send("Invalid request");
	}
	await updateSubjectState(subject.id, subject.isAssigned);
	return res.send("ok");
}

module.exports = {
	httpGetAllSubjects,
	httpUpdateSubjectState,
};
