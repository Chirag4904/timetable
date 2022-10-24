const { getAllTeachers } = require("../../models/teachers.model");

async function httpGetAllTeachers(req, res) {
	const query = req.query;
	const teachers = await getAllTeachers(query);
	return res.send(teachers);
}

module.exports = {
	httpGetAllTeachers,
};
