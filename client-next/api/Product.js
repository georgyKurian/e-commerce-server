import fetch from "./fetch";
import Product from "../models/Product";

export const getProducts = async categories => {
  //const productData = await fetch(`/v1/products${categories ? `?categories=${categories}`:''}`, {method:'GET'} )
  return fetch(`/v1/products${categories ? `?categories=${categories}` : ""}`, {
    method: "GET"
  }).then(productDataList => {
    console.log(productDataList.length);
    return productDataList.map(productData => new Product(productData));
  });
};

export const getProduct = async id => {
  return axios
    .get(`/v1/products${id ? `/${id}` : ""}`)
    .then(({ data }) => {
      return new Product(data);
    })
    .catch(error => {
      console.error(error);
    });
};
