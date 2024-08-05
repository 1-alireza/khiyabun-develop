import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import gStyles from "../../global-styles/GlobalStyles";
import {getRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";


function Flags() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const lang = useSelector(state => state.language.language);

    const [latestFlags, setLatestFlags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getLatestPodcast();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getLatestPodcast = async () => {
        const body = {
            page: 0,
            size: 1,
            sortBy: "createDate",
            sortOrder: "desc",
            fromTime: "2024-04-02T00:00:00",
            toTime: "2024-04-02T23:59:59",
        };
        const res = await getRequest("map_flag", body);
        if (res.statusCode === 200) {
            setLatestFlags(res.data);
        }
    };
    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"flag-bold"} HeaderText={t("flags")}>
                <View style={styles.RequestBox}>
                    {isLoading ? <CustomSkeleton width={150} height={20}/> : <>
                        {latestFlags.length > 0 ?
                            <Text style={styles.requestText}>{`${latestFlags} ${t("confirmed_flags")}`}</Text>
                            :
                            <Text style={styles.text}>{t("no_flags_available")}</Text>
                        }
                    </>}
                    <KhiyabunIcons name="tick-circle-bold" size={20} color={colors.confirm}/>
                </View>
            </HomeCard>
        </View>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    const lang = useSelector(state => state.language.language);
    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        RequestBox: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: colors.outlineSurface,
            borderRadius: 6,
            padding: 10,
            marginTop: 10,
        },
        requestText: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20,
        },
        text: {
            fontFamily: lang === 'fa' ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20,
            textAlign: I18nManager.isRTL ? "left" : "right",
        },
    });
};

export default Flags;