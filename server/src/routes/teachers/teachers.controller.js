const { getAllTeachers } = require("../../models/teachers.model");
const { convertIntObj } = require("../../utils");

async function httpGetAllTeachers(req, res) {
	const query = req.query;
    const teachers = await getAllTeachers(convertIntObj(query));
	return res.send(teachers);
}

module.exports = {
	httpGetAllTeachers,
};
