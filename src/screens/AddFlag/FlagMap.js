import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";

export default function FlagMap() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [region, setRegion] = useState(null);
    const coordinate = {
        latitude: 35.72918128209974,
        longitude: 51.360396951983006,
    }

    useEffect(() => {
        getLocationAsync();
    }, []);

    const getLocationAsync = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Location permission denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };


    const CustomMarker = ({coordinate}) => (
        <Marker coordinate={coordinate} onPress={()=>{
            alert(12)
        }}>
            <Image
                source={require('../../../assets/img/3d_avatar_21.png')} // Replace this with the path to your image
                style={styles.markerImage}
            />
        </Marker>
    );


    return (
        <View style={styles.container}>
            {region ? (
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation
                    followsUserLocation
                    minZoomLevel={10}
                >
                    <CustomMarker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
                    <Marker coordinate={{latitude: 35.759588374919, longitude: 51.36100157039561}}>
                        <Text style={styles.mapInfo}>
                            {t("find_desire_loc")}
                        </Text>
                    </Marker>

                </MapView>
            ) : (
                <MapView
                    style={styles.map}
                    region={coordinate}
                    showsUserLocation
                    followsUserLocation
                    minZoomLevel={10}
                >
                    <CustomMarker coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}/>
                    <Marker coordinate={{latitude: 35.72958837491968, longitude: 51.36100157039561}}>
                        <Text style={styles.mapInfo}>
                            {t("find_desire_loc")}
                        </Text>
                    </Marker>

                </MapView>
            )}
        </View>
    );
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
        },
        map: {
            ...StyleSheet.absoluteFillObject,
            borderRadius: 100
        },
        markerImage: {
            width: 40,
            height: 40,
            borderRadius: 25
        },
        mapInfo: {
            color: colors.darkPrimary,
            backgroundColor:colors.primaryContainer,
            fontSize:12,
            lineHeight:16,
            paddingVertical:8,
            paddingHorizontal:12,
            borderRadius:100
        }

    });
};

const darkmapStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#263c3f',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#6b9a76',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#38414e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#212a37',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9ca5b3',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#1f2835',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#f3d19c',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#2f3948',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#515c6d',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
];


