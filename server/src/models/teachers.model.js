const teachersDatabase = require("./teachers.mongo");
const { uuid } = require("uuidv4");
const { updateSubjectChoices } = require("./subjects.model");
let teachers = [];

try {
    teachers = require("../data/teacher_model_data.json");
} catch (e) {
    console.log("Error: Teacher data file is not present");
}

const profilePicUrls = [
    "https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg",
    "https://img.freepik.com/premium-vector/young-black-man-face-with-beard-male-portrait-avatar-flat-style-front-view_497399-251.jpg?w=2000",
    "https://www.cliparts101.com/files/367/63BA654AECB7FD26A32D08915C923030/avatar_nick.png",
    "https://i.pinimg.com/736x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg",
    "https://static.vecteezy.com/system/resources/previews/004/773/704/non_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
    "https://st3.depositphotos.com/1007566/13175/v/600/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg",
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
        await addNewTeacher(teacher);
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

async function getLatestTeacherId() {
    const teachers = await teachersDatabase.find({}).sort({ id: -1 }).limit(1);
    // console.log(teachers);
    return teachers[0].id;
}

async function addNewTeacher(teacher) {
    if (teacher.id === undefined) {
        teacher.id = uuid();
    }
    console.log(typeof teacher.id);
    const randomPic = Math.floor(Math.random() * profilePicUrls.length);

    const newTeacher = Object.assign(teacher, {
        // id: newTeacherId,
        isAssigned: false,
        isAvailable: true,
        currentLoad: 0,
        profilePicture: profilePicUrls[randomPic],
        maxLoad: 14,
        contact: 737373773,
    });

    const resp = await saveTeacher(newTeacher);
    console.log(resp);

    console.log("subject chlega");
    teacher.electiveSubjects.forEach((sub) => {
        console.log(sub.subjectId);
        updateSubjectChoices(sub.subjectId, teacher.id, sub.prefOrder);
    });
    teacher.coreSubjects.forEach((sub) => {
        updateSubjectChoices(sub.subjectId, teacher.id, sub.prefOrder);
    });
}

module.exports = {
    teachers,
    loadTeachersData,
    getAllTeachers,
    addNewTeacher,
};
