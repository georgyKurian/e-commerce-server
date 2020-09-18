import { OrderModel, ORDER_STATUS } from '../models/Order';

const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');;
const bodyParser = require('body-parser');

const endpointSecret = 'whsec_l1CaqgoRdUzO75LxNtI4ED7tvR3JOnQD';
const paymentIntentRegexp = new RegExp(/\bpayment_intent.([a-z])*$/,'');

function updateOrder(){

}

export default (router) => {
  router.post('', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    try {
      // jovial-serene-zest-cozy
      const signature = req.headers['stripe-signature'];
      
      let event;
      let paymentIntent;          

      try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      }
      catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if( paymentIntentRegexp.test(event.type) ){
        paymentIntent = event.data.object;
      }

      const order = OrderModel
        .find({ paymentIntentId: paymentIntent.id,  })
        .then((order)=>{
          console.log(order);              
        });

      switch (event.type) {
        case 'payment_intent.succeeded':
          order.status = ORDER_STATUS.PROCESSING;          
        case 'payment_intent.amount_capturable_updated':
        case 'payment_intent.payment_failed':
        case 'payment_intent.processing':
        case 'payment_intent.requires_action':          
          console.log('PaymentIntent was successful!');
          console.log(paymentIntent);
          break;
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
