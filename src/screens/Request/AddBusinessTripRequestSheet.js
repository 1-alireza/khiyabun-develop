import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import React, {useState} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomDropdown";
import Input from "../../components/Input";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddBusinessTripRequestSheet = ({isVisible, onClose, callBack}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [timeOffType, setTimeOffType] = useState('')
    const [showStartDatePicker, setStartShowDatePicker] = useState(false)
    const [showFinishDatePicker, setShowFinishDatePicker] = useState(false)
    const supportOptions = [
        {label: "Errand", value: "Errand"},
        {label: "Enter Office", value: "Enter Office"},
        {label: "Leave Office", value: "Leave Office"},
        {label: "Talk to cofounders", value: "Talk to cofounders"},
    ]
    const changeTimeOffType = (type) => {
        setTimeOffType(type)
    }
    const addRequest = () => {
        callBack("businessTrip")
    }

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setStartShowDatePicker(false)
        console.log(startDate)
    };
    const onChangeFinishDate = (event, selectedDate) => {
        const currentFinishDate = selectedDate || finishDate;
        setFinishDate(currentFinishDate);
        setShowFinishDatePicker(false)
        console.log(currentFinishDate)
    };


    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("business_trip_request")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <CustomDropdown data={supportOptions} defaultValue={"Errand"}
                                placeHolder={"type"} callBackFunction={changeTimeOffType} style={styles.dropDown}/>
                <View style={styles.inputWrapper}>
                    <Input placeholder={t("origin")} customStyles={{width: "49%"}}/>
                    <Input placeholder={t("destination")} customStyles={{width: "49%"}}/>
                </View>
                <Input placeholder={"September 29th 2023 - 05:13 pm"} value={"September 29th 2023 - 05:13 pm"}
                       rightIcon={"calender-outline"}
                       onFocus={() => setStartShowDatePicker(true)}/>
                <Input placeholder={"September 29th 2023 - 05:13 pm"} value={"September 29th 2023 - 05:13 pm"}
                       rightIcon={"calender-outline"}
                       onFocus={() => setShowFinishDatePicker(true)}
                       supportText={t("total_hours") + ": 7:14"}/>

                <Input label={t("note")} placeholder={t("please_explain_your_request")} multiline={true}
                       linesNumber={10} customStyles={{height: 130}}/>
            </View>
            {showStartDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}
            {showFinishDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={finishDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeFinishDate}
                />
            )}
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={t("send_for_approval")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={addRequest}
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
            height: 485
        },

        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
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
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
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
            paddingHorizontal: 8,
            backgroundColor: colors.surface,
            paddingVertical: 16,
            borderRadius: 8
        },
        totalTimeTitle: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        totalTimeText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface
        },
        allDay: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        dropDown: {
            paddingVertical: 0,
            paddingBottom: 8,
        }


    });
};


export default AddBusinessTripRequestSheet;