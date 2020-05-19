const stripe = require('stripe')('sk_test_K8NejsGbnfInosovpfHLadFV001xXflaVN');

const StripePaymentWrapper = {
  createIntent: async (amount = 1400, currency = 'cad') => {
    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      return { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret };
    } catch (e) {
      console.error(e);
    }
    return null;
  },
};

export default StripePaymentWrapper;
