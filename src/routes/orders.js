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
    .post(async (req, res) => {
      try {
        if (req.body === undefined) {
          res.status(400).end();
        } else if (req.user === undefined) {
          res.status(401).end();
        } else {
          const orderData = {
            ...req.body,
            customer: req.user.data._id,
            status: 'pending',
            created_at: Date.now(),
          };
          const newOrder = OrderModel(orderData);

          const amount = newOrder.totalAmount;
          const { paymentIntentId, clientSecret } = StripePaymentWrapper.createIntent(amount);

          if (paymentIntentId) {
            newOrder.paymentIntentId = paymentIntentId;
          }
          const order = await newOrder.save();
          if (order) {
            res.send({ order, clientSecret }).end();
          } else {
            res.status(500).end();
          }
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
