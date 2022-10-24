const teachersDatabase = require("./teachers.mongo");

const teachers = [
	{
		id: 1,
		name: "John Doe",
		email: "John Doe@gmail.com",
		contact: "8383748734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 2,
		name: "Divya",
		email: "John Doe@gmail.com",
		contact: "834",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 3,
		name: "Chirag",
		email: "Chirag@gmail.com",
		contact: "8388734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 4,
		name: "Vidhi",
		email: "vidhi@gmail.com",
		contact: "8383748734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 5,
		name: "Pranay",
		email: "pranay@gmail.com",
		contact: "8383748734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 6,
		name: "Jayant",
		email: "Jayant@gmail.com",
		contact: "8383748734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
	},
	{
		id: 7,
		name: "Rahul",
		email: "J",
		contact: "8383748734",
		choice1: {
			Subject: "BBCA101",
			L: 0,
			T: 0,
			P: 0,
		},
		choice2: {
			Subject: "BBCA102",
			L: 0,
			T: 0,
			P: 0,
		},
		choice3: {
			Subject: "BBCA103",
			L: 0,
			T: 0,
			P: 0,
		},

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
