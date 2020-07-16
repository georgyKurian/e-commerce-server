const parseToDecimal = (string,defaultNumber) => {
    const parsedNumber = Number.parseInt(string, 10);
    return (Number.isNaN(parsedNumber) ? defaultNumber:parsedNumber);
};

const pagination = (defaultLimit=16) => ({start,limit}) => {
    const startNumber = parseToDecimal(start,0);
    const limitNumber = parseToDecimal(limit,defaultLimit);
    return { 
        start : startNumber,
        limit : limitNumber
    }
};

export default pagination;