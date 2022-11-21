const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const teachersRouter = require("./routes/teachers/teachers.router");
const subjectsRouter = require("./routes/subjects/subjects.router");

const { genAPIRouter } = require("./routes/general/gen-api.router");

/** setup logging */
// sauce: https://stackoverflow.com/a/47074065
app.use(
    morgan("Started :method :url for :remote-addr", {
        immediate: true,
    })
);
app.use(morgan("Completed :status :res[content-length] in :response-time ms"));
/** =============== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        res.status(400).json({ error: true, error_desc: err }); // Bad request
        return;
    }
    next();
});

app.use(
    cors({
        origin: "*",
    })
);
app.use("/api/teachers", teachersRouter);
app.use("/api/subjects", subjectsRouter);
app.use("/api/general", genAPIRouter);

module.exports = app;
