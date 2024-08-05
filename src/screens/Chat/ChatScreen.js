import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import ChatList from "./ChatList";
import Card from "../../components/Card";
import {FAB} from "react-native-elements";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";

const ChatScreen = () => {
    const {colors} = useTheme();
    const onPressHandler = () => {
       alert("دنبال چی شما آقای نعیمی؟")
    }
    const chatData = [
        {
            id: '1',
            name: 'Notifications',
            chatType: "notifications",
            message: 'Welcome to #1 real state university',
            time: '20:01',
            unreadMessages: null,
            pinned: true,
        },
        {
            id: '2',
            name: 'News channel',
            chatType: "channel",
            message: 'Welcome to #1 real state university',
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            unreadMessages: "10",
            pinned: true,
        },
        {
            id: '3',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: 6,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        },
        {
            id: '4',
            name: 'News channel',
            chatType: "channel",
            message: 'Welcome to #1 real state university',
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            unreadMessages: null,
            pinned: false,
        },
        {
            id: '5',
            name: 'Alex',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: null,
            pinned: false,
        },
        {
            id: '6',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        }, {
            id: '7',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: 3,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        }, {
            id: '8',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        },
        {
            id: '9',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        }, {
            id: '10',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        }, {
            id: '11',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        }, {
            id: '12',
            name: 'Martinez',
            chatType: "private",
            message: 'Do you want book a demo?',
            unreadMessages: null,
            time: '20:01',
            profileImage: 'https://example.com/martinez.png',
            pinned: false,
        },

    ];

    return (
        <View style={styles.container}>
            <Card>
                <ChatList data={chatData}/>
            </Card>
            <FAB
                visible={true}
                icon={<KhiyabunIcons name="edit-1-outline" size={24} color={colors.white}/>}
                color={colors.primary}
                placement="right"
                onPress={onPressHandler}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
});

export default ChatScreen;
