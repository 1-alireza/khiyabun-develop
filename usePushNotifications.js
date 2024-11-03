import {useState, useEffect, useRef} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {Platform} from "react-native";
import * as TaskManager from 'expo-task-manager';

export const usePushNotifications = () => {
    const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

    TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({data, error, executionInfo}) => {
        console.log('Received a notification in the background!', data);

    });

    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    Notifications.setNotificationHandler({
        handleNotification: async (notification) => ({
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState();
    const [notification, setNotification] = useState();

    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
        } else {
            alert("Must be using a physical device for Push notifications");
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.HIGH, // Updated
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
                sound: 'notification.mp3'
            });
        }

        return token;
    }


    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
};

export default usePushNotifications;