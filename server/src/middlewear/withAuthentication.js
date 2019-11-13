import jwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config({path: "./server/.env"});

export default jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: req => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
  }
});
