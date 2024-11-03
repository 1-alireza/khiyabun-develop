import {ScrollView, StyleSheet, Text, I18nManager} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import BoardProfile from "../Board/BoardProfile";
import ProfileCard from "./ProfileCard";
import ProfileCardData from "./ProfileCardData";
import ProfileMap from "./ProfileMap";
import {useSelector} from "react-redux";
import jalaali from "jalaali-js";
import CustomText from "../../components/CustomText";
import ProfileWorkingHours from "./ProfileWorkingHours";

function ProfileScreen() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const profileData = useSelector((state) => state.profile.profileData);
    const isRTL = I18nManager.isRTL;

    console.log(profileData)
    const dateInput = profileData.birthday;


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



    return (
        <ScrollView style={styles.mainView}>
            <BoardProfile editable={true}/>
            <ProfileCard headerText={t("info")}>
                <ProfileCardData title={t("business_name")} data={profileData.businessName || "_"}/>
                <ProfileCardData title={t("specialization")} data={profileData.specialization || "_"}/>
                <ProfileCardData title={t("birthday")} data={isRTL ? jalaliFormatted : gregorianFormatted || "_"}/>
            </ProfileCard>

            <ProfileCard headerText={t("bio")}>
                <CustomText color={colors.onSurface} size={14} lineHeight={20}>
                    {profileData.bio || "_"}
                </CustomText>
            </ProfileCard>
            <ProfileCard headerText={t("working_location")}>
                {/*<ProfileMap/>*/}
            </ProfileCard>
            <ProfileWorkingHours workingHours={profileData.workingHours}/>


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
            justifyContent: "space-between",
            alignItems: "center"
        },
    });
};

export default ProfileScreen
