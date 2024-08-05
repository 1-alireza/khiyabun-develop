import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable, Image} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import trackImage from "../../../assets/img/attach.png";

function AddedPlaceCheckList() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <Card customStyle={{width: "90%",}}>
            <View style={styles.cardWrapper}>
                <View style={styles.headerContainer}>
                    <View style={styles.cardHeaderWrapper}>
                        <KhiyabunIcons name={"attach-outline"} size={16} color={colors.primary}
                                       style={{marginTop: -2}}/>
                        <Text style={styles.cardHeader}>
                            {t("attachment")}
                        </Text>
                    </View>
                    <Pressable style={styles.cardHeaderWrapper}>
                        <Text style={styles.cardHeader}>
                            {t("add")}
                        </Text>
                        <KhiyabunIcons name={"add-outline"} size={16} color={colors.primary}
                                       style={{marginTop: -2}}/>
                    </Pressable>
                </View>

                <View style={styles.flagNoteCard}>
                    <Image source={trackImage} style={styles.routeImg}/>
                    <View style={styles.attachmentInfo}>
                        <Text style={styles.flagContent}>Photo - 1699201949552741</Text>
                        <Text style={styles.flagTime}>Sat, Nov04 . 2.6 MB</Text>
                    </View>
                </View>

            </View>
        </Card>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4
        },
        cardHeaderWrapper: {
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4
        },
        cardHeader: {
            fontFamily: "dana-bold",
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24,
        },
        dataWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 6,
            marginVertical: 4
        },
        title: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular"

        },
        radio: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginVertical: 5,
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4
        },
        flagNoteCard: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 8,
            marginVertical: 5,
            gap: 8,
            borderRadius: 6
        },
        flagContent: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface,
        },
        flagTime: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurfaceLowest
        },
        routeImg: {
            width: "30%",
            borderRadius: 4
        },
        attachmentInfo: {
            justifyContent: "flex-start",
            height: "100%",
            gap: 4,
            paddingTop: 8
        }

    })
        ;
};
export default AddedPlaceCheckList