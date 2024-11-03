import React, {useEffect, useState} from "react";
import {View, StyleSheet, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import {useTranslation} from "react-i18next";
import Chips from "../../components/Chips";
import {useSelector} from "react-redux";
import CustomSkeleton from "../../components/CustomSkeleton";
import {getRequest} from "../../utils/sendRequest";
import CustomText from "../../components/CustomText";


function Requests() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const userToken = useSelector(state => state.login.token);

    const [latestRequests, setLatestRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getLatestPodcast();
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
        const res = await getRequest("work_request", body, userToken);
        if (res.statusCode === 200) {
            setLatestRequests(res.data);
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={t("requests")} onMore={"Request"}>
                <View style={styles.RequestBox}>
                    {isLoading ? <CustomSkeleton width={150} height={20}/> : <>
                        {latestRequests.length > 0 ?
                            <CustomText size={13} color={colors.onSurface} lineHeight={20}>
                                {`${latestRequests} ${t("confirmed_flags")}`}
                            </CustomText>
                            :
                            <CustomText size={13} color={colors.onSurface} lineHeight={20}
                                        customStyle={{textAlign: I18nManager.isRTL ? "left" : "right"}}>
                                {t("no_request_available")}
                            </CustomText>

                        }
                    </>}
                    {isLoading ? <CustomSkeleton width={75} height={20}/> : <>
                        {latestRequests.length > 0 ?
                            <Chips text={t("confirmed")} height={25} type="confirm" transparent={true}/>
                            :
                            <></>
                        }
                    </>}
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

export default Requests;
