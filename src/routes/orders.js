import { OrderModel } from "../models/Order";

export default app => {
  app.get("/v1/orders", async (req, res) => {
    try {
      if (req.user === undefined) {
        res.status(401).end();
      }
      const orders =
        (await OrderModel.find({ customer: req.user.data._id })) || [];
      if (orders) {
        res.send(orders);
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.post("/v1/orders", async (req, res) => {
    try {
      if (req.body === undefined) {
        res.status(400).end();
      } else if (req.user === undefined) {
        res.status(401).end();
      } else {
        const orderData = {
          ...req.body,
          customer: req.user.data._id,
          timestamp: Date.now()
        };
        const order = await OrderModel.create(orderData);
        if (order) {
          res.send(order).end();
        } else {
          res.status(500).end();
        }
      }
    } catch (e) {
      res.status(404).end();
    }
  });
};
