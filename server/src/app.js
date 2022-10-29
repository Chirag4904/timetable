const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const teachersRouter = require("./routes/teachers/teachers.router");
const subjectsRouter = require("./routes/subjects/subjects.router");

const { genAPIRouter } = require("./routes/general/gen-api.router")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        res.status(400).json({ error: true , error_desc: err }); // Bad request
		return
    }
    next();
});

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
app.use("/api/general", genAPIRouter)

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
