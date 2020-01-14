import fetch from "./fetch";
import Product from "../models/Product";

export const getProducts = async categories => {
  return fetch(`/v1/products${categories ? `?categories=${categories}` : ""}`, {
    method: "GET"
  });
};

export const getProduct = async id => {
  return fetch(`/v1/products${id ? `/${id}` : ""}`, {
    method: "GET"
  });
};
