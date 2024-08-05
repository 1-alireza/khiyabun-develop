import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, FlatList, View, RefreshControl} from "react-native";
import Card from "../../components/Card";
import React, {useState} from "react";
import BlockedUser from "./BlockedUser";

const avatar = require("../../../assets/img/3d_avatar_21.png");


function BlockedUsersScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const blockedUsersData = [
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
    const renderItem = ({item}) => <BlockedUser item={item}/>;


    return (
        <View style={styles.main}
        >
            <Card>
                <FlatList
                    data={blockedUsersData}
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
    });
};

export default BlockedUsersScreen