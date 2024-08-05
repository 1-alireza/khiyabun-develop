import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import * as Location from 'expo-location';
import FinishErrandCard from "./FinishErrandCard";
import {SpeedDial} from '@rneui/themed';
import {useTheme} from "@react-navigation/native";
import ErrandData from "./ErrandData";
import CustomModal from "../../components/CustomModal";
import {useTranslation} from "react-i18next";
import { WebView } from 'react-native-webview';

const IRAN_COORDINATES = {
    latitude: 32.4279,
    longitude: 53.6880,
    latitudeDelta: 20,
    longitudeDelta: 20,
};

const TimeClockErrandMap = ({openNearByPeople, modalAction, openAddFlag,onNearbyPeoplePress}) => {
    const {t, i18n} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [open, setOpen] = React.useState(false);
    const [region, setRegion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [mapMode, setMapMode] = useState(true);
    const [locationCoords, setLocationCoords] = useState([]);
    const mapHtml = `  
<!DOCTYPE html>  
    <html>  
    <head>  
        <title>Simple Map</title>  
        <meta charset="utf-8" />  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />  
        <style>  
            #map { height: 100vh; }  
        </style>  
    </head>  
    <body>  
        <div id="map"></div>  
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>  
        <script>  
            var map = L.map('map').setView([37.78825, -122.4324], 13);  
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
                maxZoom: 19,  
                attribution: '© OpenStreetMap'  
            }).addTo(map);  
            L.marker([37.78825, -122.4324]).addTo(map);  
        </script>  
    </body>  
    </html>  
  `;
    const markerData = [
        {
            type: "image",
            coords: {
                latitude: 35.7221091485111,
                longitude: 51.42874743685938,
            }
        },
        {
            type: "flag",
            coords: {
                latitude: 35.722085404067506,
                longitude: 51.42698024650593,
            }
        }, {
            type: "image",
            coords: {
                latitude: 35.725157580259356,
                longitude: 51.42874743685938,
            }
        },
        {
            type: "flag",
            coords: {
                latitude: 35.725854374095555,
                longitude: 51.427438368541544,
            }
        }
    ]

    const actionCallback = () => {
        modalAction()
        setIsModalVisible(false)
    }

    useEffect(() => {
        (async () => {
            // Request permission for location
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Location permission not granted');
                return;
            }

            // Get the initial location
            let position = await Location.getCurrentPositionAsync({});
            const {latitude, longitude} = position.coords;
            setRegion({latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.001});

            // Start watching the user's location
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 1, // Update location every meter
                    timeInterval: 1000,  // Update location every second
                },
                (newLocation) => {
                    const {latitude, longitude} = newLocation.coords;
                    setLocationCoords((coords) => [...coords, {latitude, longitude}]);
                    setRegion({latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.001});
                }
            );
        })();
    }, []);

    const changeMode = () => {
        if (mapMode) setMapMode(false)
        if (!mapMode) setIsModalVisible(true)
    }
    const closeModal = () => {
        setIsModalVisible(false)
    }
    const home = {
        latitude: 35.72509040928746,
        longitude: 51.42920327151441,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }

    return (
        <>

            <View style={styles.container}>

                {mapMode ?
                    region ? (
                        <MapView
                            style={styles.map}
                            initialRegion={home}
                            region={home}
                            minZoomLevel={10}
                        >
                            <Marker coordinate={region} title={"You are here"}>
                                <KhiyabunIcons name={"circle-bold"} size={30} color={colors.darkError}/>

                            </Marker>
                            {markerData.map((data, index) => (
                                <Marker
                                    key={index}
                                    coordinate={data.coords}
                                    anchor={{x: 0.5, y: 0.5}} // Center the marker at the specified coordinate
                                    onPress={onNearbyPeoplePress}
                                >
                                    {data.type === "flag" ? (
                                        <KhiyabunIcons name={"flag-bold"} size={30} color={colors.darkError}/>

                                    ) : (
                                        <Image
                                            source={require('../../../assets/img/3d_avatar_21.png')} // Replace this with the path to your image
                                            style={styles.markerImage}
                                        />
                                    )
                                    }

                                </Marker>
                            ))}
                            <Polyline coordinates={locationCoords} strokeWidth={5} strokeColor={colors.primary}/>
                        </MapView>
                    ) : (

                        <MapView
                            style={styles.map}
                            initialRegion={IRAN_COORDINATES}
                            region={region}
                            minZoomLevel={10}
                        >
                        </MapView>
                    ) : (
                        <ErrandData/>

                    )
                }



                <FinishErrandCard changeMode={changeMode}/>
            </View>

            <SpeedDial
                isOpen={open}
                icon={{name: 'add', color: colors.primary}}
                openIcon={{name: 'close', color: colors.primary}}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
                buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}
            >
                <SpeedDial.Action
                    icon={{name: 'apps', color: colors.onSurface}}
                    onPress={() => console.log('Add Something')}
                    buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}

                />

                <SpeedDial.Action
                    icon={{name: 'layers', color: colors.onSurface}}
                    onPress={() => console.log('Delete Something')}
                    buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}

                />
                <SpeedDial.Action
                    icon={{name: 'pin-drop', color: colors.onSurface}}
                    onPress={openNearByPeople}
                    buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}

                />

                <SpeedDial.Action
                    icon={{name: 'flag', color: colors.onSurface}}
                    onPress={openAddFlag}
                    buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}

                />
                <SpeedDial.Action
                    icon={{name: 'local-cafe', color: colors.onSurface}}
                    onPress={() => console.log('Add Something')}
                    buttonStyle={{backgroundColor: colors.surfaceContainerLowest}}

                />
            </SpeedDial>
            <CustomModal type={"info"} isVisible={isModalVisible} titleIcon={"info-circle-bold"} width={90}
                         hasCloseIcon={true} hasDoubleBtn={true} cancelButtonText={t("cancel")}
                         actionButtonText={t("finish_work")}
                         modalTitle={t("work_finished")} actionCallback={actionCallback}
                         onClose={closeModal}/>
        </>

    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: 'center',
            gap: 10,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        content: {
            alignItems: "center",
            justifyContent: "center",
        },
        OfficeMarkerText: {
            fontFamily: 'dana-bold',
            fontSize: 14,
            fontWeight: "500",
            color: colors.onSurface,
            lineHeight: 20,
        },
        markerImage: {
            width: 40,
            height: 40,
            borderRadius: 25
        }
    });
};
export default TimeClockErrandMap;