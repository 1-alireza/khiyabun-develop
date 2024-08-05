import React, {useState} from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCartUI";
import {CheckBox} from "@rneui/themed";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";

const data = [
    {
        task_title: "Send home document to alireza",
        task_functor: "Saman heydari",
        task_sensitivity: "High",
        task_state: false,
        checked: false,
    },
    {
        task_title: "Go to ponak for regional expertise",
        task_functor: "Sepehr Alizade",
        task_sensitivity: "High",
        task_state: true,
        checked: false,
    },
];

const Task = () => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [dataState, setData] = useState(data);

    const renderItem = ({item}) => (
        <View style={styles.firstWrapper}>
            <View style={styles.wrapper}>
                <CheckBox
                    checked={item.checked}
                    onPress={() => {
                        const updatedData = [...dataState];
                        const index = updatedData.findIndex(
                            (d) => d.task_title === item.task_title
                        );
                        updatedData[index].checked = !updatedData[index].checked;
                        setData(updatedData);
                    }}
                    checkedIcon={
                        <KhiyabunIcons name={'tick-circle-outline'} size={20} color={colors.primary}/>
                    }
                    uncheckedIcon={
                        <KhiyabunIcons name={'circle-outline'} size={20} color={colors.onSurface}/>
                    }
                    containerStyle={styles.checkBox}
                />
                <View style={[styles.textWrapper, item.checked ? {opacity: 0.4} : ""]}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.task_title}
                    </Text>
                    <Text style={styles.name}>{item.task_functor}</Text>
                </View>
            </View>

            <View style={styles.priorityBg}>
                <Text style={styles.priorityText}>{item.task_sensitivity}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={"Task"}>
                <FlatList
                    style={{marginTop: 10}}
                    data={dataState} // Use dataState
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
        firstWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        wrapper: {
            flexDirection: "row",
            alignItems: 'center',

        },
        checkBox: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        title: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceHigh,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            letterSpacing: 0.02,
            textAlign: "left",
            maxWidth: "90%",
        },
        name: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLow,
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 16,
            textAlign: "left",
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 10,
        },
        priorityBg: {
            backgroundColor: colors.errorContainer,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        priorityText: {
            color: colors.darkError,
            fontSize: 12,
            fontWeight: "500",
            lineHeight: 16,
        },
    });
};
export default Task;