import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./middlewear/logger";
import withAuthentication from "./middlewear/withAuthentication";
import withAdminPermission from "./middlewear/withAdminPermission";
import db from "./db/index";
import dotenv from "dotenv";
import getProductsRoutes from "./routes/products";
import getUserRoutes from "./routes/users";
import getAuthRoutes from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT; // process.env.PORT
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
};

// middlewears
app.use(cors(process.env === "production" ? corsOptions : undefined));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(withAuthentication);
app.use(withAdminPermission);
app.use(logger);

getProductsRoutes(app);
getUserRoutes(app);
getAuthRoutes(app);

// routes

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

/**
 * Listening to port
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});
