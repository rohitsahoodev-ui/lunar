import { Invoice } from '../models/Invoice.js';
import { Payment } from '../models/Payment.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createStripeSession = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.getById(invoiceId);
    
    if (!invoice || invoice.status === 'paid') {
      return res.redirect('/dashboard/invoices');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Invoice #${invoice.id}`,
            description: invoice.description,
          },
          unit_amount: Math.round(invoice.amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice_id=${invoice.id}`,
      cancel_url: `${process.env.APP_URL}/dashboard/invoices`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/invoices?error=payment_failed');
  }
};

export const handlePaymentSuccess = async (req, res) => {
  try {
    const { session_id, invoice_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      await Invoice.updateStatus(invoice_id, 'paid');
      await Payment.create({
        invoiceId: invoice_id,
        amount: session.amount_total / 100,
        method: 'stripe',
        transactionId: session.id
      });
    }
    
    res.redirect('/dashboard/invoices?success=paid');
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/invoices');
  }
};
