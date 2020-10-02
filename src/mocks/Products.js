import faker from 'faker';
import fs from 'fs';

const getAdidasProducts = (() => fs.promises
  .readFile('data/products.json')
  .then((data) => {
    const productList = JSON.parse(data);
    return productList;
  }))();

export default getAdidasProducts;
