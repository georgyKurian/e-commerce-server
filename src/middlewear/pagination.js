const parseToDecimal = (string, defaultNumber) => {
  const parsedNumber = Number.parseInt(string, 10);
  return Number.isInteger(parsedNumber) ? parsedNumber : defaultNumber;
};

const pagination = (defaultSize = 16) => (req, res, next) => {
  req.query.skip = parseToDecimal(req.query.page, 0) * defaultSize;
  req.query.limit = parseToDecimal(req.query.size, defaultSize);
  delete req.query.size;
  delete req.query.page;
  next();
};

export default pagination;
