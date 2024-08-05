import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import React, {useState} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomDropdown";
import ToggleSwitch from 'toggle-switch-react-native'
import Input from "../../components/Input";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomModal from "../../components/CustomModal";


const AddTimeOffRequestSheet = ({isVisible, onClose, callBack}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [finishTime, setFinishTime] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [timeOffType, setTimeOffType] = useState('')
    const [isOn, setIsOn] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [showFinishTimePicker, setShowFinishTimePicker] = useState(false)
    const [allDay, setAllDay] = useState(false)
    const supportOptions = [
        {label: "Errand", value: "Errand"},
        {label: "Enter Office", value: "Enter Office"},
        {label: "Leave Office", value: "Leave Office"},
        {label: "Talk to cofounders", value: "Talk to cofounders"},
    ]
    const changeTimeOffType = (type) => {
        setTimeOffType(type)
    }

    const toggleAllDay = () => {
        setIsOn(!isOn)
        setAllDay(!allDay)
    }

    const addRequest=()=>{
        callBack("timeOff")
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false)
        console.log(date)
    };
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

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("time_off_request")}</Text>
            </View>
            <View style={isOn?[styles.sheetBody,{height:420}]:styles.sheetBody}>
                <CustomDropdown data={supportOptions} defaultValue={"Errand"}
                                placeHolder={"type"} callBackFunction={changeTimeOffType} style={styles.dropDown}/>
                <Pressable style={styles.toggleWrapper}>
                    <Text style={styles.allDay}>
                        {t("all_day")}
                    </Text>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor={colors.primary}
                        offColor={colors.onSurfaceLowest}
                        size="medium"
                        onToggle={toggleAllDay}
                    />
                </Pressable>
                {isOn && (
                    <Input placeholder={t("start_date")} rightIcon={"calender-outline"}
                           onFocus={() => setShowDatePicker(true)}/>
                )}
                <View style={styles.inputWrapper}>
                    <Input placeholder={t("start_time")} customStyles={{width: "49%"}}
                           onFocus={() => setShowStartTimePicker(true)} rightIcon={"clock-outline"}/>
                    <Input placeholder={t("finish_time")} customStyles={{width: "49%"}}
                           onFocus={() => setShowFinishTimePicker(true)} rightIcon={"clock-outline"}/>
                </View>
                <View style={styles.totalTime}>
                    <Text style={styles.totalTimeTitle}>
                        {t("total_time_requested")}
                    </Text>
                    <Text style={styles.totalTimeText}>
                        8 hours
                    </Text>
                </View>
                <Input label={t("note")} placeholder={t("please_explain_your_request")}/>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}
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
            height: 365
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


export default AddTimeOffRequestSheet;