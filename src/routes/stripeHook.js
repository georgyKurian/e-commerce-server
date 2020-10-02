import { OrderModel, ORDER_STATUS } from '../models/Order';

const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');
const bodyParser = require('body-parser');

const endpointSecret = 'whsec_l1CaqgoRdUzO75LxNtI4ED7tvR3JOnQD';
const paymentIntentRegexp = new RegExp(/\bpayment_intent.([a-z])*$/, '');

export default (router) => {
  router.post(
    '',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
      try {
        // jovial-serene-zest-cozy
        const signature = req.headers['stripe-signature'];

        let event;
        let paymentIntent;

        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret,
          );
        } catch (err) {
          res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (paymentIntentRegexp.test(event.type)) {
          paymentIntent = event.data.object;
        } else {
          return res.status(400).end();
        }

        OrderModel.findOne({ paymentIntentId: paymentIntent.id }).then((order) => {
          if (order) {
            switch (event.type) {
              case 'payment_intent.amount_capturable_updated':
                break;
              case 'payment_intent.processing':
                order.status = ORDER_STATUS.PROCESSING;
                break;
              case 'payment_intent.requires_action':
                break;
              case 'payment_intent.payment_failed':
                order.status = ORDER_STATUS.FAILED;
                break;
              case 'payment_intent.succeeded':
                order.status = ORDER_STATUS.COMPLETED;
                break;
              default:
                // Unexpected event type
                return res.status(400).end();
            }
            return order.save().then(() => res.json({ received: true }));
          }
          return res.status(400).end('Order not found!');
        });
      } catch (e) {
        console.error(e);
        res.status(400).end('Exception ocuured!');
      }
    },
  );
};
