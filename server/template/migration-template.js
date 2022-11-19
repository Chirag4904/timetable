// helpful guide to guide you: https://www.freecodecamp.org/news/how-to-automate-database-migrations-in-mongodb-d6b68efe084e/
const { mongoConnect } = require("../src/services/mongo");

module.exports.description = "<< Description of this migration, what is being modified >>";

module.exports.up = function (next) {
    mongoConnect().then();
    next(/* pass in error messae here */);
};

module.exports.down = function (next) {
    mongoConnect().then();
    next();
};
