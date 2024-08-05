import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, Pressable, Linking, Platform, PermissionsAndroid} from 'react-native';
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import * as Location from "expo-location";
import * as Network from 'expo-network';
import CustomToast from "../../components/CustomToast";
import {useTranslation} from "react-i18next";

// import {NetworkInfo} from 'react-native-network-info';
// import * as IntentLauncher from 'expo-intent-launcher';
// import {NetInfo} from 'react-native-network-info';
// import WifiManager from 'react-native-wifi-reborn';
// import {log} from "expo/build/devtools/logger";

function TimeClockCard({setEnteredOffice, onPress}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const [enteringOffice, setEnteringOffice] = useState(false);

    const [isLocationOn, setIsLocationOn] = useState(null);
    const [isWifiOn, setIsWifiOn] = useState(null);

    const [isLocationConfirmed, setIsLocationConfirmed] = useState(null);
    const [isWifiConfirmed, setIsWifiConfirmed] = useState(null);

    const [officeData, setOfficeData] = useState([]);

    const RADIUS = 50;
    const TARGET_SSID = 'YourWiFiNetworkName';

    useEffect(() => {
        async function fetchData() {
            await setOfficeData([
                {
                    officeName: "kasbino",
                    coordinate: {
                        latitude: 35.72918128209974,
                        longitude: 51.360396951983006,
                    },
                },
            ]);
        }

        fetchData();
        checkWifiStatus();
    }, []);

    useEffect(() => {
        if (officeData.length > 0) {
            turnOnLoc();
        }
    }, [officeData]);

    useEffect(() => {
        checkIfBothStatesTrue(); // Check whenever state1 or state2 changes
    }, [isLocationConfirmed, isWifiConfirmed]);

    function enterOffice() {
        setEnteringOffice(true);
    }

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
                confirmLocation(location.coords);
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setIsLocationOn(false);
        }
    }

    function confirmLocation(coords) {
        console.log(coords);

        const userCoord = {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };

        const officeCoord = officeData[0].coordinate;

        const distance = calculateDistance(userCoord, officeCoord);


        setTimeout(function () {
            setIsLocationConfirmed(true);
        }, 2000);  //test for now!

        // if (distance <= RADIUS) {
        //     console.log('You are in the circle!');
        //     setIsLocationConfirmed(true);
        // } else {
        //     console.log("sorry!")
        //     setIsLocationConfirmed(false);
        // }
    }

    function calculateDistance(coord1, coord2) {
        const earthRadius = 6371000; // Earth's radius in meters
        const lat1 = toRadians(coord1.latitude);
        const lat2 = toRadians(coord2.latitude);
        const deltaLat = toRadians(coord2.latitude - coord1.latitude);
        const deltaLon = toRadians(coord2.longitude - coord1.longitude);

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(
            Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
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


    const checkIfBothStatesTrue = () => {
        if (enteringOffice && isLocationConfirmed && isWifiConfirmed) {
            CustomToast.show(t("confirm_clock_in"), "confirm");
            setTimeout(function () {
                setEnteredOffice(true)
            }, 1000);  //test for now!

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

            {enteringOffice ?
                <View style={styles.header}>
                    <Text style={styles.headerText}>Confirm your entry</Text>
                </View>
                :
                <View style={styles.header}>
                    <View style={styles.headerTextWrapper}>
                        <KhiyabunIcons name="clock-outline" size={16} color={colors.onSurface}/>
                        <Text style={styles.headerText}>Total work hours today</Text>
                    </View>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.seeMoreText}>5:25</Text>
                    </View>
                </View>
            }

            {enteringOffice ?
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
                                <Text style={styles.subjectText}>Confirm location</Text>
                                <Text
                                    style={[styles.statusText, isLocationConfirmed === true ? {color: colors.darkConfirm}
                                        : isLocationConfirmed === false ? {color: colors.error}
                                            : {color: colors.onSurfaceLow}]}>
                                    {isLocationConfirmed === true ? 'Your location was verified'
                                        : isLocationConfirmed === false ? 'Your location was not verified'
                                            : 'searching'}
                                </Text>
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

                    {isWifiOn ?
                        <View style={styles.statusWrapper}>
                            <KhiyabunIcons name={isWifiConfirmed === true ? "tick-circle-bold"
                                : isWifiConfirmed === false ? "close-circle-bold"
                                    : "loading-outline"} size={24}
                                           color={isWifiConfirmed === true ? colors.darkConfirm
                                               : isWifiConfirmed === false ? colors.error
                                                   : colors.onSurface}/>
                            <View style={styles.textWrapper}>
                                <Text style={styles.subjectText}>Confirm wifi</Text>
                                <Text
                                    style={[styles.statusText, isWifiConfirmed === true ? {color: colors.darkConfirm}
                                        : isWifiConfirmed === false ? {color: colors.error}
                                            : {color: colors.onSurfaceLow}]}>
                                    {isWifiConfirmed === true ? 'Your wifi was verified'
                                        : isWifiConfirmed === false ? 'Your wifi was not verified'
                                            : 'searching'}
                                </Text>
                            </View>
                        </View>
                        :
                        <Button
                            // onPress={openWifiSetting}
                            label="Turn on wifi"
                            sizeButton="medium"
                            typeButton="full"
                            styleText={styles.buttonTextStyle}
                        />}
                </>
                :
                <>
                    <Pressable onPress={enterOffice} style={styles.buttonWrapper}>
                        <View style={styles.leftWrapper}>
                            <KhiyabunIcons name="buildings-bold" size={24} color={colors.darkPrimary}/>
                            <Text style={[styles.subjectText, {marginLeft: 6}]}>Entering the office</Text>
                        </View>
                        <KhiyabunIcons name="direction-right-bold" size={24} color={colors.onSurface}/>
                    </Pressable>

                    <Pressable style={styles.buttonWrapper} onPress={onPress}>
                        <View style={styles.leftWrapper}>
                            <KhiyabunIcons name="car-bold" size={24} color={colors.darkPrimary}/>
                            <Text style={[styles.subjectText, {marginLeft: 6}]}>Errand</Text>
                        </View>
                        <KhiyabunIcons name="direction-right-bold" size={24} color={colors.onSurface}/>
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
        headerText: {
            fontFamily: "dana-regular",
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            marginBottom: 5
        },

        seeMoreText: {
            color: colors.darkPrimary,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 20,
            marginBottom: 3.5
        },
        buttonTextStyle: {
            fontSize: 14,
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
            alignItems: "flex-start",
            marginLeft: 10,
        },
        subjectText: {
            fontFamily: "dana-regular",
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.02,
            textAlign: "left",
            color: colors.onSurfaceHigh,
        },

        statusWrapper: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 6,
        },
        statusText: {
            fontFamily: "dana-regular",
            fontWeight: "400",
            fontSize: 12,
            lineHeight: 16,
            textAlign: "left",
        }
    });
};

export default TimeClockCard;
