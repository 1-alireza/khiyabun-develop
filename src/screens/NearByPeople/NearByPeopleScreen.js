import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, FlatList, View, RefreshControl, Pressable, Text} from "react-native";
import Card from "../../components/Card";
import React, {useState} from "react";
import NearByPeople from "./NearByPeople";
import ToggleSwitch from "toggle-switch-react-native";
import KhiyabunIcons from "../../components/KhiyabunIcons";

const avatar = require("../../../assets/img/3d_avatar_21.png");


function NearNyPeopleScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [isOn, setIsOn] = useState(false)

    const NearByPeopleData = [
        {
            id: 1,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 2,

            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 3,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 4,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 5,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 6,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 7,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 8,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 9,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 10,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 11,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 12,
            name: "Martinez",
            distance: "500 m away",
            photo: "undefined"
        },
        {
            id: 13,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 14,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 15,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 16,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 17,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 18,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 19,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
        {
            id: 20,
            name: "Martinez",
            distance: "500 m away",
            photo: avatar
        },
    ]
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    const renderItem = ({item}) => <NearByPeople item={item}/>;


    return (
        <View style={styles.main}
        >
            <Card>
                <Pressable style={styles.isVisibleWrapper}>
                    <View style={styles.isVisibleTextWrapper}>
                        <KhiyabunIcons name={"tag-user-bold"} color={colors.secondary} size={24}/>
                        <View>
                            <Text style={styles.isVisibleText}>
                                {t("be visible")}
                            </Text>
                            <Text style={styles.isVisibleSupportingText}>
                                Be visible to everyone?
                            </Text>
                        </View>
                    </View>

                    <ToggleSwitch
                        isOn={isOn}
                        onColor={colors.primary}
                        offColor={colors.onSurfaceLowest}
                        size="medium"
                        onToggle={() => {
                            setIsOn(!isOn)
                        }}
                    />

                </Pressable>
            </Card>
            <Card>
                <FlatList
                    data={NearByPeopleData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                                    colors={[colors.primary]}
                                                    progressBackgroundColor={colors.surfaceContainerLowest}/>}
                />
            </Card>
        </View>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        main: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
        },
        isVisibleWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
        isVisibleText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.onSurfaceHigh
        },
        isVisibleSupportingText: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurfaceLow
        },
        isVisibleTextWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            gap: 12

        }

    });
};

export default NearNyPeopleScreen