const mongoose = require("mongoose");
//testin label workflow
const subjectsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    programme: {
        type: String,
        required: true,
    },
    isAssigned: {
        type: Boolean,
    },
    originalStructure: {
        type: Map,
        required: true,
    },
    Credits: {
        type: Number,
        required: true,
    },
    lectureBatches: {
        type: Number,
        required: true,
    },
    tutLabBatches: {
        type: Number,
        required: true,
    },
    totalLecture: {
        type: Number,
        required: true,
    },
    totalTutorial: {
        type: Number,
        required: true,
    },
    totalPractical: {
        type: Number,
        required: true,
    },
    choice1: {
        type: Array,
        required: true,
    },
    choice2: {
        type: Array,
        required: true,
    },
    choice3: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Subject", subjectsSchema);
