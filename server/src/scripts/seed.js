import mongoose from "mongoose";
import { users, products } from "./data";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

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
