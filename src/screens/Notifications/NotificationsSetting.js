import {AppState, Linking, ScrollView, StyleSheet, View} from "react-native";
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
import {getRequest, putRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import CustomText from "../../components/CustomText";

const NotificationsSetting = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const userToken = useSelector(state => state.login.token);
    const lang = useSelector(state => state.language.language);
    const [notificationPermission, setNotificationPermission] = useState(false);
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const weekdays = lang === "fa" ? ['شنبه', 'ی ‌شنبه', 'د شنبه', 'س ‌شنبه', 'چ شنبه', 'پ ‌شنبه', 'جمعه'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [allNotifications, setAllNotifications] = useState(true);

    const [notificationSettings, setNotificationSettings] = useState({
        TIME_CLOCK: true,
        REQUEST: true,
        CHAT: true,
        ANNOUNCEMENT: true,
        NEW_ARTICLE: true,
        BIRTHDAY: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await getRequest("profile/notification_settings", {}, userToken);

        if (res.statusCode === 200) {
            setAllNotifications(res.data.isNotificationsEnabled)

            let preferredDays = res.data.preferredDays;
            const indexes = weekdaysToIndexes(preferredDays);
            setSelectedWeekdays(indexes);

            let notificationPreferences = res.data.notificationPreferences;
            updateNotificationSettings(notificationPreferences);
        }
    };

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
        if (nextAppState === 'active') {
            await loadNotificationPermission();
        }
    };

    const setAllNotificationState = async () => {
        setAllNotifications(!allNotifications);
        let body = {isEnabled: !allNotifications}
        try {
            const res = await putRequest(`profile/notification_settings/notifications`, body, userToken);
            console.log(res)
            if (res.statusCode !== 200) {
                console.error('Error setting All notifications:', res);
            }
        } catch (error) {
            console.error('Error setting All notifications:', error);
        }
    };

    const setNotificationPreference = async (setting) => {
        setNotificationSettings(prevSettings => {
            const updatedSettings = {
                ...prevSettings,
                [setting]: !prevSettings[setting]
            };
            setPreferredNotification(updatedSettings);
            return updatedSettings;
        });
    };

    const setPreferredDays = async (body) => {
        try {
            const res = await putRequest(`profile/notification_settings/preferred_days`, body, userToken);
            if (res.statusCode !== 200) {
                console.error('Error setting Preferred Day:', res);
            }
        } catch (error) {
            console.error('Error setting Preferred Day:', error);
        }
    };

    const setPreferredNotification = async (body) => {
        try {
            const res = await putRequest(`profile/notification_settings/notification_type`, body, userToken);
            if (res.statusCode !== 200) {
                console.error('Error setting Preferred Day:', res);
            }
        } catch (error) {
            console.error('Error setting Preferred Day:', error);
        }
    };

    const weekdaysToIndexes = (weekdays) => {
        const indexes = [];

        if (lang === 'fa') {
            if (weekdays['SATURDAY']) indexes.push(0);
            if (weekdays['SUNDAY']) indexes.push(1);
            if (weekdays['MONDAY']) indexes.push(2);
            if (weekdays['TUESDAY']) indexes.push(3);
            if (weekdays['WEDNESDAY']) indexes.push(4);
            if (weekdays['THURSDAY']) indexes.push(5);
            if (weekdays['FRIDAY']) indexes.push(6);
        } else {
            if (weekdays['SUNDAY']) indexes.push(0);
            if (weekdays['MONDAY']) indexes.push(1);
            if (weekdays['TUESDAY']) indexes.push(2);
            if (weekdays['WEDNESDAY']) indexes.push(3);
            if (weekdays['THURSDAY']) indexes.push(4);
            if (weekdays['FRIDAY']) indexes.push(5);
            if (weekdays['SATURDAY']) indexes.push(6);
        }

        return indexes;
    };

    const indexesToWeekdays = (indexes) => {
        const weekdays = [];

        if (lang === 'fa') {
            if (indexes.includes(0)) weekdays.push('SATURDAY');
            if (indexes.includes(1)) weekdays.push('SUNDAY');
            if (indexes.includes(2)) weekdays.push('MONDAY');
            if (indexes.includes(3)) weekdays.push('TUESDAY');
            if (indexes.includes(4)) weekdays.push('WEDNESDAY');
            if (indexes.includes(5)) weekdays.push('THURSDAY');
            if (indexes.includes(6)) weekdays.push('FRIDAY');
        } else {
            if (indexes.includes(0)) weekdays.push('SUNDAY');
            if (indexes.includes(1)) weekdays.push('MONDAY');
            if (indexes.includes(2)) weekdays.push('TUESDAY');
            if (indexes.includes(3)) weekdays.push('WEDNESDAY');
            if (indexes.includes(4)) weekdays.push('THURSDAY');
            if (indexes.includes(5)) weekdays.push('FRIDAY');
            if (indexes.includes(6)) weekdays.push('SATURDAY');
        }

        return weekdays;
    };

    function createDaysObject(daysArray) {
        const allDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const daysObject = {};

        allDays.forEach(day => {
            daysObject[day] = daysArray.includes(day);
        });

        return daysObject;
    }

    const updateNotificationSettings = (apiResponse) => {
        setNotificationSettings({
            TIME_CLOCK: apiResponse['TIME_CLOCK'] || false,
            REQUEST: apiResponse['REQUEST'] || false,
            CHAT: apiResponse['CHAT'] || false,
            ANNOUNCEMENT: apiResponse['ANNOUNCEMENT'] || false,
            NEW_ARTICLE: apiResponse['NEW_ARTICLE'] || false,
            BIRTHDAY: apiResponse['BIRTHDAY'] || false,
        });
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
                            isOn={notificationPermission && allNotifications}
                            onToggle={setAllNotificationState}
                            lastItem={true}/>

                        <View style={styles.weekDays}>
                            <View style={styles.weekDaysTitle}>
                                <KhiyabunIcons name={"sun-bold"} size={18} color={colors.secondary}/>
                                <CustomText
                                    size={15} color={colors.onSurfaceHigh} lineHeight={24} textAlign={'left'}>
                                    {t("which_days")}
                                </CustomText>
                            </View>
                            <ButtonGroup
                                buttons={weekdays}
                                selectMultiple
                                selectedIndexes={selectedWeekdays}
                                onPress={(value) => {
                                    setPreferredDays(createDaysObject(indexesToWeekdays(value)))
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
                            <CustomText
                                size={15} color={colors.onSurfaceHigh} lineHeight={24} textAlign={'left'}>
                                {t("allow_push_notification")}
                            </CustomText>
                        </View>
                        <CustomText
                            size={11} color={colors.onSurfaceLow} lineHeight={16} textAlign={'left'}>
                            {t("notification_supporting_text")}
                        </CustomText>
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
                <CustomText
                    size={15} weight={'bold'} color={colors.onSurface} lineHeight={24} textAlign={'left'}
                    customStyle={{margin: 5}}>
                    {t("notify_me_about")}
                </CustomText>
                <NotificationsSettingItem
                    icon="clock-bold"
                    title={t("timeClock")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.TIME_CLOCK}
                    onToggle={() => setNotificationPreference('TIME_CLOCK')}
                />

                <NotificationsSettingItem
                    icon="messages-3-bold"
                    title={t("requests")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.REQUEST}
                    onToggle={() => setNotificationPreference('REQUEST')}
                />

                <NotificationsSettingItem
                    icon="chat-bold"
                    title={t("chats")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.CHAT}
                    onToggle={() => setNotificationPreference('CHAT')}
                />

                <NotificationsSettingItem
                    icon="gift-bold"
                    title={t("announcements")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.ANNOUNCEMENT}
                    onToggle={() => setNotificationPreference('ANNOUNCEMENT')}
                />

                <NotificationsSettingItem
                    icon="radar-2-bold"
                    title={t("articles")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.NEW_ARTICLE}
                    onToggle={() => setNotificationPreference('NEW_ARTICLE')}
                />

                <NotificationsSettingItem
                    icon="cake-bold"
                    title={t("birthdays")}
                    disabled={!notificationPermission || !allNotifications}
                    isOn={notificationPermission && notificationSettings.BIRTHDAY}
                    onToggle={() => setNotificationPreference('BIRTHDAY')}
                />
            </Card>
        </ScrollView>
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            height: "100vh",
            paddingBottom: 75,
            paddingHorizontal: 16,
        },
        settingSection: {
            marginTop: 12, paddingVertical: 8, paddingHorizontal: 22
        },
        notificationSection: {
            marginTop: 12,
            paddingBottom: 24
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
            fontSize: 11,
            lineHeight: 16,
            color: colors.onPrimaryContainer,
        },
    });
};

export default NotificationsSetting;
