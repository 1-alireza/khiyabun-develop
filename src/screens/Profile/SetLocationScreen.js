import React, {useEffect, useRef, useState} from "react";
import {Platform, StyleSheet, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import * as Location from "expo-location";
import WebView from "react-native-webview";

import Button from "../../components/Button";
import Card from "../../components/Card";
import CustomText from "../../components/CustomText";
import {getFullAddress} from "../../utils/sendRequest";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import gStyles from "../../global-styles/GlobalStyles"
import i18n from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../../redux/actions/profileAction";
import {errorHandling} from "../../utils/errorHandling";

const SetLocationScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const is_loading = useSelector(state => state.profile.loading);

    const [loading, setLoading] = useState(is_loading)
    const [url, setUrl] = useState('https://khiyabun.ir/center/');
    const [error, setError] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({})
    const [address, setAddress] = useState({
        city: null,
        county: null,
        neighbourhood: null,
        route_name: null,
        address: null
    })
    const webViewRef = useRef(null);
    const location = {};

    const getLocationAsync = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Location permission denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        setUrl(`https://khiyabun.ir/center/${currentLocation.latitude}/${currentLocation.longitude}`);
    };
    useEffect(() => {
        getLocationAsync();
    }, []);

    const getCurrentLocation = async () => {
        await getLocationAsync();
    }
    const handleMessage = async (event) => {
        const data = JSON.parse(event.nativeEvent.data);
        let fullAddress = await getFullAddress(data.position[0], data.position[1]);
        console.log("fullAddress",fullAddress);
        let {city, county, neighbourhood, route_name} = fullAddress;
        setAddress({city, county, neighbourhood, route_name, address: fullAddress.formatted_address});
    };
    const goToSetWorkingHours = () => {
        setLoading(true);
        let data = {
            userData: {
                "workingLocations":[
                    {
                        "country":address.county,
                        "city":address.city,
                        "address":address.address,
                        "lon": currentLocation.latitude,
                        "lat":currentLocation.longitude
                    }
                ]
            },
            token: userToken
        };

        dispatch(updateUserProfile(data)).then(action => {
            console.log("is_loading",is_loading)
            let response = action.payload;
            if(response?.statusCode === 200){
                navigation.navigate("SetWorkingHours");
                if (Platform.OS !== 'android') window.history.pushState({}, 'SetWorkingHours');
            }
            else {
                errorHandling(response,"error");
            }
            setLoading(is_loading);
        });
    }

    const handleReload = () => {
        setError(false);
        setUrl(`https://khiyabun.ir/center/${currentLocation.latitude}/${currentLocation.longitude}`);
    };
    return (
        <>
            {error ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button title="Reload" onPress={handleReload}/>
                </View>
            ) : (
                <>
                    <WebView
                        ref={webViewRef}
                        originWhitelist={['*']}
                        cacheEnabled={false}
                        source={{uri: url}} // استفاده از URL محلی
                        style={{flex: 1}}
                        onError={(syntheticEvent) => {
                            setError(true)
                            const {nativeEvent} = syntheticEvent;
                            console.log('WebView error: ', nativeEvent);
                        }}
                        onMessage={handleMessage}
                        javaScriptEnabled={true}
                    />
                    <View style={[gStyles.container, styles.container]}>
                        <Button
                            label={<KhiyabunIcons name="pin-location-bold" size={22}
                                                  color={(location) ? colors.primary : colors.error}/>}
                            style={[styles.getLocationBtn, (Platform.OS === "ios") ? styles.shadow : styles.elevation]}
                            typeButton="circle"
                            colorButton="light"
                            onPress={getCurrentLocation}
                            borderColor="dark"
                        />
                        <Card style={styles.selectedLocation}>
                            <View style={[gStyles.row, styles.title]}>
                                <CustomText customStyle={[gStyles.col_1, styles.locationIcon]}>
                                    <KhiyabunIcons name="location-on-outline" size={20} color={colors.onSurfaceHigh}/>
                                </CustomText>
                                <CustomText size={16} color={colors.onSurfaceHigh}
                                            customStyle={gStyles.col_11}>{t("selected_location")}</CustomText>

                            </View>
                            <View style={[gStyles.row, styles.body]}>
                                <View style={[gStyles.col_12, styles.content]}>
                                    <CustomText
                                        size={16}
                                        color={colors.onSurfaceHigh}>{address.county ? address.county : "-"} , {address.city ? address.city : "-"}
                                    </CustomText>
                                    <CustomText
                                        size={12}
                                        color={colors.onSurfaceLow}>{address.neighbourhood ? address.neighbourhood : "-"} , {address.route_name ? address.route_name : "-"}
                                    </CustomText>
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        label={t("continue")}
                                        typeButton="full"
                                        sizeButton="medium"
                                        onPress={goToSetWorkingHours}
                                        disabled={!currentLocation.latitude}
                                        showLoading={loading}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                </>
            )
            }
        </>
    )
}
const useThemedStyles = (colors) => {
    const locale = i18n.language;
    return StyleSheet.create({
        container: {
            position: "absolute",
            flexDirection: "column",
            alignItems: locale === "en" ? "flex-end" : "flex-start",
            justifyContent: "flex-end",
            bottom: 0
        },
        getLocationBtn: {
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: colors.surfaceContainerLowest,

        },
        shadow: {
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowOpacity: 0.2,
            shadowRadius: 0,
        },
        elevation: {
            elevation: 1,
        },
        selectedLocation: {
            padding: 0,
            marginVertical: 20
        },
        title: {
            height: 48,
            paddingVertical: 8,
            paddingHorizontal: 12,
            flexWrap: "nowrap",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: colors.outlineSurface
        },
        locationIcon: {
            justifyContent: "flex-start",
            textAlign: "unset"
        },
        body: {
            paddingHorizontal: 16,
        },
        content: {
            flexWrap: "nowrap",
            justifyContent: "center",
            height: 56,
        },
        button: {
            width: "100%",
            justifyContent: "center",
            height: 80
        }
    });
};
export default SetLocationScreen;
