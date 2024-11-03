// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import MapView, {Circle, Marker} from 'react-native-maps';
// import * as Location from 'expo-location';
// import KhiyabunIcons from "../../components/KhiyabunIcons";
// import {useTheme} from "@react-navigation/native";
// import TimeClockCard from "./TimeClockCard";
// import {getRequest} from "../../utils/sendRequest";
// import {useSelector} from "react-redux";
// import CustomText from "../../components/CustomText";
//
// const IRAN_COORDINATES = {
//     latitude: 32.4279,
//     longitude: 53.6880,
//     latitudeDelta: 20,
//     longitudeDelta: 20,
// };
//
// const darkMapStyle = [
//     {
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#242f3e',
//             },
//         ],
//     },
//     {
//         elementType: 'labels.text.stroke',
//         stylers: [
//             {
//                 color: '#242f3e',
//             },
//         ],
//     },
//     {
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#746855',
//             },
//         ],
//     },
//     {
//         featureType: 'administrative.locality',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#d59563',
//             },
//         ],
//     },
//     {
//         featureType: 'poi',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#d59563',
//             },
//         ],
//     },
//     {
//         featureType: 'poi.park',
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#263c3f',
//             },
//         ],
//     },
//     {
//         featureType: 'poi.park',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#6b9a76',
//             },
//         ],
//     },
//     {
//         featureType: 'road',
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#38414e',
//             },
//         ],
//     },
//     {
//         featureType: 'road',
//         elementType: 'geometry.stroke',
//         stylers: [
//             {
//                 color: '#212a37',
//             },
//         ],
//     },
//     {
//         featureType: 'road',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#9ca5b3',
//             },
//         ],
//     },
//     {
//         featureType: 'road.highway',
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#746855',
//             },
//         ],
//     },
//     {
//         featureType: 'road.highway',
//         elementType: 'geometry.stroke',
//         stylers: [
//             {
//                 color: '#1f2835',
//             },
//         ],
//     },
//     {
//         featureType: 'road.highway',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#f3d19c',
//             },
//         ],
//     },
//     {
//         featureType: 'transit',
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#2f3948',
//             },
//         ],
//     },
//     {
//         featureType: 'transit.station',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#d59563',
//             },
//         ],
//     },
//     {
//         featureType: 'water',
//         elementType: 'geometry',
//         stylers: [
//             {
//                 color: '#17263c',
//             },
//         ],
//     },
//     {
//         featureType: 'water',
//         elementType: 'labels.text.fill',
//         stylers: [
//             {
//                 color: '#515c6d',
//             },
//         ],
//     },
//     {
//         featureType: 'water',
//         elementType: 'labels.text.stroke',
//         stylers: [
//             {
//                 color: '#17263c',
//             },
//         ],
//     },
// ];
//
// const TimeClockMap = ({setEnteredOffice, setEnteredOfficeData, onPress}) => {
//     const styles = useThemedStyles();
//     const {colors} = useTheme();
//     const [region, setRegion] = useState(IRAN_COORDINATES);
//     const userToken = useSelector(state => state.login.token);
//     const isDarkMode = useSelector((state) => state.theme.darkTheme);
//
//     const [officeData, setOfficeData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await getOfficesLocation();
//                 if (res.length) {
//                     let officesArr = [];
//                     res.map(officeData => officesArr.push(
//                         {
//                             officeId: officeData.officeId,
//                             officeName: officeData.name,
//                             coordinate: {
//                                 latitude: officeData.location[1],
//                                 longitude: officeData.location[0],
//                             },
//                             hasWifi: officeData.hasWifi
//                         }
//                     ))
//                     setOfficeData(officesArr)
//                 }
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching offices Data:', error);
//             }
//         };
//         fetchData();
//     }, []);
//     const getOfficesLocation = async () => {
//         const res = await getRequest("teams/offices", {}, userToken);
//         if (res.statusCode === 200) {
//             return res.data;
//         }
//     };
//
//     useEffect(() => {
//         const getLocationAsync = async () => {
//             let {status} = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Location permission denied');
//                 return;
//             }
//
//             let location = await Location.getCurrentPositionAsync({});
//             setRegion({
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//             });
//         };
//         getLocationAsync();
//     }, []);
//
//     if (!region) {
//         return <CustomText
//             size={15} weight={'bold'} color={colors.onSurface} lineHeight={16}>
//             Loading...
//         </CustomText>
//     }
//
//     return (
//         <View style={styles.container}>
//             <MapView style={styles.map} region={region} showsUserLocation followsUserLocation minZoomLevel={5}
//                      maxZoomLevel={18} customMapStyle={isDarkMode && darkMapStyle}>
//                 {officeData.map((data, index) => (
//                     <Circle
//                         key={index}
//                         center={data.coordinate}
//                         radius={50}
//                         strokeColor={colors.primary}
//                         fillColor={'#0000000D'}
//                         strokeWidth={1}
//                     />
//                 ))}
//
//                 {officeData.map((data, index) => (
//                     <Marker
//                         key={index}
//                         coordinate={data.coordinate}
//                         anchor={{x: 0.5, y: 0.5}}
//                         onPress={() => console.log("Marker pressed")}
//                     >
//                         <View style={styles.content}>
//                             <CustomText size={13} weight={'bold'} color={colors.onSurface} lineHeight={20}>
//                                 {data.officeName}
//                             </CustomText>
//                             <KhiyabunIcons name="buildings-bold" size={24} color={colors.darkPrimary}/>
//                         </View>
//                     </Marker>
//                 ))}
//             </MapView>
//             <TimeClockCard officeData={officeData} setEnteredOffice={setEnteredOffice} setEnteredOfficeData={setEnteredOfficeData} onPress={onPress}/>
//         </View>
//     );
// };
//
// const useThemedStyles = () => {
//     return StyleSheet.create({
//         container: {
//             width: "100%",
//             height: "100%",
//             justifyContent: "flex-end",
//             alignItems: 'center',
//             gap: 10,
//         },
//         map: {
//             ...StyleSheet.absoluteFillObject,
//         },
//         content: {
//             alignItems: "center",
//             justifyContent: "center",
//         },
//
//     });
//
// };
//
// export default TimeClockMap;