import OrderController from '../controllers/OrderController.js';
import { OrderModel } from '../models/Order';

export default (app) => {
  app.route('/v1/orders')
    .get(OrderController.findUserOrders)
    .post(OrderController.createForPayment);

  app.route('/v1/orders/:orderId')
    .all((req, res, next) => {
      if (!(req.user && req.params.orderId)) {
        res.status(400).end();
      }
      OrderModel.findById(req.params.orderId, (err, order) => {
        if (err) {
          res.status(400).json({ error: err });
        } else if (order) {
          if (order.customer.equals(req.user.data._id)) {
            req.order = order;
            next();
          } else res.status(403).json({ error: 'Forbidden access' });
        } else {
          res.status(400).json({ error: 'Invalid order' });
        }
      });
    })
    .get(OrderController.findOne)
    .put((req, res) => {
      if (req.body.items) {
        OrderController.updateItems(req, res);
      } else if (req.body.billingAddress || req.body.contact) {
        OrderController.updateDetails(req, res);
      } else if (req.body.status === 'paid') {
        OrderController.updateStatus(req, res);
      } else {
        res.status(400).json({ error: 'Invalid operation!' });
      }
    })
    .delete(OrderController.delete);
};
