import Card from "../../components/Card";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";


export default function ErrandTitlesData() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <Card>
            <View style={styles.errandDataTitleWrapper}>
                <Text style={styles.errandDataTitle}>
                    {t("errand_date")}
                </Text>
                <Text style={styles.errandDataText}>
                    Fri, sep 29
                </Text>
            </View>
            <View style={styles.errandDataTitleWrapper}>
                <Text style={styles.errandDataTitle}>
                    {t("errand_title_text")}
                </Text>
                <Text style={styles.errandDataText}>
                    visiting the neighbourhood
                </Text>
            </View>
            <View style={styles.errandDataTitleWrapper}>
                <Text style={styles.errandDataTitle}>
                    {t("errand_type")}
                </Text>
                <Text style={styles.errandDataText}>
                    Area assessment
                </Text>
            </View>
        </Card>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        errandDataTitleWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16
        },
        errandDataTitle: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        errandDataText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface
        }


    });
};
