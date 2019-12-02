import db from "../db/index";
import users from "./Users";
import products from "./Products";
import generateOrderData from "./Orders";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import { OrderModel } from "../models/Order";
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

  Promise.all(promises).finally(async () => {
    const userList = await UserModel.find();
    const productList = await ProductModel.find();
    const orders = generateOrderData(userList, productList);
    OrderModel.insertMany(orders)
      .then(() => {
        console.log("Order data populated!");
        console.log("Seeding completed!");
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        process.exit();
      });
  });
});
