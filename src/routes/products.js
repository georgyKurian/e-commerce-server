import { ProductModel } from '../models/Product';
import { ReviewModel } from '../models/Review';

export default (app) => {
  app.get('/v1/products', async ({query : {categories, start=0, limit=16}}, res) => {
    let categoryRegexList;
    const categoryList = categories ? categories.split(',') : [];
    
    console.log(categories);
    if(categoryList.length > 0){
      categoryRegexList = categoryList.map((category)=> new RegExp(category,'i'));
    } 

    ProductModel.find(
      categoryRegexList ? { category: { $in: categoryRegexList } }
        : undefined
    )
    .sort({_id:1})
    .skip(Number.parseInt(start))
    .limit(Number.parseInt(limit))
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
    .lean()
    .then(products => {      
      res.send(products);
    })
    .catch((error) => {
      console.error(error);
    });
  });

  app.get('/v1/products/:id', async (req, res) => {
    ProductModel
      .findById(req.params.id)        
      .then( product => {
        ReviewModel.aggregate([
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
            json.avgRating = Math.round(reviews[0].rating);
            json.reviewCount = reviews[0].count;
          } else {
            json.avgRating = 0;
            json.reviewCount = 0;
          }
          res.json(json);
        });
      })
      .catch((error)=>{
        res.status(404).end();
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
