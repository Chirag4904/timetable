const Joi = require("joi");

commitLTPSchema = Joi.object({
    teacher_id: Joi.string().alphanum().required(),
    subject_id: Joi.string().required().alphanum(),
    lecture_hours: Joi.number().integer().min(0).max(10).required(),
    tutorial_hours: Joi.number().integer().min(0).max(12).required(),
    practical_hours: Joi.number().integer().min(0).max(12).required(),
});

function commitLTPHandler(req) {
    //   console.log(req);
    //   console.log(res);
    return { req: req, type: typeof req };
}

module.exports = {
    commitLTP: { handler: commitLTPHandler, schema: commitLTPSchema },
};
