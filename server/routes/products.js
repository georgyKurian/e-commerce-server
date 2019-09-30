import { ProductModel } from "../models/Product";

export default app => {
  app.get("/v1/products", async (req, res) => {
    const { categories, maxPrice, minPrice } = req.query;
    const categoryList = categories ? categories.split(",") : [];
    let filter = {
      categories: { $in: categoryList }
    };

    const products =
      (await ProductModel.find(
        categoryList.length > 0
          ? { categories: { $in: categoryList } }
          : undefined
      )) || [];
    res.send(products);
  });

  app.get("/v1/products/:id", async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.post("/v1/products", async (req, res) => {
    try {
      const product = await ProductModel.create(req.body);
      if (product) {
        res.send(product).end();
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.put("/v1/products/:id", async (req, res) => {
    try {
      await ProductModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        function(err, updatedProduct) {
          if (err) {
            console.log(err);
            res.status(400).end();
          } else {
            res.send(updatedProduct).end();
          }
        }
      );
    } catch (e) {
      res.status(404).end();
    }
  });

  app.delete("/v1/products/:id", async (req, res) => {
    try {
      await ProductModel.findOneAndDelete({ _id: req.params.id }, function(
        err,
        updatedProduct
      ) {
        if (err) {
          res.status(400).end();
        } else {
          res.status(200).end();
        }
      });
    } catch (e) {
      res.status(404).end();
    }
  });
};
