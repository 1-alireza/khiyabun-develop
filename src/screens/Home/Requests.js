import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";
import {useTranslation} from "react-i18next";
import Chips from "../../components/Chips";
import gStyles from "../../global-styles/GlobalStyles";
import {useSelector} from "react-redux";
import CustomSkeleton from "../../components/CustomSkeleton";
import {getRequest} from "../../utils/sendRequest";


function Requests() {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const lang = useSelector(state => state.language.language);

    const [latestRequests, setLatestRequests] = useState([]);
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
            fromTime: "2024-04-30T00:00:00",
            toTime: "2024-04-30T23:59:59",
        };
        const res = await getRequest("work_request", body);
        if (res.statusCode === 200) {
            setLatestRequests(res.data);
        }
    };

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={t("requests")}>
                <View style={styles.RequestBox}>
                    {isLoading ? <CustomSkeleton width={150} height={20}/> : <>
                        {latestRequests.length > 0 ?
                            <Text style={styles.requestText}>{`${latestRequests} ${t("confirmed_flags")}`}</Text>
                            :
                            <Text style={styles.text}>{t("no_request_available")}</Text>
                        }
                    </>}
                    <Chips text={t("confirmed")} height={25} type="confirm" transparent={true}/>
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

export default Requests;