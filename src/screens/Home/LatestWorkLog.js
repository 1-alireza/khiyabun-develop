import React, {useEffect, useState} from "react";
import {View, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {getRequest} from "../../utils/sendRequest";
import CustomText from "../../components/CustomText";
import CustomSkeleton from "../../components/CustomSkeleton";
import {formatServerTime, timeDifference} from "../../utils/helper";
import {setWorkLogData} from "../../redux/slices/workLogSlice";

function LatestWorkLog() {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const workLogData = useSelector(state => state.workLog.workLogData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getWorkLogData();
        };
        fetchData();
    }, []);

    const getWorkLogData = async () => {
        setIsLoading(true);

        const body = {
            page: 0,
            size: 1,
            sortOrder: "desc",
            fromTime: "2024-04-30T00:00:00",
            toTime: "2024-04-30T23:59:59",
        };

        try {
            let res = await getRequest("work_log/latest", body, userToken);
            console.log("workLog res", res);

            if (res.statusCode === 200) {
                dispatch(setWorkLogData(res.data));
            }
        } catch (error) {
            console.error("Error fetching work log data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"clock-bold"} HeaderText={t("time_clock")} onMore={"time_clock"}>
                <View style={styles.title}>
                    {isLoading ? <CustomSkeleton width={60} height={20} cStyle={{marginBottom: 2}}/> :
                        <CustomText size={14} weight={'bold'} color={colors.darkPrimary}
                                    lineHeight={24} customStyle={{marginBottom: 2}}>
                            {workLogData?.officeName ? workLogData.officeName : t('office')}
                        </CustomText>}
                    <View style={styles.titleLine}/>
                </View>
                <View style={styles.textBoxWrapper}>
                    <View style={styles.textBox}>
                        <CustomText size={13} color={colors.onSurfaceLowest}
                                    lineHeight={20} customStyle={{marginBottom: 2}}>
                            {t("time_clock_started_at")}
                        </CustomText>
                        {isLoading ? <CustomSkeleton width={60} height={20} cStyle={{marginBottom: 2}}/> :
                            <CustomText size={15} weight={'bold'} color={colors.onSurface}
                                        lineHeight={24} customStyle={{marginBottom: 2}}>
                                {workLogData?.startTime ? formatServerTime(workLogData.startTime) : '-- : --'}
                            </CustomText>}
                    </View>
                    <View style={styles.textBox}>
                        <CustomText size={13} color={colors.onSurfaceLowest}
                                    lineHeight={20} customStyle={{marginBottom: 2}}>
                            {t("time_clock_finished_at")}
                        </CustomText>
                        {isLoading ? <CustomSkeleton width={60} height={20} cStyle={{marginBottom: 2}}/> :
                            <CustomText size={15} weight={'bold'} color={colors.onSurface}
                                        lineHeight={24} customStyle={{marginBottom: 2}}>
                                {workLogData?.endTime ? formatServerTime(workLogData.endTime) : '-- : --'}
                            </CustomText>}
                    </View>
                    <View style={styles.textBox}>
                        <CustomText size={13} color={colors.onSurfaceLowest}
                                    lineHeight={20} customStyle={{marginBottom: 2}}>
                            {t("time_clock_time")}
                        </CustomText>
                        {isLoading ? <CustomSkeleton width={60} height={20} cStyle={{marginBottom: 2}}/> :
                            <CustomText size={15} weight={'bold'} color={colors.onSurface}
                                        lineHeight={24} customStyle={{marginBottom: 2}}>
                                {workLogData?.startTime && workLogData?.endTime ? timeDifference(workLogData.endTime, workLogData.startTime) : '-- : --'}
                            </CustomText>}
                    </View>
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
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 5
        },
        titleLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.primaryOutline,
            marginLeft: 10,
        },
        textBoxWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textBox: {
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            marginVertical: 5
        }
    });
};

export default LatestWorkLog;