import {ScrollView, StyleSheet, View, Text, I18nManager} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import BoardProfile from "../Board/BoardProfile";
import ProfileCard from "./ProfileCard";
import ProfileCardData from "./ProfileCardData";
import ProfileMap from "./ProfileMap";
import {useSelector} from "react-redux";
import jalaali from "jalaali-js";

function ProfileScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const profileData = useSelector((state) => state.profile.profileData.data);
    const isRTL = I18nManager.isRTL;
    const dateInput = profileData.birthday;
    console.log(profileData)


    // Convert to Gregorian format
    const gregorianFormatted = new Date(dateInput).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    }).replace(',', '').replace(/ /g, '/');

    const jalaliDate = jalaali.toJalaali(new Date(dateInput));


    const jalaliMonthNames = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد',
        'شهریور', 'مهر', 'آبان', 'آذر',
        'دی', 'بهمن', 'اسفند'
    ];
    const jalaliFormatted = `${jalaliDate.jy}/${jalaliMonthNames[jalaliDate.jm - 1]}/${String(jalaliDate.jd).padStart(2, '0')}`;

    const startTimeStamp =isRTL?"ق.ظ":"AM"
    const endTimeStamp =isRTL?"ب.ظ":"PM"
        function convertTo12HourFormat(time) {
            const [hours, minutes, seconds] = time.split(':');
            const hourIn24HourFormat = parseInt(hours, 10);
            const amPm = hourIn24HourFormat < 12 ? startTimeStamp : endTimeStamp
            ;
            const adjustedHour = hourIn24HourFormat % 24;


            const formattedHour = String(adjustedHour).padStart(2, '0');
            return `${formattedHour}:${minutes} ${amPm}`;
        }


    return (
        <ScrollView style={styles.mainView}>
            <BoardProfile editable={true}/>
            <ProfileCard headerText={t("info")}>
                <ProfileCardData title={t("business_name")} data={profileData.businessName || "_"}/>
                <ProfileCardData title={t("specialization")} data={profileData.specialization || "_"}/>
                <ProfileCardData title={t("birthday")} data={isRTL ? jalaliFormatted : gregorianFormatted || "_"}/>
            </ProfileCard>

            <ProfileCard headerText={t("bio")}>
                <Text style={styles.bioText}>
                    {profileData.bio || "_"}
                </Text>
            </ProfileCard>
            <ProfileCard headerText={t("working_location")}>
                <ProfileMap/>
            </ProfileCard>

            <ProfileCard headerText={t("hours")}>
                <ProfileCardData title={"Sat - Wed"}
                                 data={profileData.workingHours ? `${convertTo12HourFormat(profileData.workingHours.Saturday.startHour)} - ${convertTo12HourFormat(profileData.workingHours.Saturday.endHour)}` : "_"}/>
                <ProfileCardData title={"thursday"}
                                 data={profileData.workingHours ? `${convertTo12HourFormat(profileData.workingHours.Thursday.startHour)} - ${convertTo12HourFormat(profileData.workingHours.Thursday.endHour)}` : "_"}/>
                <ProfileCardData title={"Fri"} data={t("holiday")}/>
            </ProfileCard>

            <ProfileCard headerText={t("social_media")}>
                <ProfileCardData title={"telegram"} data={profileData.socialMedias?.Telegram || "_"}/>
                <ProfileCardData title={"instagram"} data={profileData.socialMedias?.Instagram || "_"}/>
                <ProfileCardData title={"whatsapp_num"} data={profileData.socialMedias?.Whatsapp || "_"}/>
            </ProfileCard>

        </ScrollView>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        profileWrapper: {
            flexDirection: "row",
            width: "100%",
            // backgroundColor: "red",
            justifyContent: "space-between",
            alignItems: "center"
        },
        bioText: {
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "dana-regular",
            fontWeight: "400"
        }
    });
};

export default ProfileScreen