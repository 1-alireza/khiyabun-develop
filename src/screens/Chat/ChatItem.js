import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Badge from "../../components/Badge";

const ChatItem = ({item}) => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const renderProfileImage = () => {
        if (item.chatType === "notifications") {
            return (
                <View style={styles.notifications}>
                    <KhiyabunIcons name="notification-bold" size={16} color={colors.white}/>
                </View>
            );
        }
        if (item.profileImage) {
            if (item.chatType === "channel") {
                return <Image source={require("../../../assets/img/channel-bg.png")} style={styles.channels}/>;
            }
            if (item.chatType === "private") {
                return <Image source={require("../../../assets/img/3d_avatar_21.png")} style={styles.private}/>;
            }
        } else {
            const placeholderStyle = item.chatType === "channel" ? styles.channelsPlaceholder : styles.privatePlaceholder;
            return (
                <View style={placeholderStyle}>
                    <Text style={styles.profilePlaceholderText}>{item.name[0]}</Text>
                </View>
            );
        }
    };

    const onPressHandler = function () {
        alert("pressed")
    }

    return (
        <Pressable style={styles.container} onPress={onPressHandler}>
            {renderProfileImage()}
            <View style={styles.content}>
                <Text style={[styles.name, item.unreadMessages && styles.boldText]}>{item.name}</Text>
                <View style={styles.unreadMessages}>

                    {item.unreadMessages &&
                        <Badge text={item.unreadMessages > 9 ? "+9" : item.unreadMessages}
                               width={18} height={14} badgeStyle={{marginRight: 3}} fontSize={10}/>
                    }

                    <Text
                        style={[styles.message, item.unreadMessages && {color: colors.onSurface}]}>{item.message}
                    </Text>
                </View>

            </View>
            <View style={styles.rightSection}>
                <Text style={styles.time}>{item.time}</Text>
                {item.pinned &&
                    <KhiyabunIcons name="circle-pin-bold" size={16} color={colors.onSurfaceLow} style={styles.pin}/>}
            </View>
        </Pressable>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
        },
        notifications: {
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        channels: {
            width: 40,
            height: 40,
            borderRadius: 8,
        },
        channelsPlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        private: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        privatePlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        profilePlaceholderText: {
            fontSize: 18,
            fontWeight: "700",
            lineHeight: 26,
            textAlign: "center",
            letterSpacing: 0.02,
            color: colors.white,
        },
        unreadMessages: {
            flexDirection: "row",
            alignItems: "center",
        },
        boldText: {
            //styleName: Title/Medium;
            fontFamily: 'dana-bold',
            fontWeight: 'bold'
        },
        content: {
            flex: 1,
            marginLeft: 10,
            padding: 1,
        },
        name: {
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "left",
            letterSpacing: 0.02,
            marginBottom: 1,
            color: colors.onSurface,
        },
        message: {
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 20,
            textAlign: "left",
            color: colors.onSurfaceLow,
        },
        rightSection: {
            alignItems: 'flex-end',
        },
        time: {
            fontSize: 10,
            fontWeight: "500",
            lineHeight: 16,
            textAlign: "left",
            color: colors.onSurfaceLow,
        },
        pin: {
            marginTop: 8,
        },

    });
};

export default ChatItem;