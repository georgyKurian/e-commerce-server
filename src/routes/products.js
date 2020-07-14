import { ProductModel } from '../models/Product';
import { ReviewModel } from '../models/Review';

export default (app) => {
  app.get('/v1/products', async (req, res) => {
    const { categories } = req.query;
    const categoryList = categories ? categories.split(',') : [];
    const productList = [];

    await ProductModel.find(
      categoryList.length > 0
        ? { categories: { $in: categoryList } }
        : undefined
    )
    .select({
      name:1,
      price : 1,
      category : 1,
      color : 1,
      gender : 1,
      sport : 1,
      productType : 1,
      images: 1
    })
    .slice('images',4)
    .then(products => {
      Promise.all(
        products.map(async (product) => ReviewModel.aggregate([
          { $match: { product: product._id } },
          {
            $group: {
              _id: '$product',
              rating: { $avg: '$rating' },
              count: { $sum: 1 },
            },
          },
        ])                   
        .then((reviews) => {
            const json = product.toJSON();              
            if (reviews[0] !== undefined) {
              json.avgRating = (reviews[0].rating).toFixed(2);
              json.reviewCount = reviews[0].count;
            } else {
              json.avgRating = 0;
              json.reviewCount = 0;
            }
            productList.push(json);
          })),
        )
        .then(() => {
          res.send(productList);
        })
        .catch((error) => {
          console.error(error);
        });
    })
  });

  app.get('/v1/products/:id', async (req, res) => {
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

  app.post('/v1/products', async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
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

  app.put('/v1/products/:id', async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
      await ProductModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, updatedProduct) => {
          if (err) {
            console.log(err);
            res.status(400).end();
          } else {
            res.send(updatedProduct).end();
          }
        },
      );
    } catch (e) {
      res.status(404).end();
    }
  });

  app.delete('/v1/products/:id', async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(403).end();
      }
      await ProductModel.findOneAndDelete({ _id: req.params.id }, (
        err,
        updatedProduct,
      ) => {
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
