import React, {useState, useEffect} from "react";
import {View, StyleSheet, Pressable, Linking, Platform, PermissionsAndroid, I18nManager} from 'react-native';
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import * as Location from "expo-location";
import * as Network from 'expo-network';
import CustomToast from "../../components/CustomToast";
import {useTranslation} from "react-i18next";
import CustomText from "../../components/CustomText";
import {postRequest} from "../../utils/sendRequest";
import {useDispatch, useSelector} from "react-redux";
import {setWorkLogData} from "../../redux/slices/workLogSlice";

// import {NetworkInfo} from 'react-native-network-info';
// import * as IntentLauncher from 'expo-intent-launcher';
// import {NetInfo} from 'react-native-network-info';
// import WifiManager from 'react-native-wifi-reborn';
// import {log} from "expo/build/devtools/logger";

function TimeClockCard({officeData, setEnteredOffice, setEnteredOfficeData, onPress}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const userToken = useSelector(state => state.login.token);

    const [startEntering, setStartEntering] = useState(false);
    const [enteredTo, setEnterTo] = useState(false);

    const [hasWifiVerification, setHasWifiVerification] = useState(false);

    const [isLocationOn, setIsLocationOn] = useState(null);
    const [isWifiOn, setIsWifiOn] = useState(null);

    const [isLocationConfirmed, setIsLocationConfirmed] = useState(null);
    const [isWifiConfirmed, setIsWifiConfirmed] = useState(null);

    const [userCoordination, setUserCoordination] = useState(null);
    const [officeID, setOfficeID] = useState(null);

    const [wifiData, setWifiData] = useState(null);

    const TARGET_SSID = 'YourWiFiNetworkName';
    const directionIcon = (I18nManager.isRTL) ? "direction-left-bold" : "direction-right-bold";

    const dispatch = useDispatch();

    function enterOffice() {
        setStartEntering(true);
    }

    const verifyLocation = async (officeId) => {
        try {
            const body = {
                lat: userCoordination.latitude,
                lon: userCoordination.longitude,
                officeId: officeId,
            }
            console.log("verifyLocation body", body);
            let res = await postRequest("work_log/check_location", body, userToken)
            console.log("verifyLocation res", res);

            if (res.statusCode === 200 && res.data.locationCheck === true) {
                setIsLocationConfirmed(true);
            } else {
                setIsLocationConfirmed(false);
            }
        } catch (e) {
            console.error("error verifyLocation", e);
        }
    };

    const verifyWifi = async (officeId) => {
        try {
            const body = {
                wifiId: "2A-5C-6F-7D",
                officeId: officeId,
            }
            console.log("verifyWifi body", body);
            let res = await postRequest("work_log/check_wifi", body, userToken)
            console.log("verifyWifi res", res);

            if (res.statusCode === 200 && res.data.wifiCheck === true) {
                setIsWifiConfirmed(true);
            } else {
                setIsWifiConfirmed(false);
            }
        } catch (e) {
            console.error("error verifyWifi!", e);
        }
    };

    function retryLocationVerification() {
        verifyLocation(officeID);
    }

    function retryWifiVerification() {
        verifyWifi(officeID);
    }

    function enterTo(data) {
        setEnterTo(true);
        setOfficeID(data.officeId);
        if (data.hasWifi) {
            setHasWifiVerification(true);
            verifyWifi(data.officeId);
        }
        verifyLocation(data.officeId);
    }

    function cancelEntering() {
        setStartEntering(false);
        setEnterTo(false);
        clockIn();
    }


    useEffect(() => {
        if (isLocationConfirmed && isWifiConfirmed) clockIn()

    }, [isLocationConfirmed, isWifiConfirmed]);

    useEffect(() => {
        checkWifiStatus();
        turnOnLoc()
    }, []);


    async function turnOnLoc() {
        try {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                setIsLocationOn(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            if (!location) {
                console.log('No location available');
                setIsLocationOn(false);
                return;
            }
            if (location) {
                setIsLocationOn(true);
                setUserCoordination(location.coords)
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setIsLocationOn(false);
        }
    }

    async function checkWifiStatus() {
        try {
            let networkState = await Network.getNetworkStateAsync();
            if (networkState.isConnected && networkState.type === Network.NetworkStateType.WIFI) {
                console.log('Wi-Fi is turned on');
                setIsWifiOn(true);
                confirmWiFiConnection();
            } else {
                console.log('Wi-Fi is not turned on or connected to a Wi-Fi network');
                setIsWifiOn(false);
            }
        } catch (error) {
            console.error('Error checking Wi-Fi status:', error);
        }
    }

    const confirmWiFiConnection = async () => {
        try {
            const networkState = await Network.getNetworkStateAsync();
            console.log('networkState:', networkState);
            setTimeout(function () {
                setIsWifiConfirmed(true);
                setWifiData("aliWifi")
            }, 6000);  //test for now!
            // if (networkState && networkState.isConnected && networkState.type === Network.NetworkStateType.WIFI) {
            //     const ssid = networkState.details ? networkState.details.ssid : null;
            //     console.log('Connected to Wi-Fi with SSID:', ssid);
            //
            //     setTimeout(function () {
            //         setIsWifiConfirmed(true);
            //     }, 6000);  //test for now!
            //
            //     // if (ssid === TARGET_SSID) {
            //     //     setIsWifiConfirmed(true);
            //     //     console.log('Connected to the target Wi-Fi network.');
            //     // } else {
            //     //     setIsWifiConfirmed(false);
            //     //     console.log('Not connected to the target Wi-Fi network.');
            //     // }
            // } else {
            //     setIsWifiConfirmed(false);
            //     console.log('Not connected to a Wi-Fi network.');
            // }
        } catch (error) {
            console.error('Error checking Wi-Fi connection:', error);
        }
    };


    const openWifiSetting = () => {
        Linking.openSettings().catch(err => console.error('An error occurred', err));
    };

    const clockIn = async () => {
        try {
            const body = {
                lat: userCoordination.latitude,
                lon: userCoordination.longitude,
                wifiId: "2A-5C-6F-7D",
                officeId: officeID,
            }
            console.log("clock_in body", body)
            let res = await postRequest("work_log/clock_in", body, userToken);
            console.log("clock_in res", res.data);

            if (res.statusCode === 201) {
                CustomToast.show(t("confirm_clock_in"), "confirm");
                setEnteredOffice(true);
                setEnteredOfficeData({officeID});
                dispatch(setWorkLogData(res.data));

            } else {
                CustomToast.show(t("reject_clock_in"), "error");
                setEnteredOffice(false);
            }
        } catch (e) {
            console.error("error clocking in!", e);
        }
    };

    // async function fetchPublicIpAddress() {
    //     try {
    //         const response = await fetch('https://api.ipify.org/?format=json');
    //         const data = await response.json();
    //         const publicIpAddress = data.ip;
    //         console.log('Public IP address:', publicIpAddress);
    //     } catch (error) {
    //         console.error('Error fetching public IP address:', error);
    //     }
    // }
    //
    // async function openWifiSetting() {
    //     try {
    //         console.log(WifiManager)
    //         let ad = await Network.getIpAddressAsync();
    //         let st = await Network.getNetworkStateAsync();
    //         let isOnAirplaneMode = await Network.isAirplaneModeEnabledAsync();
    //
    //         console.log(ad)
    //         console.log(st)
    //         console.log(isOnAirplaneMode)
    //
    //         const isEnabled = await WifiManager.isEnabled();
    //         if (!isEnabled) {
    //             await WifiManager.setEnabled(true);
    //             console.log('Wi-Fi turned on');
    //         } else {
    //             await WifiManager.setEnabled(false);
    //             console.log('Wi-Fi turned off');
    //         }
    //     } catch (error) {
    //         console.error('Error toggling Wi-Fi:', error);
    //     }
    // }

    return (
        <Card customStyle={styles.container}>

            {startEntering ?
                <View style={styles.header}>
                    <CustomText
                        size={15} color={colors.onSurface} lineHeight={24}
                        customStyle={{marginBottom: 5}}>
                        {t("confirm_entry")}
                    </CustomText>
                    <Pressable onPress={cancelEntering}>
                        <KhiyabunIcons name={'close-outline'} size={20} color={colors.onSurface}/>
                    </Pressable>
                </View>
                :
                <View style={styles.header}>
                    <View style={styles.headerTextWrapper}>
                        <KhiyabunIcons name="clock-outline" size={16} color={colors.onSurface}/>
                        <CustomText
                            size={15} color={colors.onSurface} lineHeight={24}
                            customStyle={{marginBottom: 5}}>
                            {t("total_work_hours")}
                        </CustomText>
                    </View>
                    <View style={styles.headerTextWrapper}>
                        <CustomText
                            size={13} weight={'bold'} color={colors.darkPrimary} lineHeight={20}
                            customStyle={{marginBottom: 3.5}}>
                            5:25
                        </CustomText>
                    </View>
                </View>
            }

            {startEntering ?
                enteredTo ?
                    <>
                        {isLocationOn ?
                            <View style={styles.statusWrapper}>
                                <KhiyabunIcons name={isLocationConfirmed === true ? "tick-circle-bold"
                                    : isLocationConfirmed === false ? "close-circle-bold"
                                        : "loading-outline"} size={24}
                                               color={isLocationConfirmed === true ? colors.darkConfirm
                                                   : isLocationConfirmed === false ? colors.error
                                                       : colors.onSurface}/>
                                <View style={styles.textWrapper}>
                                    <View>
                                        <CustomText
                                            size={15} color={colors.onSurfaceHigh} lineHeight={24}
                                            textAlign={'left'} letterSpacing={0.02}>
                                            {t("confirm_location")}
                                        </CustomText>
                                        <CustomText
                                            size={12} color={isLocationConfirmed === true ? colors.darkConfirm
                                            : isLocationConfirmed === false ? colors.error
                                                : colors.onSurfaceLow} lineHeight={16}
                                            textAlign={'left'}>
                                            {isLocationConfirmed === true ? t("loc_verified")
                                                : isLocationConfirmed === false ? t("loc_not_verified")
                                                    : 'searching'}
                                        </CustomText>
                                    </View>
                                    {!isLocationConfirmed &&
                                        <Pressable onPress={retryLocationVerification}>
                                            <KhiyabunIcons name={'revers-time-outline'} size={20}
                                                           color={colors.onSurface}/>
                                        </Pressable>
                                    }

                                </View>
                            </View>
                            :
                            <Button
                                style={{marginVertical: 8}}
                                onPress={turnOnLoc}
                                label="Turn on location"
                                sizeButton="medium"
                                typeButton="full"
                                styleText={styles.buttonTextStyle}
                            />}

                        {hasWifiVerification ?
                            isWifiOn ?
                                <View style={styles.statusWrapper}>
                                    <KhiyabunIcons name={isWifiConfirmed === true ? "tick-circle-bold"
                                        : isWifiConfirmed === false ? "close-circle-bold"
                                            : "loading-outline"} size={24}
                                                   color={isWifiConfirmed === true ? colors.darkConfirm
                                                       : isWifiConfirmed === false ? colors.error
                                                           : colors.onSurface}/>
                                    <View style={styles.textWrapper}>
                                        <View>
                                            <CustomText
                                                size={15} color={colors.onSurfaceHigh} lineHeight={24}
                                                textAlign={'left'}
                                                letterSpacing={0.02}
                                            >
                                                {t("confirm_wifi")}
                                            </CustomText>
                                            <CustomText
                                                size={12} color={isWifiConfirmed === true ? colors.darkConfirm
                                                : isWifiConfirmed === false ? colors.error
                                                    : colors.onSurfaceLow} lineHeight={16}
                                                textAlign={'left'}>
                                                {isWifiConfirmed === true ? t("wif_verified")
                                                    : isWifiConfirmed === false ? t("wifi_not_verified")
                                                        : 'searching'}
                                            </CustomText>
                                        </View>

                                        {!isWifiConfirmed &&
                                            <Pressable onPress={retryWifiVerification}>
                                                <KhiyabunIcons name={'revers-time-outline'} size={20}
                                                               color={colors.onSurface}/>
                                            </Pressable>
                                        }
                                    </View>
                                </View>
                                :
                                <Button
                                    onPress={openWifiSetting}
                                    label="Turn on wifi"
                                    sizeButton="medium"
                                    typeButton="full"
                                    styleText={styles.buttonTextStyle}
                                /> : <></>}
                    </>
                    :
                    officeData.map((data) => (
                        <View style={styles.enterToWrapper} key={data.officeId}>
                            <KhiyabunIcons name={"buildings-bold"} size={24} color={colors.primary}/>
                            <View style={styles.enteringWrapper}>
                                <View style={{width: "70%"}}>
                                    <CustomText
                                        size={15} color={colors.onSurfaceHigh} lineHeight={24}
                                        textAlign={'left'} letterSpacing={0.02}>
                                        {t("enter_to")}
                                    </CustomText>
                                    <CustomText
                                        size={13} color={colors.onSurfaceLow} lineHeight={16}
                                        textAlign={'left'}>
                                        {data.officeName}
                                    </CustomText>
                                </View>
                                <Button
                                    width={25}
                                    onPress={() => enterTo(data)}
                                    label={t("enter")}
                                    sizeButton="small"
                                    typeButton="full"
                                    style={{paddingHorizontal: 0}}
                                    styleText={styles.buttonTextStyle}
                                />
                            </View>
                        </View>
                    ))
                :
                <>
                    <Pressable onPress={enterOffice} style={styles.buttonWrapper}>
                        <View style={styles.leftWrapper}>
                            <KhiyabunIcons name="buildings-bold" size={24} color={colors.darkPrimary}/>
                            <CustomText
                                size={15} color={colors.onSurfaceHigh} lineHeight={24}
                                customStyle={{marginLeft: 6}}>
                                {t("entering_office")}
                            </CustomText>
                        </View>
                        <KhiyabunIcons name={directionIcon} size={24} color={colors.onSurface}/>
                    </Pressable>
                    <Pressable style={styles.buttonWrapper} onPress={onPress}>
                        <View style={styles.leftWrapper}>
                            <KhiyabunIcons name="car-bold" size={24} color={colors.darkPrimary}/>
                            <CustomText
                                size={15} color={colors.onSurfaceHigh} lineHeight={24}
                                customStyle={{marginLeft: 6}}>
                                {t("errand")}
                            </CustomText>
                        </View>
                        <KhiyabunIcons name={directionIcon} size={24} color={colors.onSurface}/>
                    </Pressable>
                </>
            }
        </Card>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 6,
            width: "95%",
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
        },
        buttonTextStyle: {
            fontSize: 14,
            lineHeight: 16,
        },
        buttonWrapper: {
            backgroundColor: colors.primaryContainer,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 6,
            marginVertical: 6,
        },
        leftWrapper: {
            backgroundColor: colors.primaryContainer,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        textWrapper: {
            flexDirection: 'row',
            alignItems: "center",
            marginHorizontal: 8,
            justifyContent: "space-between",
            width: '94%'
        },
        enteringWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        statusWrapper: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 13,
            paddingHorizontal: 15,
            borderRadius: 6,
        },
        enterToWrapper: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 13,
            paddingHorizontal: 15,
            borderRadius: 6,
        },
    });
};

export default TimeClockCard;
