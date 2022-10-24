const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const teachersRouter = require("./routes/teachers/teachers.router");
const subjectsRouter = require("./routes/subjects/subjects.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	express.static(
		path.join(__dirname, "..", "..", "client", "svelte-timetable", "dist")
	)
);

app.use(
	cors({
		origin: "*",
	})
);
app.use("/api/teachers", teachersRouter);
app.use("/api/subjects", subjectsRouter);

app.get("/*", (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			"..",
			"..",
			"client",
			"svelte-timetable",
			"dist",
			"index.html"
		)
	);
});
module.exports = app;
