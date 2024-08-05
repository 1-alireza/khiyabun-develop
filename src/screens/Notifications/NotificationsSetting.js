import {AppState, I18nManager, Linking, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import gStyles from "../../global-styles/GlobalStyles";
import NotificationsSettingItem from "./NotificationsSettingItem";
import Button from "../../components/Button";
import * as Notifications from 'expo-notifications';
import {ButtonGroup} from "@rneui/themed";

const BoardScreen = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [notificationPermission, setNotificationPermission] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const [notificationSettings, setNotificationSettings] = useState({
        notifications: false,
        timeClock: false,
        requests: false,
        chats: false,
        announcements: false,
        articles: false,
        birthdays: false
    });

    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const weekdays = I18nManager.isRTL ? ['شنبه', 'ی ‌شنبه', 'د شنبه', 'س ‌شنبه', 'چ شنبه', 'پ ‌شنبه', 'جمعه'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


    useEffect(() => {
        (async () => {
            await loadNotificationPermission();
        })();

        const subscription = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const loadNotificationPermission = async () => {
        const {status} = await Notifications.getPermissionsAsync();
        const isAllowed = status === 'granted';

        setNotificationPermission(isAllowed);
    };
    const handleAppStateChange = async (nextAppState) => {
        if (nextAppState === 'active') { // When coming back to the app
            await loadNotificationPermission(); // Check notification permissions directly
        }
    };

    const toggleNotifications = () => {
        setNotificationSettings(prevSettings => ({
            ...prevSettings,
            notifications: !prevSettings.notifications
        }));
    };

    const toggleSetting = (setting) => {
        setNotificationSettings(prevSettings => ({
            ...prevSettings,
            [setting]: !prevSettings[setting]
        }));
    };


    return (
        <ScrollView style={styles.mainView}>
            <Card customStyle={notificationPermission ? styles.notificationSection : styles.settingSection}>
                {notificationPermission ? (
                    <>
                        <NotificationsSettingItem
                            cStyle={{height: 60}}
                            icon={"notification-bold"}
                            title={t("notification")}
                            disabled={!notificationPermission}
                            isOn={notificationPermission && notifications}
                            onToggle={toggleNotifications}
                            lastItem={true}/>

                        <View style={styles.weekDays}>
                            <View style={styles.weekDaysTitle}>
                                <KhiyabunIcons name={"sun-bold"} size={18} color={colors.secondary}/>
                                <Text allowFontScaling={false} style={styles.text}>{t("which_days")}</Text>
                            </View>
                            <ButtonGroup
                                buttons={weekdays}
                                selectMultiple
                                selectedIndexes={selectedWeekdays}
                                onPress={(value) => {
                                    setSelectedWeekdays(value);
                                }}
                                containerStyle={styles.weekdaysContainer}
                                textStyle={styles.weekdaysButtonText}
                                selectedButtonStyle={{backgroundColor: colors.primaryContainer}}
                                selectedTextStyle={styles.weekdaysButtonText}
                                buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}
                                innerBorderStyle={{color: colors.primaryOutline, width: 1}}
                            />
                        </View>

                    </>
                ) : (
                    <>
                        <View style={styles.wrapper}>
                            <KhiyabunIcons
                                name={"guard-bold"}
                                size={18}
                                color={colors.error}
                                style={{marginBottom: 5}}
                            />
                            <Text allowFontScaling={false} style={styles.text}>
                                {t("allow_push_notification")}
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.supportingText}>
                            {t("notification_supporting_text")}
                        </Text>
                        <Button
                            style={{marginVertical: 8}}
                            onPress={() => Linking.openSettings()}
                            label="Open device setting"
                            sizeButton="small"
                            typeButton="full"
                            styleText={styles.buttonTextStyle}
                        />
                    </>
                )}
            </Card>

            <Card>
                <Text style={styles.header}>{t("notify_me_about")}</Text>

                <NotificationsSettingItem
                    icon="clock-bold"
                    title={t("timeClock")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.timeClock}
                    onToggle={() => toggleSetting('timeClock')}
                />

                <NotificationsSettingItem
                    icon="messages-3-bold"
                    title={t("requests")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.requests}
                    onToggle={() => toggleSetting('requests')}
                />

                <NotificationsSettingItem
                    icon="chat-bold"
                    title={t("chats")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.chats}
                    onToggle={() => toggleSetting('chats')}
                />

                <NotificationsSettingItem
                    icon="gift-bold"
                    title={t("announcements")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.announcements}
                    onToggle={() => toggleSetting('announcements')}
                />

                <NotificationsSettingItem
                    icon="radar-2-bold"
                    title={t("articles")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.articles}
                    onToggle={() => toggleSetting('articles')}
                />

                <NotificationsSettingItem
                    icon="cake-bold"
                    title={t("birthdays")}
                    disabled={!notificationPermission}
                    isOn={notificationPermission && notificationSettings.birthdays}
                    onToggle={() => toggleSetting('birthdays')}
                />
            </Card>
        </ScrollView>
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        settingSection: {
            marginTop: 12, paddingVertical: 8, paddingHorizontal: 22
        },
        notificationSection: {
            marginTop: 12,
            paddingBottom: 24
        },
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        header: {
            ...gStyles.fontBold,
            color: colors.onSurface,
            fontSize: 16,
            lineHeight: 24,
            textAlign: "left",
            margin: 5,
        },
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginVertical: 5,
        },
        weekDaysTitle: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginVertical: 5,
            marginHorizontal: 12,
        },
        weekDays: {
            gap: 8,
        },
        text: {
            ...gStyles.fontMain,
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            textAlign: "left",
        },
        supportingText: {
            ...gStyles.fontMain,
            color: colors.onSurfaceLow,
            fontSize: 12,
            lineHeight: 16,
            textAlign: "left",
        },
        buttonTextStyle: {
            ...gStyles.fontBold,
            fontSize: 14,
            lineHeight: 20,
        },
        weekdaysContainer: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderColor: colors.primaryOutline
        },
        weekdaysButtonText: {
            ...gStyles.fontBold,
            fontSize: 12,
            lineHeight: 16,
            color: colors.onPrimaryContainer,
        },
    });

};


export default BoardScreen;
