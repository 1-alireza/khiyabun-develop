import {Platform, StyleSheet, Text, View} from "react-native";
import KhiyabunIcons from "./KhiyabunIcons";
import React from "react";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import gStyles from "../global-styles/GlobalStyles";

export default function EmptyData({
                                   fullPage = true,
                                   hasSearch = true,
                                   notFoundError,
                                   notFoundText = "no_data_recorded",
                                   searchNotfoundText = "no_data"
                               }) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const {t, i18n} = useTranslation();
    return (
        <>
            {
                fullPage ?
                (
                hasSearch ? <View style={styles.emptyData}>
                    <KhiyabunIcons name={"edit-outline"} size={60} color={colors.onSurfaceLow}/>
                    <Text style={styles.emptyDataText}>
                        {notFoundError ? t(searchNotfoundText) : t(notFoundText)}
                    </Text>
                </View> : <View style={styles.emptyData}>
                    <KhiyabunIcons name={"edit-outline"} size={60} color={colors.onSurfaceLow}/>
                    <Text style={styles.emptyDataText}>
                        {t(notFoundText)}
                    </Text>
                </View>) :
                (
                    <View style={styles.horizontalError}>
                        <KhiyabunIcons name={"edit-outline"} size={20} color={colors.onSurfaceLow}/>
                        <Text style={styles.horizontalErrorText}>
                            {t(notFoundText)}
                        </Text>
                    </View>
                )
            }
        </>


    )
}
const useThemedStyles = (colors) => {

    return StyleSheet.create({
        emptyData: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 8
        },
        emptyDataText: {
            ...gStyles.fontMain,
            color: colors.onSurfaceLow,
            fontSize: 18,
            lineHeight: 26,
        },
        horizontalErrorText:{
            ...gStyles.fontMain,
            color: colors.onSurfaceLow,
            fontSize: 16,
            lineHeight: 24,
            marginTop:4,
        },
        horizontalError: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            marginVertical:8
        }


    });
};



