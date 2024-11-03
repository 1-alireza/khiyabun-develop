import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useNavigation, useTheme} from "@react-navigation/native";
import Calendar from "./Calendar";
import DailyAdvice from "./DailyAdvice";
import LatestWorkLog from "./LatestWorkLog";
import Requests from "./Requests";
import News from "./News";
import Flags from "./Flags";
import Birthday from "./Birthday";
import ArticleAndPodcast from "./ArticleAndPodcast";
import {getRequest, putRequest} from "../../utils/sendRequest";
import {receiveProfileData} from "../../redux/actions/profileAction";
import {useDispatch, useSelector} from 'react-redux';
import {usePushNotifications} from "../../../usePushNotifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTeamSheet from "../Team/AddTeamSheet";

// import Meeting from "./Meeting";
// import Task from "./Task";
// import Deal from "./Deal";
// import Vote from "./Vote";




const HomeScreen = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const {colors} = useTheme();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const {expoPushToken, notification} = usePushNotifications();
    const [isVisible, setIsVisible] = useState(false)
    const [haveTeam, setHaveTeam] = useState(true)

    useEffect(() => {
        getTeams()
    }, []);


    const openSheet = () => setIsVisible(true)
    const closeSheet = () => setIsVisible(false)

    const getTeams = async () => {
        let res = await getRequest("profile/current_teams", {}, userToken)
        if (res.statusCode === 200){
            if(res.data.length==0){
                console.log(478)
                setHaveTeam(false)
              openSheet()
            }
        }
        console.log("user Teams", res)
    }

    const getNotificationsCount = async () => {
        const res = await getRequest("notifications/count", {}, userToken);
        if (res.statusCode === 200) {
            return res.data;
        } else {
            throw new Error('Failed to get notifs count, status code: ' + res.statusCode);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getNotificationsCount();
                setNotificationsCount(res.count);
            } catch (error) {
                console.error('Error fetching NotificationsCount:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        navigation.setParams({badgeCount: notificationsCount});
    }, [notificationsCount]);

    const getProfileData = () => {
        let data = {
            api: "profile",
            token: userToken
        }
        dispatch(receiveProfileData(data));

    };

    useEffect(() => {
        getProfileData();
    }, [dispatch]);

    const setNotificationToken = async (token) => {
        const storedToken = await AsyncStorage.getItem('notificationToken');
        console.log("stored NT", storedToken);
        if (storedToken) return;

        const body = {"pushToken": token};
        try {
            const res = await putRequest(`profile/push_token`, body, userToken);
            if (res.statusCode === 200) {
                await AsyncStorage.setItem('notificationToken', token);
            }
        } catch (e) {
            console.error("an error happened during setting NT:", e)
        }
    };

    useEffect(() => {
        if (expoPushToken) {
            setNotificationToken(expoPushToken.data)
        }
    }, [expoPushToken]);


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
            <View>
                <Calendar/>
                <DailyAdvice/>
                <LatestWorkLog/>
                {/*<Meeting/>*/}
                {/*<Task/>*/}
                <Requests/>
                <News/>
                {/*<Deal/>*/}
                <Flags/>
                <Birthday/>
                {/*<Vote/>*/}
                <ArticleAndPodcast/>
            </View>

        </ScrollView>
            <AddTeamSheet onClose={closeSheet} isVisible={isVisible} haveTeam={haveTeam}/>
        </>

    );
}


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
});

export default HomeScreen;
