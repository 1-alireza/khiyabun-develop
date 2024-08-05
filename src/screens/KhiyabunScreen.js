import React from "react";
import Card from "../components/Card";
import BoardCard from "./Board/BoardCard";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, ScrollView, View, Text} from "react-native";
import {useTranslation} from "react-i18next";
import ExternalLink from "../components/ExternalLink";

function KhiyabunScreen() {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t, i18n} = useTranslation();

    return (
        <ScrollView style={styles.mainView}>
            <Card>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>
                        {t("about")}
                    </Text>
                </View>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("about_us")} place={"first"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("meet_the_team")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} onPress={() => {
                        alert(456)
                    }}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("terms_of_service")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("privacy_policy")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("what's_news")} place={"last"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
            </Card>
            <Card>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>
                        {t("enjoy_using_khiyabun")}
                    </Text>
                </View>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("share_khiyabun_app")} place={"first"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("rate_the_khiyabun_app")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("follow_us_on_instagram")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("join_our_telegram_channel")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("follow_us_on_X_/_twitter")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("subscribe_to_our_youtube_channel")} place={"middle"}
                               textStyle={styles.appActionText} icon={"direction-right-bold"}
                               iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("follow_us_on_facebook")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
                <ExternalLink url={"https://www.varzesh3.com/"}>
                    <BoardCard title={t("the_10_minutes_university")} place={"last"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle} pressable={false}/>
                </ExternalLink>
            </Card>
        </ScrollView>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 8,
        },
        appOption: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: 56,

        },
        appOptionFirst: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: 56,
        },
        appOptionLast: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            height: 56,
        },
        logoutText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.error
        },
        appActionText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        cardHeader: {
            paddingHorizontal: 8,
            paddingVertical: 4
        },
        cardHeaderText: {
            fontSize: 16,
            fontFamily: "dana-bold",
            lineHeight: 24,
            color: colors.onSurface
        },
        directionIconStyle: {
            color: colors.onSurface
        }
    });
};


export default KhiyabunScreen