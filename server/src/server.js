const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadTeachersData } = require("./models/teachers.model");
const { loadsubjectsData } = require("./models/subjects.model");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
	await mongoConnect();
	await loadTeachersData();
	await loadsubjectsData();

	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer();
