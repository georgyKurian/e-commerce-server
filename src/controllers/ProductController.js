import { ProductModel } from '../models/Product';
import StripePaymentWrapper from '../helper/Stripe';

const productController = {};


productController.findById = (productId) => {
  return ProductModel.findById(productId);
}
productController.findProducts = (categoryList, start=0, limit=16) => {
  let categoryRegexList;

  // Generate RegExp for each category to search without case sensitivity
  if(categoryList.length > 0){
    categoryRegexList = categoryList.map((category)=> new RegExp(category,'i'));
  }

  return ProductModel.find(
    categoryRegexList ? { category: { $in: categoryRegexList } }
      : undefined
  )
  .sort({created_at: -1})
  .skip(start)
  .limit(limit)
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
};
/* 
productController.findOne = (req, res) => {
  res.send(req.order);
};


productController.update = (req, res) => {
  req.order.update(req.body, (err, orders) => {
    if (orders) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
};

productController.delete = (req, res) => {
  OrderModel.findByIdAndDelete(req.order._id, (err, order) => {
    if (order) {
      res.send(order);
    }
    else if(error){
      res.status(400).json({error});
    }
  });
};

productController.createForPayment = (req, res) => {
  try {
    if (req.body.items === undefined || req.user === undefined) {
      res.status(400).end();
    } else {
      const orderData = {
        customer: req.user.data._id,
        status: 'pending',
        created_at: Date.now(),
      };
      const newOrder = OrderModel(orderData);
      newOrder.setProducts(req.body.items).then(
        () => {
          const amount = newOrder.totalAmount;
          StripePaymentWrapper.createIntent(amount).then(
            ({ paymentIntentId, clientSecret }) => {
              if (paymentIntentId) {
                newOrder.paymentIntentId = paymentIntentId;
              }
              newOrder.save().then((order) => {
                if (order) {
                  const orderJson = order.toJSON();
                  orderJson.paymentIntentSecret = clientSecret;
                  res.send(orderJson);
                } else {
                  res.status(500).end();
                }
              });
            },
          );
        },
      );
    }
  } catch (e) {
    res.status(404).end();
  }
};

productController.updateItems = (req, res) => {
  req.order
    .setProducts(req.body.items)
    .then(() => {
      const amount = req.order.totalAmount;
      StripePaymentWrapper
        .updateIntent(req.order.paymentIntentId, amount)
        .then(({ clientSecret, amount: stripeAmount }) => {
          if (clientSecret && amount && amount === stripeAmount) {
            req.order
              .save()
              .then((updatedOrder) => {
                const updatedOrderJSON = updatedOrder.toJSON();
                updatedOrderJSON.paymentIntentSecret = clientSecret;            
                res.send(updatedOrderJSON);                  
              });
          }
        });
    })
    .catch((error)=>{
      res.status(400).json({error});
    });
};

productController.updateDetails = (req, res) => {
  req.order.billingAddress = req.body.billingAddress;
  req.order
    .save()
    .then((order) => {
      res.status(200).send(order).end();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

productController.updateStatus = (req, res) => {
  if(req.body.status === 'Paid' ) {
    req.order.status = 'paid';
  }
  req.order
    .save()
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });    
};

 */
export default productController;
