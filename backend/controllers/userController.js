import { User } from '../models/User.js';
import { Service } from '../models/Service.js';
import { Invoice } from '../models/Invoice.js';
import { Ticket } from '../models/Ticket.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const services = await Service.getByUserId(userId);
    const invoices = await Invoice.getByUserId(userId);
    const tickets = await Ticket.getByUserId(userId);
    
    res.render('dashboard/dashboard', {
      title: 'User Dashboard',
      services,
      invoices,
      tickets,
      activeServices: services.filter(s => s.status === 'active').length,
      pendingInvoices: invoices.filter(i => i.status === 'unpaid').length,
      openTickets: tickets.filter(t => t.status === 'open').length
    });
  } catch (error) {
    console.error(error);
    res.redirect('/auth/login');
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    res.render('dashboard/profile', { title: 'My Profile', user });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.updateProfile(req.session.user.id, { name, email });
    req.session.user.name = name;
    req.session.user.email = email;
    res.redirect('/dashboard/profile?success=true');
  } catch (error) {
    console.error(error);
    res.render('dashboard/profile', { error: 'Update failed', title: 'My Profile' });
  }
};
