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

  app.post('/v1/stripe/webhook', async (req, res) => {
    try {
      const { type, data } = req.body;

      // Handle the event
      switch (type) {
        case 'payment_intent.succeeded':
          const paymentIntent = data.object;
          console.log('PaymentIntent was successful!');
          break;
        case 'payment_method.attached':
          const paymentMethod = data.object;
          console.log('PaymentMethod was attached to a Customer!');
          break;
          // ... handle other event types
        default:
          // Unexpected event type
          return res.status(400).end();
      }

      // Return a 200 response to acknowledge receipt of the event
      res.json({ received: true });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });
};
