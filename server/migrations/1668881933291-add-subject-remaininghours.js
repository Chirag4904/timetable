const Subjects = require("../src/models/subjects.mongo");
const { mongoConnect } = require("../src/services/mongo");

module.exports.description = "Creates remainingHours in existing documents";

module.exports.up = function (next) {
    mongoConnect().then(() => {
        console.info("adding remainingHours in subjects");
        Subjects.updateMany(
            { remainingHours: { $exists: false } },
            {
                "remainingHours.lecture": 0,
                "remainingHours.tutorial": 0,
                "remainingHours.practical": 0,
            }
        )
            .then((res) => {
                if (res.modifiedCount == 0) {
                    console.info("All documents already have remainingHours in them");
                    return next();
                }
                console.info("added remainingHours to " + res.modifiedCount + " documents");
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
    Subjects.updateMany({ remainingHours: { $exists: true } }, { $unset: { remainingHours: "" } })
        .then((res) => {
            console.info("removed remainingHours in " + res.modifiedCount + " documents");
            next();
        })
        .catch((err) => {
            next(err);
        });
};
