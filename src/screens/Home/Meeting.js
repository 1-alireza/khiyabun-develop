import React from "react";
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";
import {useTranslation} from "react-i18next";

const data = [
    {time_from: '2:30 pm', time_to: '3:00 pm', with: 'Alireza zare, Mohammad, Ahmad'},
    {time_from: '3:00 pm', time_to: '5:00 pm', with: 'Arnold jackson'},
];
const Meeting = () => {
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const renderItem = ({item}) => (
        <>
            <Text style={styles.meetingTime}>{item.time_from} - {item.time_to}</Text>
            <Text style={styles.meetingWith}>With {item.with}</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={"Meeting"}>
                <FlatList
                    style={{marginTop: 10}}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                />
            </HomeCard>
        </View>
    );
};
const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        wrapper: {
            // marginTop: 10,
        },
        meetingTime: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 24,
            textAlign: "left",
        },
        meetingWith: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLow,
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 20,
            textAlign: "left",
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 10,
        },

    });
};
export default Meeting;