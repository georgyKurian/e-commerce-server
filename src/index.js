import express from "express";
import users from "./mocks/users";
import bodyParser from "body-parser";
import logger from "./middlewear/logger";
import  withAuthentication from "./middlewear/withAUthentication";

const app = express();
const port = 8085; //process.env.PORT

// middlewears
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(withAuthentication);
app.use(logger);

// routes
app.get("/", (req, res) => {
  res.send({ dateTime: new Date().toJSON() });
});

app.get('/v1/users', (req, res) => {
  res.send(users);
});

app.get('/v1/users/:id', (req, res) => {
  res.send(users[req.params.id]);
});


app.post('/v1/users', (req, res) => {
  console.log(req.body);
  res.send(users);
});

app.put('/v1/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send(users);
});

app.delete('/v1/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send(users);
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
  res.json({ error: err });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});
