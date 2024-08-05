import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl, Pressable, Text, Alert, Linking} from 'react-native';
import {useNavigation, useTheme} from "@react-navigation/native";
import Calendar from "./Calendar";
import DailyAdvice from "./DailyAdvice";
import TimeClock from "./TimeClock";
import Requests from "./Requests";
import News from "./News";
import Flags from "./Flags";
import Birthday from "./Birthday";
import ArticleAndPodcast from "./ArticleAndPodcast";
import {getRequest} from "../../utils/sendRequest";
import {receiveProfileData} from "../../redux/actions/profileAction";
import {errorHandling} from "../../utils/errorHandling";
import Meeting from "./Meeting";
import Task from "./Task";
import Deal from "./Deal";
import Vote from "./Vote";
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN_KEY} from "../../utils/constant";

import * as Notifications from 'expo-notifications';

const HomeScreen = () => {
    const navigation = useNavigation()
    const {colors} = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const {profileData} = useSelector((state) => state.profile); // Access the slice state
    const dispatch = useDispatch();// Access the slice state
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        const configureNotifications = async () => {
            const storedPermission = await AsyncStorage.getItem('notificationPermission');

            if (storedPermission === 'false') {
                return;
            }

            const token = await requestPushNotificationPermissions();
            setExpoPushToken(token);

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                }),
            });
        };

        configureNotifications();
    }, []);



    const requestPushNotificationPermissions = async () => {
        try {
            const { status } = await Notifications.getPermissionsAsync();
            console.log("Current Notifications status:", status);

            if (status === 'granted') {
                const token = await Notifications.getExpoPushTokenAsync();
                await AsyncStorage.setItem('notificationPermission', 'true');
                setExpoPushToken(token.data);
                return token.data;
            } else if (status === 'undetermined') {
                const { status: newStatus } = await Notifications.requestPermissionsAsync();
                if (newStatus === 'granted') {
                    const token = await Notifications.getExpoPushTokenAsync();
                    setExpoPushToken(token.data);
                    return token.data;
                } else {
                    await AsyncStorage.setItem('notificationPermission', 'false');
                    return null;
                }
            } else {
                await AsyncStorage.setItem('notificationPermission', 'false');
                return null;
            }
        } catch (error) {
            console.error("Error requesting push notification permissions:", error);
            await AsyncStorage.setItem('notificationPermission', 'false');
            return null;
        }
    };
    const promptUserToOpenSettings = () => {
        Alert.alert(
            'Notification Permissions Required',
            'We need notification permissions to notify you about important updates. Please enable them in your app settings.',
            [
                {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings() // Open app settings
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };
    const sendPushNotification = async (token) => {
        const message = {
            to: token,
            sound: 'default',
            title: 'Test Notification',
            body: 'This is a test notification',
            data: {someData: 'goes here'},
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };


    useEffect(() => {
        setNotifications(10);
        navigation.setParams({badgeCount: notifications});
    }, [notifications]);

    const getProfileData = () => {
        dispatch(receiveProfileData("profile")); // Dispatch the async action
    };

    useEffect(() => {
        getProfileData(); // Fetch profile data when the component mounts
    }, [dispatch]); // Make sure to include dispatch in dependency array


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            progressBackgroundColor={colors.surfaceContainerLowest}/>}>
            <View>
                <Calendar/>
                <DailyAdvice/>
                <TimeClock/>
                {/*<Meeting/>*/}
                {/*<Task/>*/}
                <Requests/>
                <News/>
                {/*<Deal/>*/}
                <Flags/>
                <Birthday/>
                {/*<Vote/>*/}
                <ArticleAndPodcast/>
            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
});

export default HomeScreen;
