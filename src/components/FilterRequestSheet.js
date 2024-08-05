import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "./Sheet";
import React, {useEffect, useState} from "react";
import Button from "./Button";
import Input from "./Input";
import DateTimePicker from '@react-native-community/datetimepicker';
import {CheckBox} from "@rneui/themed";


const FilterRequestSheet = ({isVisible, onClose, callBack}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [startTime, setStartTime] = useState(new Date());
    const [finishTime, setFinishTime] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [isOn, setIsOn] = useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [showFinishTimePicker, setShowFinishTimePicker] = useState(false)
    const [status, setStatus] = useState([
        {
            id:0,
            content: "all_status",
            checked: false
        },
        {
            id:1,
            content: "pending",
            checked: false
        },
        {
            id:2,
            content: "approved",
            checked: false
        },
        {
            id:3,
            content: "declined",
            checked: false
        },
    ])
    const [type, setType] = useState([
        {
            id:0,
            content: "all_type",
            checked: false
        },
        {
            id:1,
            content: "time_off",
            checked: false
        },
        {
            id:2,
            content: "errand",
            checked: false
        },
        {
            id:3,
            content: "business_trip",
            checked: false
        },
        {
            id:4,
            content: "shift_request",
            checked: false
        },
    ])



    const toggleCheckbox = () => {
        setChecked(!checked)
    }


    const onChangeStartDate = (event, selectedDate) => {
        const startTime = selectedDate || startTime;
        setStartTime(startTime);
        setShowStartTimePicker(false)
        console.log(startTime)
    };
    const onChangeFinishDate = (event, selectedDate) => {
        const finishTime = selectedDate || finishTime;
        setFinishTime(finishTime);
        setShowFinishTimePicker(false)
        console.log(finishTime)
    };

    const handleStatusListChange = (id) => {
        const updatedCheckboxes = status.map((checkboxItem) =>
            checkboxItem.id === id ? {...checkboxItem, checked: !checkboxItem.checked} : checkboxItem)
        setStatus(updatedCheckboxes);
    };
    const handleTypeListChange = (id) => {
        const updatedCheckboxes = type.map((checkboxItem) =>
            checkboxItem.id === id ? {...checkboxItem, checked: !checkboxItem.checked} : checkboxItem)
        setType(updatedCheckboxes);
    };

    return (
        <Sheet isOpen={isVisible} contentWrapperStyle={{paddingHorizontal: 10}} fitContent={true} onClose={onClose}
               snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("time_off_request")}</Text>
            </View>
            <View style={isOn ? [styles.sheetBody, {height: 420}] : styles.sheetBody}>
                <View style={styles.inputWrapper}>
                    <Input placeholder={t("start_time")} customStyles={{width: "49%"}}
                           onFocus={() => setShowStartTimePicker(true)} rightIcon={"clock-outline"}/>
                    <Input placeholder={t("finish_time")} customStyles={{width: "49%"}}
                           onFocus={() => setShowFinishTimePicker(true)} rightIcon={"clock-outline"}/>
                </View>
                <View style={styles.totalTime}>
                    <View>
                        <Text style={styles.filterTitle}>
                            Status
                        </Text>
                        {status.map((item, index) => (
                            <CheckBox
                                iconRight={false}
                                key={index}
                                size={20}
                                checked={item.checked}
                                onPress={()=>handleStatusListChange(index)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor={colors.primary}
                                containerStyle={styles.checkBox}
                                textStyle={styles.title}
                                title={t(item.content)}
                            />
                        ))}

                        <Text style={styles.filterTitle}>
                            Type
                        </Text>
                        {type.map((item, index) => (
                            <CheckBox
                                iconRight={false}
                                size={20}
                                key={index}
                                checked={item.checked}
                                onPress={()=>handleTypeListChange(index)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor={colors.primary}
                                containerStyle={styles.checkBox}
                                textStyle={styles.title}
                                title={t(item.content)}
                            />
                        ))}
                    </View>

                </View>
            </View>
            {showStartTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startTime}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}
            {showFinishTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={finishTime}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeFinishDate}
                />
            )}
            <View style={styles.sheetOptions}>
                <Button label={t("remove_filter")} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={t("filter")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={onClose}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            flexDirection: "column",
            gap: 8,
            width: "100%",
            paddingVertical: 8,
            height: 595
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginBottom: 8,
            marginTop: 16,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: "dana-bold",
            lineHeight: 24
        }, sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",

            bottom: 0,
            marginBottom: 20,
            width: "100%",
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.surfaceContainerLowest
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        toggleWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            marginBottom: 6
        },
        inputWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 2,
        },
        totalTime: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 2,
            paddingHorizontal: 16,
            backgroundColor: colors.surface,
            paddingVertical: 16,
            borderRadius: 8
        },
        filterTitle: {
            fontFamily: "dana-bold",
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24,
            marginBottom: 8
        },
        checkBox: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 15
        },
        title: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh
        }

    });
};


export default FilterRequestSheet;