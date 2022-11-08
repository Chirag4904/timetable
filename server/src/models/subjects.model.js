const subjectsDatabase = require("./subjects.mongo");

const subjects = [
	{
		id: "CSET101",
		name: "Computational Thinking and Programming",
		Programme: "BTECH",
		isAssigned: false,
		originalStructure: { L: 2, T: 1, P: 4 },
		credits: 5,
		lectureBatches: 8,
		tutLabBatches: 30,
		totalLecture: 16,
		totalTutorial: 30,
		totalPractical: 120,
		choice1: [1, 2],
		choice2: [5],
		choice3: [6, 7],
	},
	{
		id: "CBCA101",
		name: "Digital Design and Computer Organization",
		Programme: "BCA",
		isAssigned: false,
		originalStructure: { L: 2, T: 0, P: 2 },
		credits: 3,
		lectureBatches: 1,
		tutLabBatches: 3,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 6,
		choice1: [3],
		choice2: [1, 4],
		choice3: [5],
	},
	{
		id: "CBCA102",
		name: "Computational Thinking with Python",
		Programme: "BCA",
		isAssigned: true,
		originalStructure: { L: 2, T: 1, P: 4 },
		credits: 5,
		lectureBatches: 1,
		tutLabBatches: 3,
		totalLecture: 2,
		totalTutorial: 3,
		totalPractical: 12,
		choice1: [4, 5],
		choice2: [2, 8],
		choice3: [1],
	},
];

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
	subjects.map(async (subject) => {
		await saveSubject(subject);
	});
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
        { $unwind: {path: "$allotedTeachers", preserveNullAndEmptyArrays: true} },
        { $addFields: { allotedTeachers: {$ifNull: ["$allotedTeachers.allotedTeachers", []]} } },
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
};
