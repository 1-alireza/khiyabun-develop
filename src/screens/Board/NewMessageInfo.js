import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import React from "react";
import {I18nManager} from 'react-native';
import gStyles from "../../global-styles/GlobalStyles";

function NewMessageInfo({onPress}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const isRTL = I18nManager.isRTL;

    return (

        <Pressable onPress={onPress}>
            <Card>
                <View style={styles.newMessage}>
                    <Text style={styles.newMessageText}>
                        {t("new_messages")}
                    </Text>
                    <TouchableOpacity style={styles.seeMoreTextWrapper} onPress={onPress}>
                        <Text style={styles.seeMoreText} allowFontScaling={false}>
                            {t("see_all")}
                        </Text>
                        {isRTL ? <KhiyabunIcons name={"arrow-left-outline"} size={18} style={styles.seeAllArrow}/> :
                            <KhiyabunIcons name={"arrow-right-outline"} size={18} style={styles.seeAllArrow}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.newMessageInfo}>
                    <View style={styles.contactProfile}>
                        <Text style={styles.contactShortName}>
                            M
                        </Text>
                    </View>
                    <View style={styles.contactProfileData}>
                        <Text style={styles.contactName}>
                            {isRTL?"پارسا":"Martinez"}
                        </Text>
                        <View style={styles.newMessageData}>
                            <Badge text="+9" width={18} height={14} fontSize={10}/>
                            <Text style={styles.lastMessage}>
                                Do you want book a demo?
                            </Text>
                        </View>

                    </View>
                    <View style={styles.lastSeen}>
                        <Text style={styles.lastSeenText}>

                            20:01
                        </Text>
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
        contactName: {
            fontSize: 16,
            fontFamily:gStyles.fontBold.fontFamily,
            color: colors.onSurface,
        },
        contactShortName: {
            fontFamily: gStyles.fontBold.fontFamily,
            fontSize: 18,
            color: colors.surfaceContainerLowest,
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
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 20,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurface,
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
