import React, {useState} from "react";
import TimeClockMap from "./TimeClockMap";
import TimeClock from "./TimeClock";
import PageHeader from "../../components/PageHeader";
import {useFocusEffect, useTheme} from "@react-navigation/native";
import TimeClockErrandMap from "./TimeClockErrandMap";
import ContactMeSheet from "./ContactMeSheet";
import NewTimeClockErrandMap from "./NewErrandMap";
import {useDispatch, useSelector} from "react-redux";
import {postRequest} from "../../utils/sendRequest";
import {addRest, updateIsRestingInWorkLogData} from "../../redux/slices/workLogSlice";
import CustomToast from "../../components/CustomToast";
import {useTranslation} from "react-i18next";

const TimeClockScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const [enteredOffice, setEnteredOffice] = useState(false);
    const [enteredOfficeData, setEnteredOfficeData] = useState({});

    const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
    const [selectedCheckboxOption, setSelectedCheckboxOption] = useState(null);

    const userToken = useSelector(state => state.login.token);
    const workLogData = useSelector(state => state.workLog.workLogData);
    const dispatch = useDispatch();

    // const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const [isContactMeSheetVisible, setIsContactMeSheetVisible] = useState(false);
    const [page, setPage] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            if (!workLogData) return;
            if (workLogData.startTime && !workLogData.endTime) {
                setEnteredOfficeData(workLogData.officeId);
                setEnteredOffice(true);
            }
            // console.log("workLogData slice", workLogData);

        }, [workLogData])
    );


    const startRest = async () => {
        if (!selectedDropdownOption) {
            CustomToast.show(t("select_rest_type_error"), "error");
            return;
        }

        if (!selectedCheckboxOption) {
            CustomToast.show(t("select_reach_way_error"), "error");
            return;
        }

        try {
            const body = {
                restStatusText: selectedCheckboxOption,
                restType: selectedDropdownOption,
            };

            console.log("startRest body", body);

            let res = await postRequest("work_log/start_rest", body, userToken);
            console.log("startRest res", res);

            if (res.statusCode === 200) {
                const newRest = {
                    id: res.data.id,
                    restType: res.data.restType,
                    startTime: res.data.startTime,
                    endTime: null,
                };
                dispatch(updateIsRestingInWorkLogData(true));

                CustomToast.show(t("rest_started_successfully"), "confirm");
            } else if (res.statusCode === 406) {
                CustomToast.show(res.message, "error");
            }
        } catch (e) {
            console.error("error starting Rest!", e);
        }

        setIsContactMeSheetVisible(false);
    };

    const closeContactMeSheet = () => {
        setIsContactMeSheetVisible(false);
    };

    // useEffect(() => {
    //     setNotifications(10);
    //     navigation.setParams({badgeCount: notifications});
    // }, [notifications]);


    const openErrand = () => {
        navigation.setOptions({
            header: ({navigation}) => (
                <PageHeader
                    title="Arako group"
                    rightIconName="notification-outline"
                    leftIconName="tag-user-outline"
                    onLeftIconPress={() => {
                        navigation.goBack();
                    }}
                    titleColor={colors.primary}
                    titleSize={18}
                    onRightIconPress={() => {
                        alert("right icon pressed baby!")
                    }}
                />
            ),
        });
        setPage('errand')
    }

    return (

        <>
            {page === "errand" ?
                <NewTimeClockErrandMap/> :
                // <TimeClockErrandMap
                //     onNearbyPeoplePress={()=>{
                // navigation.navigate("NewTimeClockErrandMap");
                // if (Platform.OS !== 'android') window.history.pushState({}, 'NewTimeClockErrandMap');
                //     }}
                //     openNearByPeople={()=>{
                // navigation.navigate("NearByPeople");
                // if (Platform.OS !== 'android') window.history.pushState({}, 'NearByPeople');
                //     }}
                //     openAddFlag={()=>{
                // navigation.navigate("AddFlag");
                // if (Platform.OS !== 'android') window.history.pushState({}, 'AddFlag');
                //     }}
                //     modalAction={()=>{
                //
                // navigation.navigate("SaveErrand");
                // if (Platform.OS !== 'android') window.history.pushState({}, 'SaveErrand');
                //     }}/> :
                // enteredOffice ?
                    <TimeClock setSheetVisible={setIsContactMeSheetVisible}
                               enteredOfficeData={enteredOfficeData}
                               setEnteredOffice={setEnteredOffice}/>
                    // :
                    // <TimeClockMap setEnteredOffice={setEnteredOffice} setEnteredOfficeData={setEnteredOfficeData}
                    //               onPress={openErrand}
                    // />

            }
            <ContactMeSheet isVisible={isContactMeSheetVisible} setSelectedDropdown={setSelectedDropdownOption}
                            selectedCheckbox={selectedCheckboxOption}
                            setSelectedCheckbox={setSelectedCheckboxOption}
                            onConfirm={startRest}
                            onCancel={closeContactMeSheet}/>
        </>
    );
}

export default TimeClockScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import * as Location from 'expo-location';
//
// const TrackingMap = () => {
//     const [region, setRegion] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [errorMsg, setErrorMsg] = useState(null);
//
//     useEffect(() => {
//         const initializeLocationTracking = async () => {
//             // Request permission for location access
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }
//
//             // Start tracking the user's location
//             const userLocation = await Location.getCurrentPositionAsync({});
//             const { latitude, longitude } = userLocation.coords;
//             setCoordinates([{ latitude, longitude }]);
//             setRegion({
//                 latitude,
//                 longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//             });
//
//             // Listen to location updates
//             const locationSubscription = Location.watchPositionAsync(
//                 {
//                     accuracy: Location.Accuracy.High,
//                     timeInterval: 2000, // Update every 2 seconds
//                     distanceInterval: 1, // Update every 1 meter
//                 },
//                 (newLocation) => {
//                     const { latitude, longitude } = newLocation.coords;
//                     setCoordinates((prevCoords) => [...prevCoords, { latitude, longitude }]);
//                     setRegion({
//                         latitude,
//                         longitude,
//                         latitudeDelta: 0.01,
//                         longitudeDelta: 0.01,
//                     });
//                 }
//             );
//
//             return locationSubscription; // return the subscription to be able to unsubscribe later
//         };
//
//         const subscription = initializeLocationTracking();
//
//         // Cleanup function to unsubscribe from location updates
//         return () => {
//             subscription?.then((sub) => sub.remove());
//         };
//     }, []);
//
//     return (
//         <View style={{ flex: 1 }}>
//             {errorMsg ? <Text>{errorMsg}</Text> : null}
//             {region && (
//                 <MapView style={{ flex: 1 }} region={region} showsUserLocation={true} showsMyLocationButton={true}>
//                     <Marker coordinate={region} title="You are here" />
//                     <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={5} />
//                 </MapView>
//             )}
//         </View>
//     );
// };
//
// export default TrackingMap;
