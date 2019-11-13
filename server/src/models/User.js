import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  role: String
});

export const UserModel = mongoose.model("User", UserSchema);
