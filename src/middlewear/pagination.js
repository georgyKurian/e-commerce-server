const parseToDecimal = (string, defaultNumber) => {
    const parsedNumber = Number.parseInt(string, 10);
    return Number.isInteger(parsedNumber) ? parsedNumber:defaultNumber;
};

const pagination = (defaultLimit=16) => {
    return (req, res, next) => {
        req.query.start = parseToDecimal(req.query.start,0);
        req.query.limit = parseToDecimal(req.query.limit,defaultLimit);
        next();
    };
};

export default pagination;