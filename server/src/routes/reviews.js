import { ReviewModel } from "../models/Review";

export default app => {
  app.get("/v1/reviews", async (req, res) => {
    // To implement
    /* const { categories } = req.query;
    const categoryList = categories ? categories.split(",") : [];

    const products =
      (await ProductModel.find(
        categoryList.length > 0
          ? { categories: { $in: categoryList } }
          : undefined
      )) || [];
    res.send(products); */
  });

  app.get("/v1/reviews/:productId", async (req, res) => {
    try {
      const reviews = await ReviewModel.find({ product: req.params.productId });
      if (reviews) {
        res.send(reviews);
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.post("/v1/reviews", async (req, res) => {
    // To implement
    /* try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
      const product = await ReviewModel.create(req.body);
      if (product) {
        res.send(product).end();
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    } */
  });

  app.put("/v1/reviews/:id", async (req, res) => {
    // To implement
    /* try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
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
    } */
  });

  app.delete("/v1/reviews/:id", async (req, res) => {
    // To implement
    /* try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
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
    */
  });
};
