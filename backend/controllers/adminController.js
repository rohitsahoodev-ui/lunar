import { User } from '../models/User.js';
import { Service } from '../models/Service.js';
import { Invoice } from '../models/Invoice.js';
import { Ticket } from '../models/Ticket.js';
import { Plan } from '../models/Plan.js';
import { Node } from '../models/Node.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.getAll(); // Assuming getAll() exists
    const services = await Service.getAll(); // Assuming getAll() exists
    const invoices = await Invoice.getAll(); // Assuming getAll() exists
    const tickets = await Ticket.getAll(); // Assuming getAll() exists
    
    res.render('admin/admin-dashboard', {
      title: 'Admin Dashboard',
      usersCount: users.length,
      servicesCount: services.length,
      unpaidInvoices: invoices.filter(i => i.status === 'unpaid').length,
      openTickets: tickets.filter(t => t.status === 'open').length,
      recentUsers: users.slice(0, 5),
      recentTickets: tickets.slice(0, 5)
    });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.render('admin/admin-users', { title: 'Manage Users', users });
  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
};

export const getAdminPlans = async (req, res) => {
  try {
    const plans = await Plan.getAll();
    res.render('admin/admin-plans', { title: 'Manage Plans', plans });
  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
};

export const getAdminNodes = async (req, res) => {
  try {
    const nodes = await Node.getAll();
    res.render('admin/admin-nodes', { title: 'Manage Nodes', nodes });
  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
};
