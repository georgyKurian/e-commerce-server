import { ProductModel } from '../models/Product';
import { ReviewModel } from '../models/Review';
import pagination from '../middlewear/pagination';
import ProductController from '../controllers/ProductController';

const productPagination = pagination(16);

export default (app) => {
  app.get(
    '/v1/products',
    productPagination, 
    ({query : {categories, page, size}}, res) => {
      const categoryList = categories ? categories.split(',') : [];
      ProductController
      .findProducts(categoryList, page, size)
      .then(products => {      
        res.send(products);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  );

  app
    .route('/v1/products/:productId')
    .all((req, res, next) => {
      if (!req.params.productId) {
        res.status(400).end();
      }
      ProductController
        .findById(req.params.productId) 
        .then((product) => {
          req.product = product;
          next();
        })
        .catch(error => 
          res.status(400).json(error) 
        ); 
    })
    .get((req, res) => {
      ReviewModel.aggregate([
        { $match: { product: req.product._id } },
        {
          $group: {
            _id: '$product',
            rating: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ])                   
      .then((reviews) => {
        const json = req.product.toJSON();              
        if (reviews[0] !== undefined) {
          json.avgRating = Math.round(reviews[0].rating);
          json.reviewCount = reviews[0].count;
        } else {
          json.avgRating = 0;
          json.reviewCount = 0;
        }
        res.json(json);
      })
      .catch((error)=>{
        res.send(error);
      });
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
