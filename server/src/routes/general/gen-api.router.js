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
        commitLTP
            .handler(value)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    error: true,
                    erro_desc: err,
                });
            });
    }
});

module.exports = {
    genAPIRouter,
};
