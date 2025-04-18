import Notification from '../model/notificationsModel.js';


export async function createNotification(message) {
  try {
    const newNotification = new Notification({ message });
    await newNotification.save();
    console.log("Notification saved:", message);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}


export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: 'Server error' });
  }
}
