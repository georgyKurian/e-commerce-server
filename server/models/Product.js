import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [String],
  categories: [String]
});

export const ProductModel = mongoose.model("Product", ProductSchema);
