import { OrderModel } from '../models/Order';
import StripePaymentWrapper from '../helper/Stripe';

export default (app) => {
  app.route('/v1/orders')
    .get(async (req, res) => {
      try {
        if (req.user === undefined) {
          res.status(401).end();
        }

        OrderModel.find({ customer: req.user.data._id }, (err, orders) => {
          if (orders) {
            res.send(orders);
          } else {
            res.status(400).end();
          }
        });
      } catch (e) {
        res.status(404).end();
      }
    })
    .post((req, res) => {
      try {
        if (req.body.items === undefined) {
          res.status(400).end();
        } else if (req.user === undefined) {
          res.status(401).end();
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
                      // orderId: newOrderId, orderTotal, paymentIntentSecret
                      res.send({ orderId: order.id, orderTotal: amount, paymentIntentSecret: clientSecret }).end();
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
    })
    .put(async (req, res) => {
      try {
        // Update order before payment
      } catch (e) {
        res.status(404).end();
      }
    });
};
