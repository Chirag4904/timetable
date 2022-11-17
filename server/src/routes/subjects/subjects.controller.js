const { convertIntObj } = require("../../utilities/utils");
const { getAllSubjects, updateSubjectState } = require("../../models/subjects.model");

async function httpGetAllSubjects(req, res) {
    const query = req.query;
    try {
        const subjects = await getAllSubjects(convertIntObj(query));
        return res.send(subjects);
    } catch (e) {
        return res
            .status(400)
            .send({ erro: true, error_desc: { query: JSON.stringify(query), msg: e } });
    }
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
