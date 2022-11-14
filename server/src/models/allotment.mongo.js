const mongoose = require("mongoose");
const { Schema } = mongoose;

// TODO: add min/max limits for the hours
const allotmentSchema = Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    allotedTeachers: [
        new Schema({
            teacher: {
                type: Schema.Types.ObjectId,
                ref: "teacher",
                required: true,
            },
            lectureHrs: {
                type: Number,
                required: true,
            },
            tutorialHrs: {
                type: Number,
                required: true,
            },
            practicalHrs: {
                type: Number,
                required: true,
            },
        }),
    ],
});

module.exports = mongoose.model("Allotment", allotmentSchema);
