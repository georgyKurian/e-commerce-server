export default (req, res, next) => {
  // TODO: Authentication
  req.isAdmin = true;
  req.isAuthenticated = true;
  next();
};
