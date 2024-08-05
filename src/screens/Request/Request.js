import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import RequestDetailSheet from "./RequestDetailSheet";
import {useState} from "react";
import {useTranslation} from "react-i18next";

function Request({item, onPress}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <Pressable style={styles.request} onPress={()=>onPress(item)}>
            <View style={styles.requestData}>
                <Text style={styles.requestTitle}>
                    {t(item.type) + " > " + t(item.content)}
                </Text>
                <Text style={styles.requestTime}>
                    {item.date + " " + item.time}
                </Text>
            </View>
            <Text
                style={item.status === "pending" ? styles.pendingStatus : item.status === "approved" ? styles.ApprovedStatus : styles.DeclinedStatus}>
                {t(item.status)}
            </Text>
        </Pressable>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        request: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 8
        },
        pendingStatus: {
            color: colors.darkWarning,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.warningContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        DeclinedStatus: {
            color: colors.darkError,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.confirmContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        ApprovedStatus: {
            color: colors.darkWarning,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.errorContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },

        requestTitle: {
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24
        },
        requestTime: {
            color: colors.onSurfaceLow,
            fontSize: 12,
            lineHeight: 16,
            maxWidth: 200
        },
        requestData: {
            paddingHorizontal: 8,
            gap:4
        }
    });
};


export default Request