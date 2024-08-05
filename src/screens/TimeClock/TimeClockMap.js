import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import TimeClockCard from "./TimeClockCard";

const IRAN_COORDINATES = {
    latitude: 32.4279,
    longitude: 53.6880,
    latitudeDelta: 20,
    longitudeDelta: 20,
};

const TimeClockMap = ({setEnteredOffice,onPress}) => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [region, setRegion] = useState(IRAN_COORDINATES);
    const [officeData, setOfficeData] = useState([]);

    useEffect(() => {
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
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        };
        getLocationAsync();

        setOfficeData([
            {
                officeName: "kasbino",
                coordinate: {
                    latitude: 35.72918128209974,
                    longitude: 51.360396951983006,
                },
            },
        ]);
    }, []);


    if (!region) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region} showsUserLocation followsUserLocation minZoomLevel={5}
                     maxZoomLevel={18}>

                {officeData.map((data, index) => (
                    <Circle
                        key={index}
                        center={data.coordinate}
                        radius={50}
                        strokeColor={colors.primary}
                        fillColor={'#0000000D'}
                        strokeWidth={1}
                    />
                ))}

                {officeData.map((data, index) => (
                    <Marker
                        key={index}
                        coordinate={data.coordinate}
                        anchor={{x: 0.5, y: 0.5}} // Center the marker at the specified coordinate
                        onPress={() => console.log("Marker pressed")}
                    >
                        <View style={styles.content}>
                            <Text style={styles.OfficeMarkerText}>{data.officeName}</Text>
                            <KhiyabunIcons name="buildings-bold" size={24} color={colors.darkPrimary}/>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <TimeClockCard setEnteredOffice={setEnteredOffice} onPress={onPress}/>
        </View>
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
    });
};
export default TimeClockMap;