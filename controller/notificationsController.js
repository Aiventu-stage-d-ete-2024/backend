import Notifications from '../model/notificationsModel.js';
import { io } from '../server.js'; 

export async function createNotification(req, res) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      if (typeof message !== 'string') {
        return res.status(400).json({ error: 'Message must be a string' });
      }
      const newNotification = new Notifications({ 
        message: message
      });
      await newNotification.save();
      const io = req.app.get('io');
      if (io) {
        io.emit('newNotification', newNotification);
      }
      console.log("Notification saved:", message); 
      return res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating notification:", error);
      return res.status(500).json({ error: error.message });
    }
  }

export async function getNotifications(req, res) {
  try {
    const notifications = await Notifications.find().sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
}

export async function createNotificationViaHttp(req, res) {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const notification = await createNotification(message);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating notification',
      error: error.message 
    });
  }
}