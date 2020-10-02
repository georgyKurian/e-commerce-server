import OrderController from '../controllers/OrderController.js';
import { OrderModel } from '../models/Order';
import pagination from '../middlewear/pagination.js';

const orderPagination = pagination(10);

export default (app) => {
  app.route('/v1/orders')
    .get(
      orderPagination,
      ({ user, query: { skip, limit } }, res) => {
        OrderController
          .findUserOrders(user.data._id, skip, limit)
          .then((orders) => {
            res.send(orders);
          });
      },
    )
    .post(OrderController.createForPayment);

  app.route('/v1/orders/:orderId')
    .all((req, res, next) => {
      if (!(req.user && req.params.orderId)) {
        res.status(400).end();
      }
      OrderController
        .findById(req.params.orderId)
        .then((order) => {
          // Authorization check
          if (order.customer.equals(req.user.data._id)) {
            req.order = order;
            next();
          } else {
            res.status(403).json({ error: 'Forbidden access' });
          }
        })
        .catch((error) => res.status(400).json(error));
    })
    .get(OrderController.findOne)
    .put((req, res) => {
      if (req.body.items) {
        OrderController.updateItems(req, res);
      } else if (req.body.billingAddress || req.body.contact) {
        OrderController.updateDetails(req, res);
      } else if (req.body.status === 'Paid') {
        OrderController.updateStatus(req, res);
      } else {
        res.status(400).json({ error: 'Invalid operation!' });
      }
    })
    .delete(OrderController.delete);
};
