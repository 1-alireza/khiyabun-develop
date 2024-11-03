import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import KhiyabunIcons from "./KhiyabunIcons";
import React from "react";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import gStyles from "../global-styles/GlobalStyles";
import CustomText from "./CustomText";

export default function EmptyData({
                                      fullPage = true,
                                      hasSearch = true,
                                      notFoundError,
                                      notFoundText = "no_data_recorded",
                                      searchNotfoundText = "no_data",
                                      customStyle
                                  }) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const {t, i18n} = useTranslation();
    return (
        <>
            {
                fullPage ?
                    (
                        hasSearch ? <Pressable style={styles.emptyData}>
                            <KhiyabunIcons name={"edit-outline"} size={60} color={colors.onSurfaceLow}/>
                            <CustomText color={colors.onSurfaceLow} size={18} lineHeight={26}>
                                {notFoundError ? t(searchNotfoundText) : t(notFoundText)}
                            </CustomText>

                        </Pressable> : <Pressable style={styles.emptyData}>
                            <KhiyabunIcons name={"edit-outline"} size={60} color={colors.onSurfaceLow}/>
                            <CustomText color={colors.onSurfaceLow} size={18} lineHeight={26}>
                                {t(notFoundText)}
                            </CustomText>
                        </Pressable>) :
                    (
                        <Pressable style={[styles.horizontalError, customStyle]}>
                            <KhiyabunIcons name={"edit-outline"} size={20} color={colors.onSurfaceLow}/>
                            <CustomText color={colors.onSurfaceLow} size={16} lineHeight={24}>
                                {t(notFoundText)}
                            </CustomText>

                        </Pressable>
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

        horizontalErrorText: {
            marginTop: 4,
        },
        horizontalError: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            marginVertical: 8
        }


    });
};



