import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Badge from "../../components/Badge";
import CustomText from "../../components/CustomText";

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
                    <CustomText
                        size={17} weight={'bold'} color={colors.white} lineHeight={26} textAlign={'center'}
                        letterSpacing={0.02}>
                        {item.name[0]}
                    </CustomText>
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
                <CustomText
                    size={15} weight={item.unreadMessages && 'bold'} color={colors.onSurface} lineHeight={24}
                    textAlign={'left'} letterSpacing={0.02}
                    customStyle={{marginBottom: 1}}>
                    {item.name}
                </CustomText>
                <View style={styles.unreadMessages}>

                    {item.unreadMessages &&
                        <Badge text={item.unreadMessages > 9 ? "+9" : item.unreadMessages}
                               width={18} height={14} badgeStyle={{marginRight: 3}} fontSize={10}/>
                    }
                    <CustomText
                        size={13} weight={'bold'} color={item.unreadMessages ? colors.onSurface : colors.onSurfaceLow}
                        lineHeight={20} textAlign={'left'}>
                        {item.message}
                    </CustomText>
                </View>

            </View>
            <View style={styles.rightSection}>
                <CustomText
                    size={9} weight={'bold'} color={colors.onSurfaceLow} lineHeight={16} textAlign={'left'}>
                    {item.time}
                </CustomText>
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
        unreadMessages: {
            flexDirection: "row",
            alignItems: "center",
        },
        content: {
            flex: 1,
            marginLeft: 10,
            padding: 1,
        },
        rightSection: {
            alignItems: 'flex-end',
        },
        pin: {
            marginTop: 8,
        },
    });
};

export default ChatItem;