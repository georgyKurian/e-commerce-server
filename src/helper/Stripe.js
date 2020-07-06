const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');

const StripePaymentWrapper = {

  createIntent: (amount = 1400, currency = 'cad') => {
    try {
      // Create a PaymentIntent with the order amount and currency
      return stripe.paymentIntents.create({
        amount,
        currency,
      }).then(
        (paymentIntent) => ({ paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }),
      )
        .catch((err) => { console.log(`Stripe Error:${err}`); });
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  retrieveIntent: async (paymentIntentId) => {
    try {
      const { client_secret: clientSecret } = await stripe.paymentIntents.retrieve(
        paymentIntentId,
      );
      return { clientSecret };
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  updateIntent: async (paymentIntentId, amount) => {
    try {
      const {
        client_secret: clientSecret,
        amount: stripeAmount,
        status,
      } = await stripe.paymentIntents.update(
        paymentIntentId,
        { amount },
      );
      return { clientSecret, amount: stripeAmount, status };
    } catch (e) {
      console.error(e);
    }
    return null;
  },

};

export default StripePaymentWrapper;
