import {I18nManager, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import React from "react";
import avatar from "../../../assets/img/3d_avatar_21.png";
import jalaali from "jalaali-js";
import gStyles from "../../global-styles/GlobalStyles";


function Team({item}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, isRTL)

    const trimmedName = item.teamName?.length > 0 ? item.teamName?.charAt(0) : '';
    const startTimestamp = item.fromTime;
    const endTimestamp = item.toTime;

    const startJalaliDate = new Date(startTimestamp);
    const jalaliStartDate = jalaali.toJalaali(startJalaliDate);
    const startDayJalali = jalaliStartDate.jd;
    const startMonthJalali = getJalaliMonthName(jalaliStartDate.jm);
    const startYearJalali = jalaliStartDate.jy;
    const formattedJalaliStartDate = `${startDayJalali} ${startMonthJalali} ${startYearJalali}`;

    const endJalaliDate = new Date(endTimestamp);
    const jalaliEndDate = jalaali.toJalaali(endJalaliDate);
    const endDayJalali = jalaliEndDate.jd;
    const endMonthJalali = getJalaliMonthName(jalaliEndDate.jm);
    const endYearJalali = jalaliEndDate.jy;
    const formattedJalaliEndDate = `${endDayJalali} ${endMonthJalali} ${endYearJalali}`;


    function getJalaliMonthName(monthNumber) {
        const monthNames = [
            "فروردین", "اردیبهشت", "خرداد", "تیر",
            "مرداد", "شهریور", "مهر", "آبان",
            "آذر", "دی", "بهمن", "اسفند"
        ];
        return monthNames[monthNumber - 1];
    }

    const englishStartDateObj = new Date(startTimestamp);
    const startDay = englishStartDateObj.getDate();
    const startMonth = englishStartDateObj.toLocaleString("default", {month: "long"});
    const startYear = englishStartDateObj.getFullYear();
    const formattedStartDate = `${startDay} ${startMonth} ${startYear}`;

    const englishEndDateObj = new Date(endTimestamp);
    const endDay = englishEndDateObj.getDate();
    const endMonth = englishEndDateObj.toLocaleString("default", {month: "long"});
    const endYear = englishEndDateObj.getFullYear();
    const formattedEndDate = `${endDay} ${endMonth} ${endYear}`;


    return (
        <Pressable style={styles.blockUser}>
            <View style={styles.userData}>
                {item.teamImage == "null" ? (
                        <Image source={avatar} style={styles.avatarImage}/>

                    ) :
                    <View style={styles.contactProfile}>
                        <Text style={styles.contactShortName}>
                            {trimmedName}
                        </Text>
                    </View>
                }
                <View>
                    <Text style={styles.username}>
                        {item.teamName}
                    </Text>
                    <Text style={styles.userDistance}>
                        {isRTL ? t("join") + " : " + formattedJalaliStartDate : t("join") + " : " + formattedStartDate}
                    </Text>
                    <Text style={styles.userDistance}>
                        {isRTL ? t("leave") + " : " + formattedJalaliEndDate : t("leave") + " : " + formattedEndDate}
                    </Text>
                </View>

            </View>

        </Pressable>
    )

}

const useThemedStyles = (colors, isRTl) => {
    return StyleSheet.create({
        blockUser: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            padding: 8
        },
        contactProfile: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
        },
        contactShortName: {
            fontFamily: "dana-bold",
            fontSize: 18,
            color: colors.surfaceContainerLowest,
            marginTop: 4
        },
        userData: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16
        },
        username: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.onSurface

        },
        userDistance: {
            fontFamily: isRTl ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        unBlock: {
            color: colors.darkPrimary,
            fontFamily: "dana-bold",
            fontSize: 14,
            lineHeight: 20
        },
        avatarImage: {
            width: 40,
            height: 40,
            borderRadius: 50,
            overflow: "hidden",
        },
    });
};

export default Team