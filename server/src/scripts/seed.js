import db from "../db/index";
import { users, products } from "./data";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  const promises = [];
  promises.push(
    UserModel.insertMany(users)
      .then(() => {
        console.log("Users data populated!");
      })
      .catch(e => {
        console.error(e);
      })
  );

  promises.push(
    ProductModel.insertMany(products)
      .then(() => {
        console.log("Products data populated!");
      })
      .catch(e => {
        console.error(e);
      })
  );
  Promise.all(promises).finally(() => {
    console.log("Seeding completed!");
    process.exit();
  });
});
