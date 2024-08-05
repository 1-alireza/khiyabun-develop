import React, {useState} from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Card from "../../components/Card";
import DateTimePickerComponent from "../../components/Picker";
import MyDatePicker from "../../components/Picker";

const DATA = [
    {
        "date": "This week",
        "total": "84:38",
        "absence": "08:12",
        "data": [
            {
                title: "Daily total: __:__",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: false,
                id: 12

            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: false,
                id: 11
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 10
            },
            {
                title: "Daily total: 09:12",
                desc: "Time off (paid): 08:43",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 11
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 12
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 13
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 14
            },
        ],
    },
    {
        "date": "9/25 to 10/1",
        "total": "44:38",
        "absence": "08:12",
        "data": [
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 8
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 9
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 0
            },
            {
                title: "Daily total: 09:12",
                month_day: "08",
                week_day: "sun",
                state: false,
                checked: true,
                id: 1
            },
        ],
    },
]

const TimesheetScreen = () => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const renderTotalAndAbsence = ({total, absence}) => {
        return (
            <View style={styles.overall2}>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.text}>{total}</Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Absence:</Text>
                    <Text style={styles.text}>{absence}</Text>
                </View>
            </View>
        );
    };
    const renderDataItem = (item) => {
        return (
            <View style={styles.itemWrapper} key={item.id}>
                <View style={styles.leftWrapper}>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.dateText}>{item.week_day}</Text>
                        <Text style={styles.dateNum}>{item.month_day}</Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.desc && <Text style={styles.desc}>{item.desc}</Text>}
                    </View>
                </View>
                <KhiyabunIcons style={styles.playIcon} name="play-arrow-bold" size={18} color={colors.onSurface}/>
            </View>
        );
    };
    const renderDataSection = ({item}) => {
        return (
            <View style={styles.list}>
                {renderTotalAndAbsence(item)}
                <FlatList
                    data={item.data}
                    keyExtractor={(item, index) => item.id.toString() + index}
                    renderItem={({item}) => renderDataItem(item)}
                />
            </View>
        );
    };
    const renderDateItem = ({item}) => {
        return (
            <View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateT}>{item.date}</Text>
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
        <ScrollView style={styles.container}>

            <View style={styles.pickerWrapper}>
                <MyDatePicker type="date" size={1} placeHolder={"Start date"}/>
                <MyDatePicker type="date" size={1} placeHolder={"Finish date"}/>
            </View>

            <Card customStyle={{paddingVertical: 8, paddingHorizontal: 16, marginTop: 8}}>
                <View style={styles.headerTextWrapper}>
                    <KhiyabunIcons name="clock-bold" size={18} color={colors.primary}/>
                    <Text style={styles.headerText}>Overall totals</Text>
                </View>

                <View style={styles.overall}>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Total:</Text>
                        <Text style={styles.text}>534:38</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Absence:</Text>
                        <Text style={styles.text}>534:38</Text>
                    </View>
                </View>
            </Card>

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => item.date + index}
                renderItem={renderDateItem}
            />
        </ScrollView>
    );

}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginHorizontal: 8,
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
        },

        overall: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 5,
        },
        overall2: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 6,
            paddingHorizontal: 12
        },
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
        },
        label: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLow,
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 20,
        },
        text: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 20,
        },


        headerText: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 16,
            fontWeight: "700",
            lineHeight: 24,
            marginBottom: 2
        },

        dateContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
        },
        pickerWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        dateT: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceContainer,
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 16,
        },

        list: {
            backgroundColor: colors.surfaceContainerLowest,
            padding: 8,
            borderRadius: 8,
            marginVertical: 6,
        },
        itemWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderTopWidth: 1,
            borderTopColor: colors.outlineSurface,
        },

        leftWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        dateWrapper: {
            width: 40,
            height: 43,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 6,
        },
        dateNum: {
            fontFamily: "dana-bold",
            color: colors.onSurface,
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 20,
            textAlign: 'center',
        },
        dateText: {
            fontFamily: "dana-bold",
            color: colors.onSurfaceLowest,
            fontSize: 10,
            fontWeight: '500',
            lineHeight: 16,
            textAlign: 'center',
        },
        titleWrapper: {
            marginHorizontal: 8
        },
        title: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceHigh,
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 24,
            textAlign: 'left',
        },
        desc: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceLow,
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
            textAlign: 'left',
        },
        playIcon: {marginRight: 4}

    });
};

export default TimesheetScreen;