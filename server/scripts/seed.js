import mongoose from "mongoose";
import { users, products } from "./data";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";

// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(
  "mongodb+srv://ecommerceapp:Q35JgRaiYKe5@e-commerce-1n6e9.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Database connection is open!");

  const promise1 = UserModel.insertMany(users);
  console.log(typeof promise1);
  promise1.then(() => {
    console.log("Working");
  });
  ProductModel.insertMany(products, error => {
    if (error) {
      console.log(error);
    }
  }).then(doc => {
    console.log("Seeded PRODUCT data!");
  });
});
