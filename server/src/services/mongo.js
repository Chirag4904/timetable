const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017/my-db";

mongoose.connection.once("open", () => {
	console.log("mongodb is ready");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function mongoConnect(url = "") {
	await mongoose.connect(url || MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};
