import Card from "../../components/Card";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";


export default function ErrandDistance() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <Card customStyle={styles.card}>
            <View style={styles.errandDataTitleWrapper}>
                <Text style={styles.errandDataTitle}>
                    {t("distance")}
                </Text>
                <Text style={styles.errandDataText}>
                    3.50 km
                </Text>
            </View>
            <View style={styles.errandDataTitleWrapper}>
                <Text style={styles.errandDataTitle}>
                    {t("avg_pace")}
                </Text>
                <Text style={styles.errandDataText}>
                    6,7 km/h
                </Text>
            </View>
        </Card>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        card:{
            marginTop:10
        },
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
