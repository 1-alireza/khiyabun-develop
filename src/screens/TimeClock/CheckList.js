import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, SectionList, TouchableOpacity, Dimensions, Pressable} from "react-native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";
import {useTranslation} from "react-i18next";

const DATA = [
    {
        "date": "2024-07-04",
        "data": [
            {
                title: "Call Mr Habibi",
                checked: false,
                id: 12

            },
            {
                title: "Go to the gym",
                checked: false,
                id: 11
            },
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 10
            },
        ],
    },
    {
        "date": "2024-07-03",
        "data": [
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 8
            },
            {
                title: "Go to the gym",
                checked: true,
                id: 9
            },
        ],
    },
    {
        "date": "2024-07-02",
        "data": [
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 7
            },
            {
                title: "Go to the gym",
                checked: true,
                id: 6
            },
        ],
    },
    {
        "date": "2024-07-01",
        "data": [
            {
                title: "Call Mr Habibi",
                checked: false,
                id: 1
            },
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 2
            },
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 3
            },
            {
                title: "Call Mr Shahbazi",
                checked: true,
                id: 4
            },
            {
                title: "Go to the gym",
                checked: true,
                id: 5
            },
        ],
    },
];

const CheckList = () => {
    const {t} = useTranslation();
    const [selectedItems, setSelectedItems] = useState({});
    const styles = useThemedStyles();
    const {colors} = useTheme();

    useEffect(() => {
        let initialSelectedItems = {};
        DATA.forEach(section => {
            section.data.forEach(item => {
                initialSelectedItems[item.id] = item.checked;
            });
        });
        setSelectedItems(initialSelectedItems);
    }, []);
    const renderItem = ({item}) => (
        <Pressable
            style={styles.wrapper}
            onPress={() => {
                setSelectedItems({
                    ...selectedItems,
                    [item.id]: !selectedItems[item.id]
                });
            }}
        >
            <CheckBox
                checked={selectedItems[item.id]}
                checkedIcon={
                    <KhiyabunIcons name={'tick-circle-outline'} size={20} color={colors.primary}/>
                }
                uncheckedIcon={
                    <KhiyabunIcons name={'circle-outline'} size={20} color={colors.onSurface}/>
                }
                containerStyle={styles.checkBox}
            />
            <View style={[styles.textWrapper, selectedItems[item.id] ? {opacity: 0.4} : ""]}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerTextWrapper}>
                    <KhiyabunIcons name="tick-circle-bold" size={18} color={colors.primary}/>
                    <Text style={styles.headerText}>{t("today_checklist")}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={styles.headerTextWrapper}>
                    <Text style={styles.seeMoreText}>{t("add")}</Text>
                    <KhiyabunIcons name={"add-outline"} size={18} color={colors.darkPrimary}/>
                </TouchableOpacity>
            </View>
            {DATA.length !== 0 ?
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item.title + index}
                    renderItem={renderItem}
                    // renderSectionHeader={({section: {date}}) => (
                    //     <View style={styles.dateContainer}>
                    //         <View style={styles.dateSeparator}></View>
                    //         <Text style={styles.dateText}>{date}</Text>
                    //         <View style={styles.dateSeparator}></View>
                    //     </View>
                    // )}
                /> :
                <View style={styles.emptyChecklist}>
                    <Text style={styles.emptyChecklistText}>{t("empty_checklist")}</Text>
                </View>
            }
        </View>
    )
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginTop: 8,
            marginHorizontal: 8,
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 8,
        },
        emptyChecklist: {
            alignItems: "center",
            padding: 20,
        },
        emptyChecklistText: {
            fontFamily: "dana-regular",
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
        },
        wrapper: {
            flexDirection: "row",
            alignItems: 'center',
            padding: 16,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
        },
        headerText: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "700",
            lineHeight: 24,
            marginBottom: 2
        },
        seeMoreText: {
            fontFamily: "dana-bold",
            color: colors.darkPrimary,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 20,
            marginBottom: 3.5
        },
        dateContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        dateSeparator: {
            height: 1,
            width: (Dimensions.get('window').width),
            backgroundColor: colors.outlineSurface,
        },
        dateText: {
            paddingHorizontal: 20,
            fontFamily: "dana-regular",
            color: colors.onSurfaceContainer,
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 16,
        },
        checkBox: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            color: colors.onSurface,
            backgroundColor: colors.surfaceContainerLowest,
        },
        title: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceHigh,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            letterSpacing: 0.02,
            textAlign: "left",
        },
    });
};

export default CheckList;