const subjectsDatabase = require("./subjects.mongo");

const subjects = [
	{
		id: "CBCA103",
		name: "Web Technologies",
		Programme: "BCA",
		isAssigned: false,
		originalStructure: { L: 2, T: 0, P: 4 },
		credits: 4,
		lectureBatches: 1,
		tutLabBatches: 3,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 12,
		choice1: [1],
		choice2: [2],
		choice3: [10, 4, 3],
	},
	{
		id: "CBCA204",
		name: "Algorithm Design Strategies",
		Programme: "BCA",
		isAssigned: false,
		originalStructure: { L: 3, T: 1, P: 4 },
		credits: 6,
		lectureBatches: 1,
		tutLabBatches: 2,
		totalLecture: 3,
		totalTutorial: 2,
		totalPractical: 8,
		choice1: [9],
		choice2: [7, 4, 3],
		choice3: [8, 6],
	},
	{
		id: "CSET211",
		name: "Statistical Machine Learning",
		Programme: "BTECH",
		isAssigned: true,
		originalStructure: { L: 3, T: 0, P: 2 },
		credits: 4,
		lectureBatches: 2,
		tutLabBatches: 7,
		totalLecture: 6,
		totalTutorial: 0,
		totalPractical: 14,
		choice1: [10, 2],
		choice2: [5],
		choice3: [7, 1],
	},
	{
		id: "CSET363",
		name: "Penetration Testing. Auditing and Ethical Hacking",
		Programme: "BTECH",
		isAssigned: false,
		originalStructure: { L: 2, T: 0, P: 2 },
		credits: 3,
		lectureBatches: 1,
		tutLabBatches: 1,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 2,
		choice1: [4, 3],
		choice2: [2, 4],
		choice3: [11],
	},
	{
		id: "CSET452",
		name: "Software Containerization in DevOps",
		Programme: "BTECH",
		isAssigned: false,
		originalStructure: { L: 2, T: 0, P: 2 },
		credits: 3,
		lectureBatches: 1,
		tutLabBatches: 1,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 2,
		choice1: [11],
		choice2: [6, 8, 1],
		choice3: [9],
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
	return await subjectsDatabase.find(query);
}

module.exports = {
	loadsubjectsData,
	getAllSubjects,
};
