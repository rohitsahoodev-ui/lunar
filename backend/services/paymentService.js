import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export const PaymentService = {
  async createPaymentIntent(amount, currency = 'usd') {
    return await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency
    });
  },

  async verifyWebhook(payload, sig, secret) {
    return stripe.webhooks.constructEvent(payload, sig, secret);
  }
};
