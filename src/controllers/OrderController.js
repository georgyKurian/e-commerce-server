import { OrderModel, ORDER_STATUS } from '../models/Order';
import StripePaymentWrapper from '../helper/Stripe';

const orderController = {};

orderController.findById = (orderId) => OrderModel.findById(orderId);

orderController.findUserOrders = (userId, start, limit) => OrderModel
  .find({ customer: userId })
  .sort({ created_at: -1 })
  .skip(start)
  .limit(limit)
  .select({
    paymentIntentId: 0,
  });

orderController.findOne = (req, res) => {
  res.send(req.order);
};

orderController.update = (req, res) => {
  req.order.update(req.body, (err, orders) => {
    if (orders) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
};

orderController.delete = (req, res) => {
  OrderModel.findByIdAndDelete(req.order._id, (err, order) => {
    if (order) {
      res.send(order);
    } else if (error) {
      res.status(400).json({ error });
    }
  });
};

orderController.createForPayment = (req, res) => {
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

orderController.updateItems = (req, res) => {
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
    .catch((error) => {
      res.status(400).json({ error });
    });
};

orderController.updateDetails = (req, res) => {
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

orderController.updateStatus = (req, res) => {
  if (req.body.status === 'Paid') {
    req.order.status = ORDER_STATUS.PAYMENT_INITIATED;
    req.order
      .save()
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

export default orderController;
