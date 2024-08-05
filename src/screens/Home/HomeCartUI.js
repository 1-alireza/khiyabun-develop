import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";
import gStyles from "../../global-styles/GlobalStyles";

const HomeCard = ({HeaderIcon, HeaderText, seeMore = true, children}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerTextWrapper}>
                    <KhiyabunIcons style={{marginBottom: 5}} name={HeaderIcon} size={18} color={colors.primary}/>
                    <Text allowFontScaling={false} style={styles.headerText}>{HeaderText}</Text>
                </View>
                {seeMore &&
                    <TouchableOpacity activeOpacity={0.6} style={styles.headerTextWrapper}>
                        <Text style={styles.seeMoreText}>{t("more")}</Text>
                        <KhiyabunIcons name={(I18nManager.isRTL) ? "arrow-left-outline" : "arrow-right-outline"}
                                       size={18} color={colors.primary}/>
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}
const useThemedStyles = (colors) => {

    return StyleSheet.create({
        card: {
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 6,
            width: "100%",
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
        },
        headerText: {
            ...gStyles.fontBold,
            color: colors.onSurface,
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 2
        },
        seeMoreText: {
            ...gStyles.fontBold,
            color: colors.darkPrimary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 3.5
        },
    });
};

export default HomeCard;