const Joi = require("joi");
const Allotment = require("../../models/allotment.mongo");
const teacher = require("../../models/teachers.mongo");
const Subject = require("../../models/subjects.mongo");
const { TEACHER_MAX_WORKLOAD } = require("../../constants");

commitLTPSchema = Joi.object({
    teacher_id: Joi.string().alphanum().required(),
    subject_id: Joi.string().required().alphanum(),
    lecture_hours: Joi.number()
        .integer()
        .min(0)
        .max(TEACHER_MAX_WORKLOAD - 3)
        .required(),
    tutorial_hours: Joi.number().integer().min(0).max(TEACHER_MAX_WORKLOAD).required(),
    practical_hours: Joi.number().integer().min(0).max(TEACHER_MAX_WORKLOAD).required(),
});

async function commitLTPHandler(req) {
    //   console.log(req);
    //   console.log(res);
    /**
     * TODO:
     * - we first retrieve, the teacher and the subject's document
     * - then check if those hours are feasible for teacher
     * - then check if those hours are feasible for the subject
     * - then check update teacher's document with the ltp hours, is_available etc
     * - update subject's available ltp hours
     *
     *
     * F all that, what we're gonna do is create a new document collection and store the allotments there
     */

    // retrieve an allotment document, if it exists otherwis we create our own here
    const subject = await Subject.findOne({ id: req.subject_id.toUpperCase() });
    let lecHours = subject.originalStructure.get("L") * subject.lectureBatches;
    let tutHours = subject.originalStructure.get("T") * subject.tutLabBatches;
    let labHours = subject.originalStructure.get("P") * subject.tutLabBatches;
    let total = lecHours + tutHours + labHours;
    console.log("total hours", total);
    const teach = await teacher.findOne({ id: req.teacher_id });

    if (!subject) {
        throw "subject_id is not valid";
    }
    if (!teach) {
        throw "teacher_id is not valid";
    }

    let allotment = await Allotment.findOne({ subject: subject._id });
    if (!allotment) {
        allotment = new Allotment({
            subject: subject._id,
        });
    }

    // ==========================================================

    // DEBUG ONLY, TODO: remove this
    // if (req.practical_hours == 6) {
    //     data = [
    //         {
    //             sub: await Subject.findOne({ id: "CSET101" }),
    //             teacher: await teacher.findOne({ id: 1 }),
    //             l: 4,
    //             t: 3,
    //             p: 2,
    //         },
    //         {
    //             sub: await Subject.findOne({ id: "CBCA101" }),
    //             teacher: await teacher.findOne({ id: 1 }),
    //             l: 1,
    //             t: 1,
    //             p: 1,
    //         },
    //     ];
    //     data.forEach((element) => {
    //         let _meh = new Allotment({
    //             subject: element.sub._id,
    //             allotedTeachers: [
    //                 {
    //                     teacher: element.teacher._id,
    //                     lectureHrs: element.l,
    //                     tutorialHrs: element.t,
    //                     practicalHrs: element.p,
    //                 },
    //             ],
    //         });

    //         Allotment.findOneAndUpdate({ subject: element.sub._id }, _meh, { upsert: true }).exec();
    //     });
    //     // const p1 = await Allotment.findOne({"subject.code" : "CSET101"})
    //     // console.log(p1)
    // }

    // check if hours feasible by teacher
    const teacherAllotments = await Allotment.find(
        { "allotedTeachers.teacher": teach._id },
        { "allotedTeachers.$": 1, subject: 1 }
    );
    let _teacherWorkload = 0;
    // console.log(JSON.stringify(teacherAllotments));
    teacherAllotments.forEach((element) => {
        const _sub = element.subject;
        element = element.allotedTeachers[0];
        // console.log(typeof element.teacher);
        if (element.teacher.equals(teach._id) && !_sub.equals(subject._id)) {
            // console.log(element, _sub);
            _teacherWorkload += element.lectureHrs + element.tutorialHrs + element.practicalHrs;
        } // } else {
        //     console.warn("DB query returning other teachers as well", element);
        // }
    });
    if (_teacherWorkload + req.lecture_hours + req.tutorial_hours + req.practical_hours > teach.maxLoad) {
        throw {
            is_feasible: false,
            message: `exceeded maximum weekly workload! Teacher workload is already at ${_teacherWorkload}hrs!`,
        };
    }
    // ===============================================

    // check if ltp feasible for the subject
    // calculate subject's effective workload
    let _assignedLoad = { lecture: 0, tutorial: 0, practical: 0 };
    allotment.allotedTeachers.forEach((e) => {
        // console.log(e)
        if (!e.teacher.equals(teach._id)) {
            //
            _assignedLoad.lecture += e.lectureHrs;
            _assignedLoad.tutorial += e.tutorialHrs;
            _assignedLoad.practical += e.practicalHrs;
        }
    });

    let availableLoad = {
        lecture: subject.totalLecture - _assignedLoad.lecture,
        tutorial: subject.totalTutorial - _assignedLoad.tutorial,
        practical: subject.totalPractical - _assignedLoad.practical,
    };

    let __newEffectiveAvailableWorkload = {};

    Object.keys(availableLoad).map((key) => {
        __newEffectiveAvailableWorkload[key] = availableLoad[key] - req[`${key}_hours`];
        if (__newEffectiveAvailableWorkload[key] < 0) {
            throw {
                is_feasible: false,
                message: `exceeded subject's available ${key} hours`,
                available_subject_workload: availableLoad,
            };
        }
    });

    // ==================================================

    // now we're clear to modify the allotent document
    const _index = allotment.allotedTeachers.findIndex((e) => e.teacher.equals(teach._id));
    console.log("index:", _index);
    const _toSave = {
        teacher: teach._id,
        lectureHrs: req.lecture_hours,
        tutorialHrs: req.tutorial_hours,
        practicalHrs: req.practical_hours,
    };
    if (_index === -1) {
        allotment.allotedTeachers.push(_toSave);
    } else {
        allotment.allotedTeachers[_index] = _toSave;
    }

    allotment
        .save()
        .then()
        .catch((err) => {
            throw { message: err };
        });

    // NOTE: Intentionally not updating the teachers workload from here since it can lead to duplicate workload being added
    //       Better solution is to dynamically get teacher's workload
    // update teacher's workloa
    // teach.currentLoad += req.lecture_hours + req.tutorial_hours + req.practical_hours;

    // teach
    //     .save()
    //     .then()
    //     .catch((err) => {
    //         throw { message: err };
    //     });

    return {
        is_feasible: true,
        available_subject_workload: __newEffectiveAvailableWorkload,
        allotment: await (await allotment.populate("subject")).populate("allotedTeachers.teacher"),
    };
}

module.exports = {
    commitLTP: { handler: commitLTPHandler, schema: commitLTPSchema },
};
