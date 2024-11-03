import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { Alert, BackHandler, I18nManager, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Sheet from "../../components/Sheet";
import React, { useEffect, useState } from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomDropdown";
import ToggleSwitch from 'toggle-switch-react-native'
import Input from "../../components/Input";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getRequest, postRequest } from "../../utils/sendRequest";
import { errorHandling } from "../../utils/errorHandling";
import PersianDatePicker from "../../components/JalaliDate";
import { useSelector } from "react-redux";
import gStyles from "../../global-styles/GlobalStyles"
import jalaali from "jalaali-js";
import CustomText from "../../components/CustomText";

const AddTimeOffRequestSheet = ({ isVisible, onClose, callBack }) => {
    let jToday
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors)
    const userToken = useSelector(state => state.login.token);
    const [date, setDate] = useState(new Date());
    const [attachedNote, setAttachedNote] = useState('');
    const [initTime, setInitTime] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [fullDayTime, setFullDayTime] = useState('');
    const [finishTime, setFinishTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [timeOffType, setTimeOffType] = useState('')
    const [requestedHours, setRequestedHours] = useState('')
    const [timeOffStartDate, setTimeOffStartDate] = useState('')
    const [isOn, setIsOn] = useState(true)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [loader, setLoader] = useState(false);
    const isRTL = I18nManager.isRTL;
    const [showFinishDatePicker, setShowFinishDatePicker] = useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [showFinishTimePicker, setShowFinishTimePicker] = useState(false)
    const [allDay, setAllDay] = useState(false)

    const supportOptions = [
        { label: "سالانه", value: "سالانه" },
        { label: "پزشکی", value: "پزشکی" },
        { label: "ازدواج", value: "ازدواج" },
        { label: "سوگ", value: "سوگ" },
        { label: "بدون حقوق", value: "بدون حقوق" },
        { label: "حج", value: "حج" },
        { label: "انگیزه", value: "انگیزه" },
        { label: "پدری (فقط برای مردان)", value: "پدری (فقط برای مردان)" },
        { label: "نظامی (فقط برای مردان)", value: "نظامی (فقط برای مردان)" },
        { label: "زایمان (فقط برای زنان)", value: "زایمان (فقط برای زنان)" },
        { label: "شیردهی (فقط برای زنان)", value: "شیردهی (فقط برای زنان)" },
        { label: "وظیفه مدنی", value: "وظیفه مدنی" },
        { label: "همدردی", value: "همدردی" },
        { label: "مرخصی تحصیلی", value: "مرخصی تحصیلی" },

    ]

    const enSupportOptions = [
        { "label": "annual", "value": "annual" },
        { "label": "medical", "value": "medical" },
        { "label": "marriage", "value": "marriage" },
        { "label": "bereavement", "value": "bereavement" },
        { "label": "unpaid", "value": "unpaid" },
        { "label": "haj", "value": "haj" },
        { "label": "incentive", "value": "incentive" },
        { "label": "paternity (just for men)", "value": "paternity (just for men)" },
        { "label": "military (just for men)", "value": "military (just for men)" },
        { "label": "maternity (just for women)", "value": "maternity (just for women)" },
        { "label": "breastfeeding (just for women)", "value": "breastfeeding (just for women)" },
        { "label": "civic duty", "value": "civic duty" },
        { "label": "compassionate", "value": "compassionate" },
        { "label": "sabbatical", "value": "sabbatical" }
    ]


    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => null,
    //                 style: "cancel"
    //             },
    //             {text: "YES", onPress: () => BackHandler.exitApp()}
    //         ]);
    //         return true; // Prevent default behavior (going back)
    //     };
    //
    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //
    //     return () => backHandler.remove(); // Cleanup the event listener on unmount
    // }, []);


    const convertToJalali = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Months are zero-based
        const day = date.getUTCDate();
        const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
        return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
    };
    const today = new Date();

    jToday = convertToJalali(today)

    const closeSheet = () => {
        setShowFinishDatePicker(false)
        setShowStartTimePicker(false)
        setShowFinishTimePicker(false)
        closeSheet()
    }

    const getAttachedNote = (val) => {
        setAttachedNote(val)
    }

    const changeTimeOffType = (type) => {
        setTimeOffType(type)
    }

    const toggleAllDay = () => {
        setIsOn(!isOn)
        setAllDay(!allDay)
    }


    const convertTimeToGregorian = (jalaliDate) => {
        console.log("lll")
        const [jy, jm, jd] = jalaliDate.split('/').map(Number);
        const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
        console.log(`${gy}/${String(gm).padStart(2, '0')}/${String(gd).padStart(2, '0')}`);
        setShowDatePicker(false)
        setFullDayTime(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
    };


    const convertFinishTimeToGregorian = (jalaliDate, type) => {
        console.log(jalaliDate)
        if (type == "start") {
            console.log("jalaliDate")
            setTimeOffStartDate(jalaliDate)
            const [jy, jm, jd] = jalaliDate.split('/').map(Number);
            const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
            console.log(`${gy}/${String(gm).padStart(2, '0')}/${String(gd).padStart(2, '0')}`);
            setShowDatePicker(false)
            setShowStartDatePicker(false)
            setShowFinishDatePicker(false)
            setStartDate(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
        } else {
            const [jy, jm, jd] = jalaliDate.split('/').map(Number);
            const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
            console.log(`${gy}/${String(gm).padStart(2, '0')}/${String(gd).padStart(2, '0')}`);
            setShowDatePicker(false)
            setShowStartDatePicker(false)
            setShowFinishDatePicker(false)

            setFinishDate(finishDate => `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
            getWorkHours(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
        }

    };


    let disabled = !timeOffType

    const onChangeStartDate = (event, selectedDate) => {

        console.log("dfghc", selectedDate)
        const startTime = selectedDate || initTime;
        const date = new Date(startTime);
        const options = {
            timeZone: 'Asia/Tehran',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const timeInTehran = date.toLocaleString('en-US', options);
        console.log("time", timeInTehran);
        setStartTime(timeInTehran);
        setShowStartTimePicker(false)
    };

    const onChangeFinishDate = (event, selectedDate) => {
        console.log("kagan");
        console.log(selectedDate)
        const finishTime = selectedDate || initTime;
        const date = new Date(finishTime);
        const options = {
            timeZone: 'Asia/Tehran',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const timeInTehran = date.toLocaleString('en-US', options);
        console.log("time", timeInTehran);
        setFinishTime(timeInTehran);
        setShowFinishTimePicker(false)

    };


    const getWorkHours = async (finishDate) => {
        const body = {
            startDate: startDate,
            endDate: finishDate
        }

        let res = await getRequest(`work_request/working_hours`, body, userToken)
        console.log("ads", res)
        setRequestedHours(res.data.hours)
        console.log("request", res)

    }


    const addRequest = async () => {
        setLoader(true)
        let startRequestTime = isOn ? "00:00:00" : startTime
        let finishRequestTime = isOn ? "00:00:00" : finishTime
        let startRequestDate = isOn ? startDate : fullDayTime
        let finishRequestDate = isOn ? finishDate : fullDayTime


        try {
            const body = {
                workRequestType: "time_off",
                startTime: `${startRequestDate + "T" + startRequestTime}`,
                endTime: `${finishRequestDate + "T" + finishRequestTime}`,
                note: attachedNote,
                subType: timeOffType,
                isDaily: isOn,
            }
            console.log("lkl", body)

            let res = await postRequest("work_request", body, userToken)
            console.log("time off added", res)
            if (res.statusCode >= 200 || res.statusCode < 300) {
                errorHandling(res, "confirm")
            } else {
                console.log("warning")
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        } finally {
            callBack()
            setLoader(false)
            onClose()
        }
    }

    const onBackDropPress = () => {
        setShowDatePicker(false)
        setShowStartDatePicker(false)
        setShowFinishDatePicker(false)
    }


    return (
        <Sheet
            onBackButtonPress={onBackDropPress}
            isOpen={isVisible}
            fitContent={true}
            onClose={onClose}
            snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("time_off_request")}</Text>
            </View>
            <View
                style={!isOn ? [styles.sheetBody, { height: 420 }] : !requestedHours ? [styles.sheetBody, { height: 300 }] : styles.sheetBody}>
                <CustomDropdown data={isRTL ? supportOptions : enSupportOptions} defaultValue={"Errand"}
                    placeHolder={"type"} callBackFunction={changeTimeOffType} style={styles.dropDown} />
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


                {!isOn && (
                    <Pressable style={styles.dateTrigger} onPress={() => setShowDatePicker(true)}>
                        <Text>
                            {fullDayTime ? convertToJalali(fullDayTime) : t("start_date")}
                        </Text>
                        <KhiyabunIcons name={"calender-outline"} size={24} />
                    </Pressable>

                )}
                {isOn ? (
                    <View style={styles.inputWrapper}>
                        <Pressable style={styles.shortDateTrigger} onPress={() => setShowStartDatePicker(true)}>
                            <CustomText color={colors.onSurfaceLowest} size={14} lineHeight={20}>
                                {startDate ? convertToJalali(startDate) : t("start_date")}
                            </CustomText>

                            <KhiyabunIcons name={"calender-outline"} color={colors.onSurfaceLowest} size={24} />
                        </Pressable>
                        <Pressable style={styles.shortDateTrigger} onPress={() => setShowFinishDatePicker(true)}>
                            <CustomText color={colors.onSurfaceLowest} size={14} lineHeight={20}>
                                {finishDate ? convertToJalali(finishDate) : t("finish_date")}
                            </CustomText>
                            <KhiyabunIcons name={"calender-outline"} color={colors.onSurfaceLowest} size={24} />
                        </Pressable>
                    </View>
                )
                    :
                    (<View style={styles.inputWrapper}>
                        <Pressable style={styles.shortDateTrigger} onPress={() => setShowStartTimePicker(true)}>
                            <CustomText color={colors.onSurfaceLowest} size={14} lineHeight={20}>
                                {startTime ? startTime : t("start_time")}
                            </CustomText>
                            <KhiyabunIcons name={"clock-outline"} color={colors.onSurfaceLowest} size={24} />
                        </Pressable>
                        <Pressable style={styles.shortDateTrigger} onPress={() => setShowFinishTimePicker(true)}>
                            <CustomText color={colors.onSurfaceLowest} size={14} lineHeight={20}>
                                {finishTime ? finishTime : t("finish_time")}
                            </CustomText>
                            <KhiyabunIcons name={"clock-outline"} color={colors.onSurfaceLowest} size={24} />
                        </Pressable>
                    </View>

                    )}

                {requestedHours && (
                    <View style={styles.totalTime}>
                        <CustomText size={14} lineHeight={20} color={colors.onSurfaceLow}>
                            {t("total_time_requested")}
                        </CustomText>
                        <CustomText size={14} lineHeight={20} color={colors.onSurface}>
                            {requestedHours + " " + t("hour")}
                        </CustomText>

                    </View>
                )}
                <Input label={t("note")} onChangeText={getAttachedNote} placeholder={t("please_explain_your_request")} />
            </View>
            {showDatePicker && (
                <PersianDatePicker
                    onDateChange={convertTimeToGregorian}
                    selectedDate={jToday}
                />
            )}
            {showFinishDatePicker && (
                <PersianDatePicker
                    startDate={timeOffStartDate}
                    onDateChange={(jalaliDate) => convertFinishTimeToGregorian(jalaliDate, "finish")}
                    selectedDate={jToday}
                />
            )}
            {showStartDatePicker && (
                <PersianDatePicker
                    onDateChange={(jalaliDate) => convertFinishTimeToGregorian(jalaliDate, "start")}
                    selectedDate={jToday}
                />
            )}
            {showStartTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={initTime}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}
            {showFinishTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={initTime}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeFinishDate}
                />
            )}
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={40}
                    styleText={styles.cancelButtonText} onPress={closeSheet} />
                <Button showLoading={loader} label={t("send_for_approval")}
                    disabled={disabled} sizeButton={"medium"} style={styles.selectButton}
                    styleText={styles.selectButtonText} width={60} onPress={addRequest}
                    isBorder={true} borderColor={colors.primaryOutline} />
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
            fontFamily: gStyles.fontBold.fontFamily,
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
            fontFamily: gStyles.fontMain.fontFamily,
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
            fontFamily: gStyles.fontMain.fontFamily,
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
        },
        dateTrigger: {
            direction: "ltr",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            height: 48,
            width: "100%",
            justifyContent: "space-between",
            borderColor: colors.outlineSurface
        },
        shortDateTrigger: {
            direction: "ltr",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            height: 48,
            width: "49%",
            justifyContent: "space-between",
            borderColor: colors.outlineSurface
        }


    });
};


export default AddTimeOffRequestSheet;








