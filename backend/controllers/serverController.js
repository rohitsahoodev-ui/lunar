import { Service } from '../models/Service.js';
import { Node } from '../models/Node.js';

export const getServiceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.getById(id);
    if (!service || service.user_id !== req.session.user.id) {
      return res.redirect('/dashboard/services');
    }
    const node = await Node.getById(service.node_id);
    res.render('dashboard/service-details', { title: `Service #${id}`, service, node });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/services');
  }
};

export const controlServer = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // start, stop, restart
    const service = await Service.getById(id);
    if (!service || service.user_id !== req.session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // In a real app, this would call a node API (e.g. Pterodactyl or custom agent)
    console.log(`Performing ${action} on server ${id}`);
    
    res.json({ success: true, message: `Server ${action}ed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
