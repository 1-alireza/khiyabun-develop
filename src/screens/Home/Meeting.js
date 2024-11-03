import React from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import {useTranslation} from "react-i18next";
import CustomText from "../../components/CustomText";

const data = [
    {time_from: '2:30 pm', time_to: '3:00 pm', with: 'Alireza zare, Mohammad, Ahmad'},
    {time_from: '3:00 pm', time_to: '5:00 pm', with: 'Arnold jackson'},
];
const Meeting = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();

    const renderItem = ({item}) => (
        <>
            <CustomText size={15} color={colors.onSurface}
                        weight={'bold'}
                        textAlign={'left'}
                        lineHeight={24}>

                {item.time_from} - {item.time_to}
            </CustomText>
            <CustomText size={13} color={colors.onSurfaceLow}
                        textAlign={'left'}
                        lineHeight={20}>
                With {item.with}
            </CustomText>
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
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 10,
        },

    });
};
export default Meeting;