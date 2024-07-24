// components/Notification.js
"use client"
import { useEffect } from 'react';
import { messaging } from '../../firebase';
import { getToken, onMessage } from 'firebase/messaging';

const Notification = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await Notification.requestPermission();
        const token = await getToken(messaging, { vapidKey:'BN4GZFHyYUAu7X5wFX65Bq40PR6HZM3dLujvlyKYEhUYVeH-Z1JoCYNWZjaZvccmx9cY9PywupcrhwbSV3y-mYQ' });
        console.log('FCM Token:', token);
        // Send this token to your server to store it and use it to send notifications
      } catch (error) {
        console.error('Error getting notification permission:', error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Customize notification handling here
    });
  }, []);

  return null;
};

export default Notification;
