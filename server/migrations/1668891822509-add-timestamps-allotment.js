// helpful guide to guide you: https://www.freecodecamp.org/news/how-to-automate-database-migrations-in-mongodb-d6b68efe084e/
const { mongoConnect } = require("../src/services/mongo");
const Allotment = require("../src/models/allotment.mongo");

module.exports.description = "adds timestamps to allotments collection";

module.exports.up = function (next) {
    mongoConnect().then(() => {
        console.info("adding timestamps");
        Allotment.updateMany(
            {},
            {
                $set: { createdAt: new Date() },
                // assuming mongoose will automatically add updatedAt
            },
            { timestamps: true }
        )
            .then((res) => {
                if (res.modifiedCount == 0) {
                    console.info("all allotments have timestamps");
                } else {
                    console.info("added timestamps to " + res.modifiedCount + " documents");
                }
            })
            .catch((err) => {
                return next(err);
            });

        Allotment.findOne().then();
        return next();
    });
};

module.exports.down = function (next) {
    // this wont work unless schema disabled timestamps
    mongoConnect().then();
    Allotment.updateMany(
        {
            createdAt: { $exists: true },
            updatedAt: { $exists: true },
        },
        {
            $unset: { createdAt: "", updatedAt: "", t: "" },
        }
    ).catch((err) => {
        return next(err);
    });
    return next();
};
