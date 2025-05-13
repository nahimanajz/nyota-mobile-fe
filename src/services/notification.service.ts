import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const scheduleSyncNotification = async (message: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Note Syncing',
        body: `"${message}`,
        data: { type: 'sync' },
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
 Alert.alert("Failed to show notification");
    
  }
};