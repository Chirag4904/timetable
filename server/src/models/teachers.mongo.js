const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
	subjectId: String,
	L: Number,
	T: Number,
	P: Number,
	prefOrder: Number,
});
const teachersSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	subjects: {
		type: [subjectSchema],
		required: true,
	},
	maxLoad: {
		type: Number,
		required: true,
	},
	currentLoad: {
		type: Number,
		required: true,
	},
	isAssigned: {
		type: Boolean,
		required: true,
	},
	isAvailable: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("teacher", teachersSchema);
