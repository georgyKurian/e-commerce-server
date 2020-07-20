const parseToDecimal = (string, defaultNumber) => {
    const parsedNumber = Number.parseInt(string, 10);
    return Number.isInteger(parsedNumber) ? parsedNumber:defaultNumber;
};

const pagination = (defaultSize=16) => {
    return (req, res, next) => {
        req.query.skip = parseToDecimal(req.query.page,0) * defaultSize;
        req.query.size = parseToDecimal(req.query.size,defaultSize);
        next();
    };
};

export default pagination;
