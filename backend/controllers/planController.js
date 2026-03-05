import { Plan } from '../models/Plan.js';

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.getAll();
    res.render('pages/pricing', { title: 'Our Pricing Plans', plans });
  } catch (error) {
    console.error(error);
    res.render('pages/pricing', { error: 'Failed to load plans', title: 'Our Pricing Plans' });
  }
};

export const getPlanDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.getById(id);
    if (!plan) {
      return res.redirect('/pricing');
    }
    res.render('pages/plan-details', { title: plan.name, plan });
  } catch (error) {
    console.error(error);
    res.redirect('/pricing');
  }
};
