const { convertIntObj } = require("../../utilities/utils");
const Allotment = require("../../models/allotment.mongo");
const Subject = require("../../models/subjects.mongo");
const { PromisePool } = require("@supercharge/promise-pool");

/**
 * interesting read that gave me this idea: https://www.mongodb.com/docs/manual/tutorial/model-computed-data/
 *  - basically, retrieve all subjects
 *  - batch them
 *  - then asynchronously (kinda parallely) calculate their remaining workload (if needed to) amd update the document
 *      IDEAS:
 *      - make a migration thingy, that updates the db for with new schema
 *      - while updating the new schema also calculate the remaining hours
 *      - but mongo wont atomically update if 2 people try to updat the teacher at the same time but highly unlikley
 *        more than 2 peopel will modify the same teacher object
 */
async function computed_calculateallotedHours() {
    // get all subject ids in allotment
    const subs = await Allotment.find();

    const { results, errors } = await PromisePool.withConcurrency(100)
        .for(subs)
        .process(async (allotData) => {
            const subject = await Subject.findById(allotData.subject);
            // console.log(subject);

            // only calculate further if allotment has been updated
            if (subject.allotedHours.updatedAt && subject.allotedHours.updatedAt > allotData.updatedAt) {
                return;
            }
            // calculate the hours
            let allotedHours = { lecture: 0, practical: 0, tutorial: 0 };
            allotData.allotedTeachers.forEach((elem) => {
                allotedHours.lecture += elem.lectureHrs;
                allotedHours.tutorial += elem.tutorialHrs;
                allotedHours.practical += elem.practicalHrs;
            });
            subject.allotedHours = allotedHours;
            console.log("updated: ", subject.allotedHours, subject.id);
            await subject.save();
        });
    if (errors && errors.length) {
        console.error(errors, "here");
    }
}

async function httpGetAllSubjects(req, res) {
    const query = req.query;
    try {
        await computed_calculateallotedHours();
        const subjects = await getAllSubjects(convertIntObj(query));
        return res.send(subjects);
    } catch (e) {
        return res.status(400).send({ erro: true, error_desc: { query: JSON.stringify(query), msg: e } });
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

async function httpAddTeacherToSubject(req, res) {
    const data = req.body;
    console.log(data);
    // #TODO validation
    await addTeacherToSubject(data.teacherId, data.subjectId);
    return res.send("done");
}

module.exports = {
    httpGetAllSubjects,
    httpUpdateSubjectState,
    httpAddTeacherToSubject,
};
