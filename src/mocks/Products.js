import faker from 'faker';
import fs from "fs";

const getAdidasProducts = (() => {
  return fs.promises
    .readFile('data/products.json')
    .then((data) => {
      let productList = JSON.parse(data);
      return productList;
    })
  })();

export default getAdidasProducts;