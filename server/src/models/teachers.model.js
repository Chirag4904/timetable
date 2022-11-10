const teachersDatabase = require("./teachers.mongo");
const maleURL =
	"https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg";
const teachers = [
	{
		id: 1,
		name: "Rajat Chaudhary",
		email: "rajatchaudhary@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CBCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET452",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CSET211",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: true,
		isAvailable: true,
		profilePicture: maleURL,
	},

	{
		id: 2,
		name: "Simar Preet Singh",
		email: "simarpreetsingh@gmail.com",
		contact: "8348563219",
		subjects: [
			{
				subjectId: "CSET211",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CBCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CSET458",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://img.freepik.com/premium-vector/young-black-man-face-with-beard-male-portrait-avatar-flat-style-front-view_497399-251.jpg?w=2000",
	},

	{
		id: 3,
		name: "Simranjeet Singh",
		email: "Simranjeetsingh@gmail.com",
		contact: "8388734646",
		subjects: [
			{
				subjectId: "CSET363",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CBCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://www.cliparts101.com/files/367/63BA654AECB7FD26A32D08915C923030/avatar_nick.png",
	},

	{
		id: 4,
		name: "Kuldeep Chaurasia",
		email: "kuldeepchaurasia@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET363",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CBCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
	},

	{
		id: 5,
		name: "Suchi Kumari",
		email: "SuchiKumari@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET211",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "BCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://static.vecteezy.com/system/resources/previews/004/773/704/non_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
	},

	{
		id: 6,
		name: "Aditya Bhardwaj",
		email: "AdityaBhardwaj@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET452",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
	},

	{
		id: 7,
		name: "Madhushi Verma",
		email: "madhushiverma@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET211",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://static.vecteezy.com/system/resources/previews/004/773/704/non_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
	},

	{
		id: 8,
		name: "Ishan Budhiraja",
		email: "ishanbudhiraja@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "BCA101L",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET452",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
	},

	{
		id: 9,
		name: "Inderjeet Gupta",
		email: "InderjeetGupta@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CBCA204",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CSET452",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
	},

	{
		id: 10,
		name: "Navneet Pratap Singh",
		email: "navneetpratapsingh@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET211",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 2,
			},
			{
				subjectId: "CBCA103",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
	},

	{
		id: 11,
		name: "Divya Srivastva",
		email: "DivyaSrivastava@gmail.com",
		contact: "8383748734",
		subjects: [
			{
				subjectId: "CSET452",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "BCA102",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 1,
			},
			{
				subjectId: "CSET363",
				L: 0,
				T: 0,
				P: 0,
				prefOrder: 3,
			},
		],

		maxLoad: 14,
		currentLoad: 0,
		isAssigned: false,
		isAvailable: true,
		profilePicture:
			"https://st3.depositphotos.com/1007566/13175/v/600/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg",
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
    return await teachersDatabase.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "allotments",
                localField: "_id",
                foreignField: "allotedTeachers.teacher",
                as: "allotedSubjects",
                pipeline: [{ $project: { subject: 1, _id: 0 } }],
            },
        },
        {
            $lookup: {
                from: "subjects",
                localField: "allotedSubjects.subject",
                foreignField: "_id",
                as: "allotedSubjects",
            },
        },
    ]);
}

module.exports = {
	teachers,
	loadTeachersData,
	getAllTeachers,
};
