const { convertIntObj } = require("../../utils");
const {
	getAllTeachers,
	addNewTeacher,
} = require("../../models/teachers.model");

async function httpGetAllTeachers(req, res) {
	const query = req.query;
    const teachers = await getAllTeachers(convertIntObj(query));
	return res.send(teachers);
}

async function httpAddNewTeacher(req, res) {
	const teacher = req.body;
	//validation
	if (!teacher.name || !teacher.email || !teacher.subjects) {
		return res.status(400).send("Invalid request");
	}
	await addNewTeacher(teacher);
	return res.send("ok");
}

module.exports = {
	httpGetAllTeachers,
	httpAddNewTeacher,
};
