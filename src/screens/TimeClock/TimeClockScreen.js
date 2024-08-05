
import React, {useEffect, useState} from "react";
import {Pressable, View, Text} from "react-native";
import TimeClockMap from "./TimeClockMap";
import TimeClock from "./TimeClock";
import PageHeader from "../../components/PageHeader";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import TimeClockErrandMap from "./TimeClockErrandMap";
import ContactMeSheet from "./ContactMeSheet";

const TimeClockScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const [enteredOffice, setEnteredOffice] = useState(false);
    // const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const [isContactMeSheetVisible, setIsContactMeSheetVisible] = useState(false);
    const [isOnRestMode, setIsOnRestMode] = useState(false);
    const [page, setPage] = useState('')
    const confirmRestMode = () => {
        setIsOnRestMode(true);
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

        <View>
            {page === "errand" ?
                <TimeClockErrandMap onNearbyPeoplePress={()=>navigation.navigate("ProfileS")} openNearByPeople={()=>navigation.navigate("NearByPeople")}  openAddFlag={()=>navigation.navigate("AddFlag")}  modalAction={()=>navigation.navigate("SaveErrand")}/> :
                enteredOffice ?
                    <TimeClock setSheetVisible={setIsContactMeSheetVisible} isOnRestMode={isOnRestMode} setIsOnRestMode={setIsOnRestMode}/>
                    :
                    <TimeClockMap setEnteredOffice={setEnteredOffice}
                                  onPress={openErrand}
                    />

            }
            <ContactMeSheet isVisible={isContactMeSheetVisible} onConfirm={confirmRestMode}
                            onCancel={closeContactMeSheet}/>
        </View>
    );
}

export default TimeClockScreen;
