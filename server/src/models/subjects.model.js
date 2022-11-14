const subjectsDatabase = require("./subjects.mongo");
const s = require("../data/subject_model_data.json");

async function saveSubject(subject) {
    try {
        await subjectsDatabase.findOneAndUpdate(
            {
                id: subject.id,
            },
            subject,
            { upsert: true }
        );
        console.log(subject.id, "saved");
    } catch (err) {
        console.error(`Could not save launch ${err}`);
    }
}

async function loadsubjectsData() {
    s.map(async (sub) => {
        await addNewSubject(sub);
    });
}

async function updateSubjectState(subjectId, state) {
    console.log("hui");
    await subjectsDatabase.updateOne({ id: subjectId }, { $set: { isAssigned: state } });
}

async function addNewSubject(subject) {
    const newSubject = Object.assign(subject, {
        isAssigned: false,
        choice1: [],
        choice2: [],
        choice3: [],
    });

    await saveSubject(newSubject);

    console.log("subject save ho gya re bhaya");
}

async function updateSubjectChoices(subjectId, teacherId, prefOrder) {
    if (prefOrder === 1) {
        await subjectsDatabase.updateOne({ id: subjectId }, { $push: { choice1: teacherId } });
    } else if (prefOrder === 2) {
        await subjectsDatabase.updateOne({ id: subjectId }, { $push: { choice2: teacherId } });
    } else if (prefOrder === 3) {
        await subjectsDatabase.updateOne({ id: subjectId }, { $push: { choice3: teacherId } });
    }
    console.log("sub saved");
    return;
}

async function getAllSubjects(query) {
    return await subjectsDatabase.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "allotments",
                localField: "_id",
                foreignField: "subject",
                as: "allotedTeachers",
                pipeline: [{ $project: { allotedTeachers: 1 } }],
            },
        },
        { $unwind: { path: "$allotedTeachers", preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                allotedTeachers: { $ifNull: ["$allotedTeachers.allotedTeachers", []] },
            },
        },
        {
            $lookup: {
                from: "teachers",
                localField: "allotedTeachers.teacher",
                foreignField: "_id",
                as: "teachObj",
            },
        },
    ]);
}

module.exports = {
    loadsubjectsData,
    getAllSubjects,
    updateSubjectChoices,
    updateSubjectState,
};
