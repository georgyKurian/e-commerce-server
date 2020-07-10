import { ReviewModel } from '../models/Review';

export default (app) => {
  app.get('/v1/reviews', async (req, res) => {
    try {
      const { productId } = req.query;
      const reviews = await ReviewModel
        .find({ product: productId })
        .populate({path:'user',select:'username'})
        .select({
          _id: 1,
          title: 1,
          comment: 1,
          created_at: 1,
          rating: 1,
        })        
        .lean();
        
      if (reviews) {
        res.send(reviews);
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.post('/v1/reviews', async (req, res) => {
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

  app.put('/v1/reviews/:id', async (req, res) => {
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

  app.delete('/v1/reviews/:id', async (req, res) => {
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
