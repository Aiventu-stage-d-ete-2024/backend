import Notifications from '../model/notificationsModel.js';
import { io } from '../server.js';

export async function createNotification(message) {
  try {
    const newNotification = new Notifications({ message });
    await newNotification.save();

    if (io) {
      io.emit('newNotification', newNotification);
    }

    console.log("Notification created:", message);
    return newNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}
