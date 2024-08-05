import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import gStyles from "../../global-styles/GlobalStyles";
import {getRequest} from "../../utils/sendRequest";


function TimeClock() {
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const [latestWorkLog, setLatestWorkLog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getLatestWorkLog();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getLatestWorkLog = async () => {
        const body = {
            page: 0,
            size: 1,
            sortOrder: "desc",
            fromTime: "2024-04-30T00:00:00",
            toTime: "2024-04-30T23:59:59",
        }
        let res = await getRequest("work_log", body)
        console.log("ressssssssssssssssssssss",res)
        if (res.statusCode === 200) {
            setLatestWorkLog(res.data[0]);
        }
    };

    function formatTime(serverTime) {
        const date = new Date(serverTime);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    function timeDifference(serverTime1, serverTime2) {
        const date1 = new Date(serverTime1);
        const date2 = new Date(serverTime2);

        const diff = Math.abs(date2 - date1);

        // this round seconds , 2 min and 45 seconds => 3 min!
        const hoursDiff = Math.round(diff / (1000 * 60 * 60));
        const minutesDiff = Math.round((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiff.toString().padStart(2, '0')}`;
    }

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"clock-bold"} HeaderText={t("time_clock")}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{latestWorkLog?.workLogType}</Text>
                    <View style={styles.titleLine}/>
                </View>
                <View style={styles.textBoxWrapper}>
                    <View style={styles.textBox}>
                        <Text style={styles.textSecondary}>{t("time_clock_started_at")}</Text>
                        <Text style={styles.titlePrimary}>{formatTime(latestWorkLog?.startTime)}</Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.textSecondary}>{t("time_clock_finished_at")}</Text>
                        <Text style={styles.titlePrimary}>{formatTime(latestWorkLog?.endTime)}</Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.textSecondary}>{t("time_clock_time")}</Text>
                        <Text
                            style={styles.titlePrimary}>{timeDifference(latestWorkLog?.endTime, latestWorkLog?.startTime)}</Text>
                    </View>
                </View>
            </HomeCard>
        </View>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    const lang = useSelector(state => state.language.language);

    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 5
        },
        titleText: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.darkPrimary,
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 2
        },
        titleLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.primaryOutline, // Adjust the color as needed
            marginLeft: 10, // Adjust the spacing between text and line as needed
        },
        textBoxWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textBox: {
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            marginVertical: 5
        },
        textSecondary: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLowest,
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 20,
            marginBottom: 2
        },
        titlePrimary: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 24,
        },
    });
};

export default TimeClock;
