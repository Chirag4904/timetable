const { Router } = require("express");

const { commitLTP } = require("./gen-api.controller");

const genAPIRouter = Router();
genAPIRouter.post("/commit_ltp", (req, res) => {
    const { value, error } = commitLTP.schema.validate(req.body);

    if (error) {
        res.status(400);
        res.json({
            error: true,
            error_desc: error,
        });
    } else {
        res.json(commitLTP.handler(value));
    }
});

module.exports = {
    genAPIRouter,
};
