const mongoose = require("mongoose");

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
	choice1: {
		type: Map,
		required: true,
	},
	choice2: {
		type: Map,
		required: true,
	},
	choice3: {
		type: Map,
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
