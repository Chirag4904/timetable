const teachersDatabase = require("./teachers.mongo");

const teachers = [
	{
		id: 1,
		name: "Rajat Chaudhary",
		email: "rajatchaudhary@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA305L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "CSET452",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "CSET219",
				L: 3,
				T: 0,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 2,
		name: "Simar Preet Singh",
		email: "simarpreetsingh@gmail.com",
		contact: "8348563219",
		subjects: [
			{
				subjectId: "CSET219",
				L: 3,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA305L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA103",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 3,
		name: "Simranjeet Singh",
		email: "Simranjeetsingh@gmail.com",
		contact: "8388734646",
		subjects: [
			{
				subjectId: "BTECH363",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA361L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA305L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 4,
		name: "Kuldeep Chaurasia",
		email: "kuldeepchaurasia@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET363",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA305L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 5,
		name: "Suchi Kumari",
		email: "SuchiKumari@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "CSET219",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA103",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 6,
		name: "Aditya Bhardwaj",
		email: "AdityaBhardwaj@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "CSET452",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA361L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	
	{
		id: 7,
		name: "Madhushi Verma",
		email: "madhushiverma@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA361L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "CSET219",
				L: 3,
				T: 0,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 8,
		name: "Ishan Budhiraja",
		email: "ishanbudhiraja@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BBCA102",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA361",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 9,
		name: "Inderjeet Gupta",
		email: "InderjeetGupta@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA361L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "CSET452",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 10,
		name: "Navneet Pratap Singh",
		email: "navneetpratapsingh@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET219",
				L: 3,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 2,
			},
			{
				subjectId: "BCA305L",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},

	{
		id: 11,
		name: "Divya Srivastva",
		email: "DivyaSrivastava@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET452",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 3,
				T: 1,
				P: 2,
				prefOrder: 1,
			},
			{
				subjectId: "CSET363",
				L: 2,
				T: 0,
				P: 2,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
];

async function saveTeacher(teacher) {
	try {
		await teachersDatabase.findOneAndUpdate(
			{
				id: teacher.id,
			},
			teacher,
			{ upsert: true }
		);
	} catch (err) {
		console.error(`Could not save launch ${err}`);
	}
}

async function loadTeachersData() {
	teachers.map(async (teacher) => {
		await saveTeacher(teacher);
	});
}

async function getAllTeachers(query) {
	return await teachersDatabase.find(query);
}

module.exports = {
	teachers,
	loadTeachersData,
	getAllTeachers,
};
