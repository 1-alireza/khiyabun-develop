import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {LinearProgress} from '@rneui/themed';
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import CustomModal from "../../components/CustomModal";
import Button from "../../components/Button";
import RestChips from "./RestChips";
import CheckList from "./CheckList";
import CustomText from "../../components/CustomText";
import {putRequest} from "../../utils/sendRequest";
import {formatServerTime} from "../../utils/helper";
import {
    setBreakTime,
    setProductiveTime,
    setWorkLogData,
    updateIsRestingInWorkLogData
} from "../../redux/slices/workLogSlice";
import {useDispatch, useSelector} from "react-redux";
import * as Location from "expo-location";

import {NetworkInfo} from 'react-native-network-info';
import * as Network from 'expo-network';

import CustomToast from "../../components/CustomToast";

const TimeClock = ({setSheetVisible, setEnteredOffice}) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const lang = useSelector(state => state.language.language);

    const userToken = useSelector(state => state.login.token);
    const {workLogData} = useSelector(state => state.workLog);
    const dispatch = useDispatch();

    const [workTime, setWorkTime] = useState("00:00:00");
    const [progress, setProgress] = useState(0);

    const [isFinishWorkModalVisible, setIsFinishWorkModalVisible] = useState(false);
    const [userCoordination, setUserCoordination] = useState(null);

    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const getPublicIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
                console.log("data", data.ip)
            } catch (error) {
                console.error('Failed to fetch public IP address:', error);
            }
        };

        getPublicIP();
    }, []);

    useEffect(() => {
        console.log("workLog Data ", workLogData);
        turnOnLoc()

        if (workLogData.endTime) return;

        if (workLogData.rests?.length || workLogData.endTime) {
            calculateTotalRestTime();
        }
    }, []);

    useEffect(() => {
        if (!workLogData || workLogData.endTime) return;
        if (workLogData.startTime) {
            const startTime = new Date(workLogData.startTime).getTime();

            const interval = setInterval(() => {
                const now = Date.now();
                const difference = Math.floor((now - startTime) / 1000);
                const hours = Math.floor(difference / 3600);
                const minutes = Math.floor((difference % 3600) / 60);
                const seconds = difference % 60;
                const tempTIME = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                setWorkTime(tempTIME);

                if (workLogData.isResting && workLogData.productiveTime === '00:00:00') {
                    dispatch(setProductiveTime(calcTime(tempTIME, workLogData.breakTime)));
                    return;
                }

                if (!workLogData.isResting) {
                    dispatch(setProductiveTime(calcTime(tempTIME, workLogData.breakTime)));
                }

                if (workLogData.isResting) {
                    dispatch(setBreakTime(calcTime(tempTIME, workLogData.productiveTime)))
                }
            }, 1000);

            return () => clearInterval(interval);
        }

    }, [dispatch, workLogData]);

    useEffect(() => {
        let isSubscribed = true;
        if (progress < 1 && progress !== 0) {
            setTimeout(() => {
                if (isSubscribed) {
                    setProgress(progress + 0.1);
                }
            }, 100);
        }
        return () => {
            isSubscribed = false;
        };
    }, [progress]);

    const calcTime = (workTime, breakTime) => {
        function timeToSeconds(time) {
            const parts = time.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }

        const totalSeconds1 = timeToSeconds(workTime);
        const totalSeconds2 = timeToSeconds(breakTime);

        let resultSeconds = totalSeconds1 - totalSeconds2;

        if (resultSeconds < 0) {
            console.error('Result is negative, cannot subtract.');
            return null;
        }

        const hours = Math.floor(resultSeconds / 3600);
        resultSeconds %= 3600;
        const minutes = Math.floor(resultSeconds / 60);
        const seconds = resultSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const calculateTotalRestTime = () => {
        let totalRestTimeInMilliseconds = 0;

        workLogData.rests.forEach(rest => {
            const startTime = new Date(rest.startTime);

            let endTime;
            if (rest.endTime) endTime = new Date(rest.endTime);
            else endTime = Date.now();

            if (endTime > startTime) {
                const duration = endTime - startTime;
                totalRestTimeInMilliseconds += duration;
            }
        });

        const totalSeconds = Math.floor(totalRestTimeInMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedDuration = [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        ].join(':');

        dispatch(setBreakTime(formattedDuration));
    };

    const openContactMeSheet = () => {
        setSheetVisible(true);
    };

    const toggleFinishWorkModal = () => {
        setIsFinishWorkModalVisible(!isFinishWorkModalVisible);
    }

    const endRest = async () => {
        try {
            let res = await putRequest(`work_log/end_rest`, {}, userToken)
            console.log("endingRest res", res)
            if (res.statusCode === 200) {
                dispatch(updateIsRestingInWorkLogData(false));
            }
        } catch (e) {
            console.error("error endingRest!", e);
        }
    }

    const clockOut = async () => {
        try {
            const body = {
                lat: userCoordination.latitude,
                lon: userCoordination.longitude,
                wifiId: "2A-5C-6F-7D",
                officeId: workLogData.officeId,
            }
            console.log("clock_out body", body)
            let res = await putRequest("work_log/clock_out", body, userToken);
            console.log("clock_out res", res);
            setIsFinishWorkModalVisible(!isFinishWorkModalVisible);
            if (res.statusCode === 200) {
                // CustomToast.show(t("confirm_clock_in"), "confirm");
                setEnteredOffice(false);
                dispatch(setWorkLogData(res.data));
                dispatch(setProductiveTime('00:00:00'));
                dispatch(setBreakTime('00:00:00'));
            } else if (res.statusCode === 406) {
                CustomToast.show(res.message, "error");
            }
        } catch (e) {
            console.error("error clocking out!", e);
        }
    };

    async function checkWifiStatus() {
        try {
            let networkState = await Network.getNetworkStateAsync();
            if (networkState.isConnected && networkState.type === Network.NetworkStateType.WIFI) {
                console.log('Wi-Fi is turned on');
                confirmWiFiConnection();
            } else {
                console.log('Wi-Fi is not turned on or connected to a Wi-Fi network');
            }
        } catch (error) {
            console.error('Error checking Wi-Fi status:', error);
        }
    }

    async function turnOnLoc() {
        try {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            if (!location) {
                console.log('No location available');
                return;
            }
            if (location) {
                setUserCoordination(location.coords)
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.firstSection}>
                    <CustomText
                        size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}
                        textAlign={'left'}>
                        {formatServerTime(workLogData.startTime, lang === 'fa' ? 'fa' : 'en')}
                    </CustomText>
                    <CustomText
                        size={32} color={workLogData.isResting ? colors.darkSecondary : colors.darkPrimary}
                        weight={'bold'}
                        lineHeight={36}
                        textAlign={'center'}>
                        {workTime}
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}
                        textAlign={'left'}>
                        {workTime}
                    </CustomText>
                </View>

                <View style={{marginHorizontal: 8}}>
                    <LinearProgress
                        style={{
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: workLogData.isResting ? colors.secondary : colors.darkConfirm,
                            marginTop: 8,
                            // color: "blue"
                        }}
                        value={progress}
                        variant="determinate"
                        color={colors.secondary}
                    />
                </View>

                <View style={[styles.reportWrapper, {marginTop: 16}]}>
                    <View style={styles.leftWrapper}>
                        <View style={styles.reportWorkCircle}></View>
                        <CustomText
                            size={16} color={colors.onSurface} lineHeight={24}
                            textAlign={'left'}>
                            {t('productive_work')}
                        </CustomText>
                    </View>
                    <CustomText
                        size={15} weight={'bold'} color={colors.darkConfirm} lineHeight={24}
                        textAlign={'center'}>
                        {workLogData.productiveTime}
                    </CustomText>
                </View>

                <View style={styles.reportWrapper}>
                    <View style={styles.leftWrapper}>
                        <View style={styles.reportBreakCircle}></View>
                        <CustomText
                            size={16} color={colors.onSurface} lineHeight={24}
                            textAlign={'left'}>
                            {t('total_break')}
                        </CustomText>
                    </View>
                    <CustomText
                        size={15} weight={'bold'} color={colors.darkSecondary} lineHeight={24}
                        textAlign={'center'}>
                        {workLogData.breakTime}
                    </CustomText>
                </View>

                <View style={styles.buttonsWrapper}>

                    <Button label={t('finish_work')} sizeButton={"medium"}
                            style={styles.finishButton}
                            styleText={styles.finishButtonText}
                            onPress={toggleFinishWorkModal}
                            isBorder={true}
                    />

                    {workLogData.isResting ? <Button label={t('start_work')} sizeButton={"medium"}
                                                     style={styles.startButton}
                                                     styleText={styles.startButtonText}
                                                     onPress={endRest}
                                                     isBorder={true}
                        /> :
                        <Button label={t('take_break')} sizeButton={"medium"}
                                style={styles.breakButton}
                                styleText={styles.breakButtonText}
                                onPress={openContactMeSheet}
                                isBorder={true}
                        />
                    }

                </View>

                <CustomModal isVisible={isFinishWorkModalVisible} width={90} modalStyle={styles.modalStyle}
                             onClose={toggleFinishWorkModal} modalTitle={t("is_sure_work_finished")}
                             actionCallback={clockOut}
                             cancelCallback={toggleFinishWorkModal}
                             actionButtonText={t("work_finished")}
                             cancelButtonText={t("cancel")}
                             titleIcon={"info-circle-bold"} type={"info"}/>
            </View>
            {workLogData.isResting ? <RestChips/> : <CheckList/>}
        </>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginTop: 8,
            marginHorizontal: 6,
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 6,
        },
        firstSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 8,
            marginBottom: -12,
            paddingTop: 8
        },
        reportWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 3,
            marginHorizontal: 8,
        },
        leftWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        reportWorkCircle: {
            width: 12,
            height: 12,
            marginRight: 6,
            backgroundColor: colors.darkConfirm,
            borderRadius: 20
        },
        reportBreakCircle: {
            width: 12,
            height: 12,
            marginRight: 6,
            backgroundColor: colors.secondary,
            borderRadius: 20
        },
        buttonsWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 6,
        },
        finishButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        startButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.confirmContainer,
            borderColor: colors.confirmOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        breakButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.secondaryContainer,
            borderColor: colors.secondaryOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",

        },
        finishButtonText: {
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkError,
        },
        startButtonText: {
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkConfirm,
        },
        breakButtonText: {
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkSecondary
        },
    });
};

export default TimeClock;