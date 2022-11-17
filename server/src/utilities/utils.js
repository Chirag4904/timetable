function convertIntObj(obj) {
    const res = {};
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            res[key] = obj[key].map(convertIntObj);
        } else if (typeof obj[key] === "object") {
            res[key] = convertIntObj(obj[key]);
        } else {
            const parsed = parseInt(obj[key]);
            res[key] = isNaN(parsed) ? obj[key] : parsed;
        }
    }
    return res;
}

module.exports = {
    convertIntObj,
};
