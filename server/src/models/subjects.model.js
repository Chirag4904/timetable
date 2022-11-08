const subjectsDatabase = require("./subjects.mongo");

const subjects = [
	{
		id: "BCA305L",
		name: "Network Security",
		Programme: "BCA",
		isAssigned: true,
		originalStructure: { L: 2, T: 0, P: 2 },
		credits: 3,
		lectureBatches: 1,
		tutLabBatches: 1,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 2,
		choice1: [1],
		choice2: [2],
		choice3: [10, 4, 3],
	},
	{
		id: "BCA361L",
		name: "Robotic Process Automation",
		Programme: "BCA",
		isAssigned: false,
		originalStructure: { L: 2, T: 0, P: 2 },
		credits: 3,
		lectureBatches: 1,
		tutLabBatches: 1,
		totalLecture: 2,
		totalTutorial: 0,
		totalPractical: 2,
		choice1: [9],
		choice2: [7, 4, 3],
		choice3: [8, 6],
	},
	{
		id: "CSET219",
		name: "Quantum Computing Foundations",
		Programme: "BTECH",
		isAssigned: true,
		originalStructure: { L: 3, T: 0, P: 2 },
		credits: 4,
		lectureBatches: 1,
		tutLabBatches: 1,
		totalLecture: 3,
		totalTutorial: 0,
		totalPractical: 2,
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
