/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Notifications } from 'react-native-notifications';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import RNInsider from 'react-native-insider';
import OneSignal from 'react-native-onesignal';
import {
  INSIDER_PARTER_NAME,
  INSIDER_GROUP_BUNDLE_ID,
  ONESIGNAL_APP_ID,
} from './config';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    let dataN = ((notification || {}).data || {}).source || "";
    console.log("NOTIFICATION:", notification);

    if (dataN != "Insider") {
      notification.finish(PushNotificationIOS.FetchResult.NoData);

      return;
    }

    RNInsider.handleNotification(notification);
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// Notifications.registerRemoteNotifications();
//
//     Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
//         // TODO: Send the token to my server so it could send back push notifications...
//         console.log("Device Token Received", event.deviceToken);
//     });
//     Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
//         console.error(event);
//     });
//
// Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
//   console.log('Notification Received - Foreground', notification)
//   // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
//   completion({ alert: false, sound: false, badge: false })
// })
//
// Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
//   console.log('Notification Received - Background', notification)
//
//   // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
//   completion({ alert: true, sound: true, badge: false })
// })
//
// Notifications.getInitialNotification()
//     .then(notification => {
//       console.log('Initial notification was:', notification || 'N/A')
//     })
//     .catch(err => console.error('getInitialNotifiation() failed', err))

AppRegistry.registerComponent(appName, () => App);
