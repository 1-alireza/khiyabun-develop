import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, RefreshControl, Dimensions} from 'react-native';
import CheckList from "../TimeClock/CheckList";
import {useNavigation, useTheme} from "@react-navigation/native";
import TimeClock from "../TimeClock/TimeClock";
import ContactMeSheet from "../TimeClock/ContactMeSheet";
import RestChips from "../TimeClock/RestChips";

const OfficeScreen = () => {
    const navigation = useNavigation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const [isContactMeSheetVisible, setIsContactMeSheetVisible] = useState(false);
    const [isOnRestMode, setIsOnRestMode] = useState(false);

    const confirmRestMode = () => {
        setIsOnRestMode(true);
        setIsContactMeSheetVisible(false);
    };
    const closeContactMeSheet = () => {
        setIsContactMeSheetVisible(false);
    };

    useEffect(() => {
        setNotifications(10);
        navigation.setParams({badgeCount: notifications});
    }, [notifications]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollViewContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.primary]}
                                progressBackgroundColor={colors.surfaceContainerLowest}/>}>

                <TimeClock setSheetVisible={setIsContactMeSheetVisible} isOnRestMode={isOnRestMode}/>

                {isOnRestMode ? <RestChips/> : <CheckList/>}

            </ScrollView>
            <ContactMeSheet isVisible={isContactMeSheetVisible} onConfirm={confirmRestMode}
                            onCancel={closeContactMeSheet}/>
        </>
    );
};


const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        scrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
        },
        container: {
            marginTop: 8,
            width: (Dimensions.get('window').width - 20),
            flexDirection: "row",
            flexWrap: "wrap",
        },
        chips: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            color: colors.onSurface,
            width: "fit-content",
            maxWidth: 150,
            height: 30,
            paddingVertical: 6,
            paddingHorizontal: 16,
            marginBottom: 10,
            marginHorizontal: 6,
            borderRadius: 100,
        },
    });
};

export default OfficeScreen;