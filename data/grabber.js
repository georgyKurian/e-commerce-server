import axios from "axios";
import { response } from "express";
import fs from "fs";
import path from "path";

const url = "https://www.adidas.ca/api/";

const axiosAdidas = axios.create({
  baseURL: url
});

const errorHandler = error => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
  console.error(error.config);
};

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    errorHandler(error);
    return Promise.reject(error);
  }
);

const getProductIds = () => {
  return new Promise(function(resolve, reject) {
    let startIndex = 0;
    const productIdList = [];
    const params = {
      query: "all"
    };

    Promise.all([
      axiosAdidas.get(`/search/tf/query`, {
        params: {
          ...params
        }
      }),
      axiosAdidas.get(`/search/tf/query`, {
        params: {
          ...params,
          start: 48
        }
      }),
      axiosAdidas.get(`/search/tf/query`, {
        params: {
          ...params,
          start: 96
        }
      })
    ])
      .then(respDataList => {
        let productIdList = [];
        productIdList = respDataList.map(
          ({
            data: {
              itemList: { items }
            }
          }) => {
            return items.map(productData => productData["productId"]);
          }
        );
        resolve(productIdList.flat());
      })
      .catch(error => {
        reject(error);
      });
  });
};

const downloadImage = (url, filePath) => {
  const writer = fs.createWriteStream(filePath);

  return axios.get(url, { responseType: "stream" }).then(response => {
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  });
};

const getProductJson = productId => {
  return new Promise(function(resolve, reject) {
    axiosAdidas
      .get(`products/${productId}`)
      .then(({ data: productData }) => {
        const imageList = [];

        /* const dirPath = path.resolve(__dirname, "images", `${productId}`);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
        } */

        productData["view_list"].forEach(({ image_url, video_url }, index) => {
          /* const newImageName = (index+1) + path.extname(image_url); 
					const newImagePath = path.resolve(dirPath, newImageName);
					imageList.push(`${newImageName}/${newImageName}`);
          downloadImage(image_url,newImagePath); */
          if( ! video_url ) {
            imageList.push(image_url);
          }
        });
        resolve({
          adidasId: productData["id"],
          name: productData["name"],
          modelNumber: productData["model_number"],
          productDescription: {
            title: productData["product_description"]["title"],
            subtitle: productData["product_description"]?.subtitle,
            text: productData["product_description"]["text"],
            features: productData["product_description"]["usps"]
          },
          price: productData["pricing_information"]["currentPrice"] * 100,
          category: productData["attribute_list"]["category"],
          color: productData["attribute_list"]["color"],
          gender: productData["attribute_list"]["gender"],
          sport: productData["attribute_list"]["sport"],
          productType: productData["attribute_list"]["productType"],
          images: imageList
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

getProductIds()
  .then(async productIdList => {
    const productDataList = [];

    for (let i = 0; i < productIdList.length; i = i + 5) {
      const promiseArray = [];
      for (let j = 0; j < 5 && i + j < productIdList.length; j++) {
        promiseArray.push(getProductJson(productIdList[i + j]));
      }
      await Promise.all(promiseArray)
        .then(responseArray => {
          responseArray.forEach(productData => {
            productDataList.push(productData);
          });
        })
        .catch(errorHandler);
    }
    let data = JSON.stringify(productDataList, null, 2);

    fs.writeFile("data/products.json", data, err => {
      if (err) throw err;
      console.log("Data written to file");
    });

    console.log(`\nTotal products : ${productDataList.length}`);
  })
  .catch(errorHandler);
