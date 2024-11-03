import React, {useEffect, useState} from "react";
import {View, StyleSheet, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";
import CustomText from "../../components/CustomText";


function Flags() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const userToken = useSelector(state => state.login.token);

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
        const res = await getRequest("map_flag", body, userToken);
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
                            <CustomText size={13} weight={'bold'} color={colors.onSurface}
                                        textAlign={I18nManager.isRTL ? "left" : "right"}
                                        lineHeight={20}>
                                {`${latestFlags} ${t("confirmed_flags")}`}
                            </CustomText>
                            :
                            <CustomText size={13} color={colors.onSurface}
                                        textAlign={I18nManager.isRTL ? "left" : "right"}
                                        lineHeight={20}>
                                {t("no_flags_available")}
                            </CustomText>
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
    });
};

export default Flags;
