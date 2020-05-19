const { v4: uuidv4 } = require('uuid');
const stripeWrapper = require('../helper/Stripe');


export default (app) => {
  app.post('/v1/create-payment-intent', async (req, res) => {
    try {
      const { cart } = req.body;

      // Create a PaymentIntent with the order amount and currency
      const clientSecret = stripeWrapper.createIntent(1300);

      if (clientSecret) {
        res.send({
          clientSecret,
        });
      }
    } catch (e) {
      console.error(e);
    }
    res.status(400).end();
  });
};
