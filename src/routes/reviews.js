import { ReviewModel } from '../models/Review';
import mongoose from 'mongoose';
import ReviewController from '../controllers/ReviewController';
import pagination from '../middlewear/pagination';

const reviewPagination = pagination(10);

export default (app) => {
  app.
  use(reviewPagination)
  .get(
    '/v1/reviews', 
    ({query:{productId}, skip, limit}, res) => {
      ReviewController
        .findProductReviews(productId,skip, limit)
        .then((reviews) => {
            res.send(reviews);
          } 
        )
    }
  );

  app.get('/v1/reviews/summary', async (req, res) => {
    try {
      const { productId } = req.query;
      const productObjectId = new mongoose.Types.ObjectId(productId);
      const reviewSummary = await ReviewModel
        .aggregate()        
        .match({
          product: productObjectId
        })        
        .group({
          _id:'$rating',
          noOfReviews: {$sum:1}
        })
        .project({
          _id:0,
          rating: "$_id",
          noOfReviews:1
        })
        .sort('rating');

        const totalNoOfReviews = reviewSummary.reduce((acc,current)=> acc + current.noOfReviews, 0);
        let avgRating = 0;
        const reviewDataList = {};

        reviewSummary.forEach((ratingData) => {
          let percentage = 0;
          if( totalNoOfReviews && totalNoOfReviews !== 0 ) {
            percentage = (ratingData.noOfReviews / totalNoOfReviews) * 100;
            percentage =  Math.round( percentage );
            avgRating += percentage * ratingData.rating;
          }
          reviewDataList[ratingData.rating] = {
            noOfReviews: ratingData.noOfReviews,
            percentage
          }
        });
        const avergaeRating = 0; 
    
        
      if (reviewDataList) {
        res.send({
          avgRating: Math.round(avgRating/100),
          totalNoOfReviews,
          ratingSummary: reviewDataList
        });
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
