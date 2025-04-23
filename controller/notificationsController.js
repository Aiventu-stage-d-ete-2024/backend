import Notifications from '../model/notificationsModel.js';
import { createNotification as createNotificationUtil  } from '../middleware/createNotification.js';
import { io } from '../server.js'; 

export async function postNotification(req, res) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }
  
      const newNotification = await createNotificationUtil(message);
      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Error creating notification via HTTP:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
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