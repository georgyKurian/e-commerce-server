const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');

export default (app) => {
  app.post('/v1/create-payment-intent', async (req, res) => {
    try {
      const { cart } = req.body;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1400,
        currency: 'cad',
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });
};
