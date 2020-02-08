import db from "../db/index";
import users from "./Users";
import products from "./Products";
import generateOrderData from "./Orders";
import generateReviewData from "./Reviews";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import { OrderModel } from "../models/Order";
import dotenv from "dotenv";
import { ReviewModel } from "../models/Review";

dotenv.config();

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  const promises = [];

  promises.push(
    UserModel.deleteMany().then(() => {
      return UserModel.insertMany(users)
        .then(userList => {
          console.log("Users data populated!");
          return userList;
        })
        .catch(e => {
          console.error(e);
        });
    })
  );

  promises.push(
    ProductModel.deleteMany().then(() => {
      return ProductModel.insertMany(products)
        .then(productList => {
          console.log("Products data populated!");
          return productList;
        })
        .catch(e => {
          console.error(e);
        });
    })
  );

  promises.push(
    ReviewModel.deleteMany()
      .then(() => {
        console.log("Reviews data deleted!");
      })
      .catch(e => {
        console.error(e);
      })
  );

  Promise.all(promises).then(async ([userList, productList]) => {
    const orders = generateOrderData(userList, productList);
    OrderModel.deleteMany().then(() => {
      OrderModel.insertMany(orders)
        .then(async orderList => {
          console.log("Order data populated!");
          const reviewList = generateReviewData(orderList);
          await ReviewModel.insertMany(reviewList).then(() => {
            console.log("Inserted reviews!");
            console.log("Seeding completed!");
          });
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          process.exit();
        });
    });
  });
});
