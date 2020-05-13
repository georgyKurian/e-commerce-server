const stripe = require('stripe')('pk_test_RfZ1PvFjLuWOvHitWXLyQuHg00t9NwKTCK');

export default (app) => {
  app.post('/v1/create-payment-intent', async (req, res) => {
    try {
      const { items } = req.body;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 10.22,
        currency: 'cad',
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      res.status(404).end();
    }
  });
};
