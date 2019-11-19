import db from "../db/index";
import { users, products } from "./data";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Database connection is open!");

  UserModel.insertMany(users);

  ProductModel.insertMany(products, error => {
    if (error) {
      console.log(error);
    }
  });
});
