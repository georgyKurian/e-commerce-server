const parseToDecimal = (string, defaultNumber) => {
    const parsedNumber = Number.parseInt(string, 10);
    return Number.isInteger(parsedNumber) ? parsedNumber:defaultNumber;
};

const pagination = (defaultSize=16) => {
    return (req, res, next) => {
        req.query.page = parseToDecimal(req.query.page,0);
        req.query.size = parseToDecimal(req.query.size,defaultSize);
        next();
    };
};

export default pagination;