import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import Card from "../../components/Card";
import React from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";


export default function ErrandSummarized() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <Card customStyle={styles.card}>
            <View style={styles.firstSection}>
                <Text style={styles.Text}>09:11 am</Text>
                <Text style={styles.totalText}>09:11:53</Text>
                <Text style={styles.Text}>17:25 pm</Text>
            </View>
            <View style={styles.linearContainer}>
                <View style={styles.section1}></View>
                <View style={styles.section2}></View>
                <View style={styles.section3}></View>
                <View style={styles.section4}></View>
            </View>


            <View style={styles.linearData}>
                <View style={styles.linearDataTitle}>
                    <KhiyabunIcons name={"circle-bold"} size={12} color={colors.darkConfirm}/>
                    <Text>
                        {t("total_work")}
                    </Text>
                </View>
                <Text style={[styles.linearDataText, {color: colors.darkConfirm}]}>
                    09:11
                </Text>
            </View>
            <View style={styles.linearData}>
                <View style={styles.linearDataTitle}>
                    <KhiyabunIcons name={"circle-bold"} size={12} color={colors.secondary}/>
                    <Text>
                        {t("total_breaks" )}

                    </Text>
                </View>
                <Text style={[styles.linearDataText, {color: colors.darkSecondary}]}>
                    01:15
                </Text>
            </View>
            <Text style={styles.restWarning}>
                {t("limit_warning")}
            </Text>
            <View style={styles.linearData}>
                <View style={styles.linearDataTitle}>
                    <KhiyabunIcons name={"circle-bold"} size={12} color={colors.primary}/>
                    <Text>
                        {t("acceptable_hours")}
                    </Text>
                </View>
                <Text style={[styles.linearDataText, {color: colors.primary}]}>
                    07:51
                </Text>
            </View>
            <View style={styles.linearData}>
                <View style={styles.linearDataTitle}>
                    <KhiyabunIcons name={"circle-bold"} size={12} color={colors.error}/>
                    <Text>
                        {t("unacceptable_hours")}

                    </Text>
                </View>
                <Text style={[styles.linearDataText, {color: colors.error}]}>
                    00:30
                </Text>
            </View>
        </Card>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        card: {
            justifyContent: "center",
            alignItems: "center"
        },
        firstSection: {
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 8,
            marginBottom: -12
        },
        Text: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 20,
            textAlign: "left",
            color: colors.onSurface,
        },
        totalText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 32,
            lineHeight: 54,
            textAlign: "center",
            color: colors.darkPrimary
        },
        linearContainer: {
            width: "90%",
            height: 16,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "red",
            position: "relative",
            marginBottom: 12
        },
        section1: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: colors.darkConfirm,
            width: "40%",
            height: 16
        },
        section2: {
            position: "absolute",
            top: 0,
            left: 120,
            backgroundColor: colors.secondary,
            width: "10%",
            height: 16,
            borderRightColor: colors.surfaceContainerLowest,
            borderRightWidth: 2,
            borderLeftColor: colors.surfaceContainerLowest,
            borderLeftWidth: 2
        },
        section3: {
            position: "absolute",
            top: 0,
            left: 151,
            backgroundColor: colors.darkConfirm,
            width: "40%",
            height: 16
        },
        section4: {
            position: "absolute",
            top: 0,
            left: 275,
            backgroundColor: colors.secondary,
            width: "12%",
            height: 16,
            borderLeftColor: colors.surfaceContainerLowest,
            borderLeftWidth: 2
        },
        linearData: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            width: "90%",
            marginBottom: 8
        },
        linearDataTitle: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'flex-start',
            gap: 8
        },
        linearDataText: {
            fontSize: 16,
            lineHeight: 24
        },
        restWarning:{
            fontSize:12,
            lineHeight:16,
            color:colors.error,
            marginBottom:4
        }
    });
};
