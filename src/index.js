import express from "express";
import Usermodel from "./models/User";

const app = express();
const port = 8055; //process.env.PORT

const user1 = new Usermodel({
  id: 1,
  username: "geo",
  email: "geo@email.com",
  role: "admin"
});
const user2 = new Usermodel({
  id: 2,
  username: "geo2",
  email: "geo2@email.com",
  role: "user"
});
const users = [user1.getData(), user2.getData()];
console.log(users);

app.get("/", (req, res) => {
  res.send({ dateTime: new Date().toJSON() });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});
