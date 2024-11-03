import React from "react";
import {View, StyleSheet, FlatList} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import CustomText from "../../components/CustomText";

const data = [
    {title: 'Selling a villa', price: '4000 $', status: 'Need analysis'},
    {title: 'Selling an shop', price: '2000 $', status: 'Negotiation'},
];

function Deal() {
    const styles = useThemedStyles();

    const DealItem = ({item}) => (
        <View style={styles.box}>
            <View style={styles.wrapper}>
                <CustomText size={13} weight={'bold'} color={colors.onSurface}
                            textAlign={"left"}
                            lineHeight={20}>
                    {item.title}
                </CustomText>
                <CustomText size={11} color={colors.onSurfaceLow}
                            textAlign={"left"}
                            lineHeight={16} customStyle={{marginTop: 3}}>
                    {item.price}
                </CustomText>
            </View>
            <View style={styles.statusButton}>
                <CustomText size={11} color={colors.darkWarning}
                            textAlign={"left"} weight={'bold'}
                            lineHeight={16} customStyle={{marginTop: 3}}>
                    {item.status}
                </CustomText>
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