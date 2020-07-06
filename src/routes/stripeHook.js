const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');;
const bodyParser = require('body-parser');

const endpointSecret = 'whsec_l1CaqgoRdUzO75LxNtI4ED7tvR3JOnQD';

export default (router) => {
  router.post('', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    try {
      // jovial-serene-zest-cozy
      const signature = req.headers['stripe-signature'];
      
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      }
      catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!');
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
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