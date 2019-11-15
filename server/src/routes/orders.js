import { OrderModel } from "../models/Order";

export default app => {
  app.get("/v1/orders", async (req, res) => {
    const orders = (await OrderModel.find()) || [];
    res.send(orders);
  });

  app.get("/v1/orders/:id", async (req, res) => {
    try {
      const order = await OrderModel.findById(req.params.id);
      if (order) {
        res.send(order);
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
          tomestamp: Date.now()
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
