import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import React from "react";
import {I18nManager} from 'react-native';
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";

function NewMessageInfo({onPress}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const isRTL = I18nManager.isRTL;

    return (

        <Pressable onPress={onPress}>
            <Card>
                <View style={styles.newMessage}>
                    <CustomText size={16} lineHeight={24} color={colors.primary} weight={"bold"}>
                        {t("new_messages")}
                    </CustomText>
                    <TouchableOpacity style={styles.seeMoreTextWrapper} onPress={onPress}>
                        <CustomText size={14} lineHeight={20} color={colors.darkPrimary} >
                            {t("see_all")}
                        </CustomText>
                        {isRTL ? <KhiyabunIcons name={"arrow-left-outline"} size={18} style={styles.seeAllArrow}/> :
                            <KhiyabunIcons name={"arrow-right-outline"} size={18} style={styles.seeAllArrow}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.newMessageInfo}>
                    <View style={styles.contactProfile}>
                        <CustomText size={18} customStyle={styles.contactShortName} color={colors.surfaceContainerLowest} weight={"bold"}>M</CustomText>
                    </View>
                    <View style={styles.contactProfileData}>
                        <CustomText size={16} color={colors.onSurface} weight={"bold"}>
                            {isRTL?"پارسا":"Martinez"}
                        </CustomText>
                        <View style={styles.newMessageData}>
                            <Badge text="+9" width={18} height={14} fontSize={10}/>
                            <CustomText size={14} customStyle={styles.lastMessage} lineHeight={20} color={colors.onSurface} >
                                Do you want book a demo?
                            </CustomText>
                        </View>

                    </View>
                    <View style={styles.lastSeen}>
                        <CustomText size={10} lineHeight={16} weight={"bold"} color={colors.onSurfaceLow}>
                            20:01
                        </CustomText>
                    </View>
                </View>
            </Card>
        </Pressable>


    )

}

const useThemedStyles = (colors) => {

    return StyleSheet.create({
        newMessageWrapper: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
            padding: 8,
            backgroundColor: colors.textOn,
            borderRadius: 8,
        },
        newMessage: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
        },
        newMessageInfo: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            gap: 10,
        },
        newMessageText: {
            fontFamily: gStyles.fontBold.fontFamily,
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24
        },
        seeMoreTextWrapper: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: 8
        },
        seeMoreText: {
            fontSize: 14,
            fontFamily: gStyles.fontMain.fontFamily,
            lineHeight: 20,
            color: colors.darkPrimary,
        },
        seeAllArrow: {
            color: colors.darkPrimary
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
            marginTop: 4
        },
        lastSeen: {
            justifyContent: "flex-start",
            flexDirection: "column",
            height: "100%"
        },
        lastSeenText: {
            fontSize: 10,
            lineHeight: 16,
            fontFamily: gStyles.fontBold.fontFamily,
            color: colors.onSurfaceLow
        },
        lastMessage: {
            marginTop: 2
        },
        contactProfileData: {
            // flexDirection: "column",
            flex: 1,
        },
        newMessageData: {
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            gap: 4,
            flexDirection: "row",
        },
    });
};


export default NewMessageInfo
