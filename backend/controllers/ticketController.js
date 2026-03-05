import { Ticket } from '../models/Ticket.js';

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.getByUserId(req.session.user.id);
    res.render('dashboard/tickets', { title: 'Support Tickets', tickets });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

export const createTicket = async (req, res) => {
  try {
    const { subject, category, priority, message } = req.body;
    const ticketId = await Ticket.create({
      userId: req.session.user.id,
      subject,
      category,
      priority
    });
    await Ticket.addMessage({ ticketId, userId: req.session.user.id, message });
    res.redirect(`/dashboard/tickets/${ticketId}`);
  } catch (error) {
    console.error(error);
    res.render('dashboard/tickets', { error: 'Failed to create ticket', title: 'Support Tickets' });
  }
};

export const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.getById(id);
    if (!ticket || ticket.user_id !== req.session.user.id) {
      return res.redirect('/dashboard/tickets');
    }
    const messages = await Ticket.getMessages(id);
    res.render('dashboard/ticket-details', { title: `Ticket #${id}`, ticket, messages });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/tickets');
  }
};

export const replyTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    await Ticket.addMessage({ ticketId: id, userId: req.session.user.id, message });
    res.redirect(`/dashboard/tickets/${id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/tickets');
  }
};
