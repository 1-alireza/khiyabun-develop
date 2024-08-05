import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import profileImg from "../../../assets/img/3d_avatar_21.png"
import {useSelector} from "react-redux";

export default function ProfileMap() {
    const [region, setRegion] = useState(null);
    const profileData = useSelector((state) => state.profile.profileData.data);

    useEffect(() => {
        setRegion({
            latitude: profileData.workingLocations ? profileData.workingLocations[0].lat : 35.730434229853266,
            longitude: profileData.workingLocations ? profileData.workingLocations[0].lon : 51.35863200959932,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })

    }, [profileData]);


// const getLocationAsync = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//         console.log('Location permission denied');
//         return;
//     }
//
//     let location = await Location.getCurrentPositionAsync({});
//     setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//     });
// };

    return (
        <View style={styles.container}>
            {region ? (
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation
                    followsUserLocation
                    customMapStyle={darkmapStyle}
                    minZoomLevel={10}
                >
                    <CustomMarker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>

                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}


const CustomMarker = ({coordinate}) => (
    <Marker coordinate={coordinate}>
        <Image
            source={require('../../../assets/img/3d_avatar_21.png')} // Replace this with the path to your image
            style={styles.markerImage}
        />
    </Marker>
);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 25
    }
});
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


