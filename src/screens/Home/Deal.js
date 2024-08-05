import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";

const data = [
    {title: 'Selling a villa', price: '4000 $', status: 'Need analysis'},
    {title: 'Selling an shop', price: '2000 $', status: 'Negotiation'},
];


function Deal() {
    const styles = useThemedStyles();

    const DealItem = ({item}) => (
        <View style={styles.box}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.statusButton}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={"Deal"}>
                <FlatList
                    data={data}
                    renderItem={({item}) => <DealItem item={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />

            </HomeCard>
        </View>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        box: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: colors.outlineSurface,
            borderRadius: 6,
            padding: 10,
            marginTop: 10,
        },
        wrapper: {
            flexDirection: "column",
        },
        title: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 20,
            textAlign: "left",
        },
        price: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLow,
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 16,
            textAlign: "left",
            marginTop: 3,
        },

        statusButton: {
            backgroundColor: colors.warningContainer,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        statusText: {
            color: colors.darkWarning,
            fontSize: 12,
            fontWeight: "500",
            lineHeight: 16,
        },
    });
};

export default Deal;