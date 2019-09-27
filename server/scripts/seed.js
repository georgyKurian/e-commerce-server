import mongoose, { schema, Schema } from "mongoose";
import { users, products } from "./data";
import { ProductModel } from "../models/Product";
import { UserMOdel } from "../models/User";

const UserSchema = new Schema({
  email: String,
  username: String,
  role: String
});
const UserModel = mongoose.model("User", UserSchema);
//mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://ecommerceapp:Q35JgRaiYKe5@e-commerce-1n6e9.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", error => {
  console.error(error);
});

db.once("open", () => {
  console.log("Database connection is open!");
  const user = new UserModel({
    email: "jon1@test.ca",
    username: "jon2@test.ca",
    role: "customer"
  });
  user.save(error => {
    if (error) {
      console.error(error);
    } else {
      console.log("User saved");
    }
  });
});
