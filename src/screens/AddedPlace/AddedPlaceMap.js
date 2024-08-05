import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import profileImg from "../../../assets/img/3d_avatar_21.png"
import Card from "../../components/Card";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";

export default function AddedPlaceMap() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    const home = {
        latitude: 35.72509040928746,
        longitude: 51.42920327151441,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }
    const CustomMarker = ({coordinate}) => (
        <Marker coordinate={coordinate}>
            <Image
                source={require('../../../assets/img/3d_avatar_21.png')} // Replace this with the path to your image
                style={styles.markerImage}
            />
        </Marker>
    );

    return (
        <Card customStyle={styles.card}>
            <View style={styles.cardWrapper}>
                <View style={styles.cardHeaderWrapper}>
                    <Text style={styles.cardHeader}>
                        {t("info")}
                    </Text>
                </View>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={home}
                        showsUserLocation
                        followsUserLocation
                        minZoomLevel={10}
                    >
                        <CustomMarker coordinate={{latitude: home.latitude, longitude: home.longitude}}/>
                    </MapView>
                </View>
            </View>
        </Card>
    );
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            width: "90%"
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        markerImage: {
            width: 40,
            height: 40,
            borderRadius: 25
        },
        cardWrapper: {
            paddingHorizontal: 4
        },
        cardHeaderWrapper: {
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        cardHeader: {
            fontFamily: "dana-bold",
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24,
        },
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


