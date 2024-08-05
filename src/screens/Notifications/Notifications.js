import React, {useState} from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import gStyles from "../../global-styles/GlobalStyles";
import Card from "../../components/Card";

const DATA = [
    {
        "date": "This week",
        "data": [
            {
                title: "You have been auto clock out",
                desc: "11 days ago",
                type: "auto_clock_out",
                isRead: false,
                id: 1
            }, {
                title: "you requested to edit a shift on sun",
                desc: "15/10 from 08:39 am - 09:39 pm",
                type: "auto_clock_out",
                isRead: false,
                id: 2
            }, {
                title: "Dear Meysam, You have reached",
                desc: "70% of your target",
                type: "reached_limit",
                isRead: false,
                id: 3
            }, {
                title: "You have a meeting with Ali hosseini",
                desc: "Today at 18:30",
                type: "meeting",
                isRead: false,
                id: 4
            },

        ],
    },
    {
        "date": "Thursday, Apr 16",
        "data": [
            {
                title: "You have been auto clock out",
                desc: "11 days ago",
                type: "auto_clock_out",
                isRead: true,
                id: 5
            }, {
                title: "you requested to edit a shift on sun",
                desc: "15/10 from 08:39 am - 09:39 pm",
                type: "auto_clock_out",
                isRead: true,
                id: 6
            }, {
                title: "Dear Meysam, You have reached",
                desc: "70% of your target",
                type: "reached_limit",
                isRead: true,
                id: 7
            }, {
                title: "You have a meeting with Ali hosseini",
                desc: "Today at 18:30",
                type: "meeting",
                isRead: true,
                id: 8
            },

        ],
    },
]

const TimesheetScreen = () => {
    const styles = useThemedStyles();
    const {colors} = useTheme();

    const renderDataItem = (item) => {
        console.log(item);

        return (
            <View style={styles.itemWrapper} key={item.id}>
                <View style={styles.section}>
                    <KhiyabunIcons
                        name={item.type === "auto_clock_out" ? "clock-bold" : item.type === "reached_limit" ? "pie-chart-bold" : "edit-bold"}
                        size={22} color={item.isRead ? colors.onSurfaceLow : colors.secondary}/>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.desc}</Text>
                    </View>
                </View>
            </View>
        );
    };
    const renderDataSection = ({item}) => {
        return (
            <Card >
                <FlatList
                    data={item.data}
                    keyExtractor={(item, index) => item.id.toString() + index}
                    renderItem={({item}) => renderDataItem(item)}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                />
            </Card>
        );
    };
    const renderDateItem = ({item}) => {
        return (
            <View>
                <View style={styles.dateSection}>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <FlatList
                    data={[item]}
                    keyExtractor={(item, index) => item.date + index}
                    renderItem={renderDataSection}
                />
            </View>
        );
    };

    return (
        <FlatList
            style={styles.container}
            data={DATA}
            keyExtractor={(item, index) => item.date + index}
            renderItem={renderDateItem}
        />
    );

}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginHorizontal: 8,
        },
        dateSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
        },
        date: {
            ...gStyles.fontMain,
            color: colors.onSurfaceContainer,
            fontSize: 12,
            lineHeight: 16,
        },
        itemWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 8,
        },
        section: {
            flexDirection: "row",
            alignItems: "center",
        },
        titleWrapper: {
            marginHorizontal: 12
        },
        title: {
            ...gStyles.fontMain,
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            textAlign: 'left',
        },
        desc: {
            ...gStyles.fontMain,
            color: colors.onSurfaceLow,
            fontSize: 12,
            lineHeight: 16,
            textAlign: 'left',
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 8,
        },
    });
};

export default TimesheetScreen;