const Subjects = require("../src/models/subjects.mongo");
const { mongoConnect } = require("../src/services/mongo");

module.exports.description = "Creates allotedHours in existing documents";

module.exports.up = function (next) {
    mongoConnect().then(() => {
        console.info("adding allotedHours in subjects");
        Subjects.updateMany(
            { allotedHours: { $exists: false } },
            {
                "allotedHours.lecture": 0,
                "allotedHours.tutorial": 0,
                "allotedHours.practical": 0,
            }
        )
            .then((res) => {
                if (res.modifiedCount == 0) {
                    console.info("All documents already have allotedHours in them");
                    return next();
                }
                console.info("added allotedHours to " + res.modifiedCount + " documents");
                next();
            })
            .catch((err) => {
                // console.warn(err);
                next(err);
            });
    });
};

module.exports.down = function (next) {
    mongoConnect().then();
    Subjects.updateMany({ allotedHours: { $exists: true } }, { $unset: { allotedHours: "" } })
        .then((res) => {
            console.info("removed allotedHours in " + res.modifiedCount + " documents");
            next();
        })
        .catch((err) => {
            next(err);
        });
};
