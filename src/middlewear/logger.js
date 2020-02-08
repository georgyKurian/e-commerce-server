export default (req, res, next) => {
  console.log(
    "=> ",
    req.method,
    req.originalUrl,
    " || ",
    "is Authenticated:",
    typeof req.user === "object",
    ",is Admin:",
    req.isAdmin
  );
  next();
};
