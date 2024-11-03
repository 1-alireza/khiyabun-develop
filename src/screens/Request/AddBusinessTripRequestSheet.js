import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { I18nManager, Pressable, StyleSheet, Text, View } from "react-native";
import Sheet from "../../components/Sheet";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomDropdown";
import Input from "../../components/Input";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import jalaali from "jalaali-js";
import { getRequest, postRequest } from "../../utils/sendRequest";
import { errorHandling } from "../../utils/errorHandling";
import PersianDatePicker from "../../components/JalaliDate";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText";
import { log } from "expo/build/devtools/logger";

const AddBusinessTripRequestSheet = ({ isVisible, onClose, callBack }) => {
    let jToday;
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors)
    const userToken = useSelector(state => state.login.token);
    const [timeOffStartDate, setTimeOffStartDate] = useState('')
    const [attachedNote, setAttachedNote] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [tripType, setTripType] = useState('')
    const [requestedHours, setRequestedHours] = useState('')
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showFinishDatePicker, setShowEndDatePicker] = useState(false)
    const [countries, setCountries] = useState([])
    const isRTL = I18nManager.isRTL;

    useEffect(() => {
        getCountries()

    }, []);
    const getCountries = async () => {
        let res = await getRequest("countries", {}, userToken)
        let newCountries = []
        console.log(res.data);
        res.data.forEach(country => {
            newCountries.push({
                "label": country.name,
                "value": country.name
            })

        });
        setCountries(newCountries)
    }
    
    console.log("sda", countries);

    const businessTripOptions = [
        { "label": "داخلی", "value": "داخلی" },
        { "label": "خارجی", "value": "خارجی" }

    ]

    const enBusinessTripOptions = [
        { "label": "domestic", "value": "domestic" },
        { "label": "foreign", "value": "foreign" },

    ]
    const changeTripType = (type) => {
        setTripType(type)
    }
    const convertToJalali = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
        return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
    };
    const today = new Date();

    jToday = convertToJalali(today)
    const convertFinishTimeToGregorian = (jalaliDate, type) => {
        console.log(jalaliDate)
        if (type == "start") {
            console.log("jalaliDate")
            setTimeOffStartDate(jalaliDate)
            const [jy, jm, jd] = jalaliDate.split('/').map(Number);
            const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
            console.log(`${gy}/${String(gm).padStart(2, '0')}/${String(gd).padStart(2, '0')}`);
            setShowEndDatePicker(false)
            setShowStartDatePicker(false)
            setStartDate(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
        } else {
            const [jy, jm, jd] = jalaliDate.split('/').map(Number);
            const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
            console.log(`${gy}/${String(gm).padStart(2, '0')}/${String(gd).padStart(2, '0')}`);
            setShowStartDatePicker(false)
            setShowEndDatePicker(false)

            setFinishDate(finishDate => `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
            getWorkHours(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`)
        }

    };

    const getWorkHours = async (finishDate) => {
        const body = {
            startDate: startDate,
            endDate: finishDate
        }

        let res = await getRequest(`work_request/working_hours`, body, userToken)
        console.log("ads", res)
        setRequestedHours(res.data.hours)

    }


    const getAttachedNote = (note) => {
        setAttachedNote(note)
    }

    const getDestination = (note) => {
        setDestination(note)
    }

    const getOrigin = (note) => {
        setOrigin(note)
    }

    const addRequest = async () => {
        try {
            const body = {
                workRequestType: "business_trip",
                startTime: `${startDate + "T" + "00:00:00"}`,
                endTime: `${finishDate + "T" + "24:00:00"}`,
                origin: origin,
                destination: destination,
                subType: tripType,
                note: attachedNote,
                isDaily: null,
            }


            let res = await postRequest("work_request", body, userToken)
            console.log("time off added", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
                callBack()
            } else {
                console.log("warning")
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
    }

    const selectForeignCity = async (country) => {
        let body = {
            country: country
        }
        console.log(body);
        let res = await getRequest("countries/cities", body, userToken)
        let countryCities = []
        console.log(res);
        return
        res.data.forEach(country => {
            newCountries.push({
                "label": country.name,
                "value": country.name
            })

        });
        // console.log(newCountries);
    }


    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("business_trip_request")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <CustomDropdown data={isRTL ? businessTripOptions : enBusinessTripOptions} defaultValue={"Errand"}
                    placeHolder={"type"} callBackFunction={changeTripType} style={styles.dropDown} />
                <View style={styles.inputWrapper}>
                    <CustomDropdown data={countries} defaultValue={"iran"}
                        placeHolder={t("origin")} callBackFunction={selectForeignCity} style={[styles.dropDown, { width: "49%" }]} />
                    {/* <Input placeholder={t("origin")} onChangeText={getOrigin} customStyles={{ width: "49%" }} /> */}
                    {/* <Input placeholder={t("destination")} onChangeText={getDestination} customStyles={{ width: "49%" }} /> */}
                </View>
                <Pressable style={styles.dateTrigger} onPress={() => setShowStartDatePicker(true)}>
                    <CustomText size={14} lineHeight={20} color={colors.onSurface}>
                        {startDate ? convertToJalali(startDate) : t("start_date")}
                    </CustomText>
                    <KhiyabunIcons name={"calender-outline"} size={24} />
                </Pressable>
                <Pressable style={styles.dateTrigger} onPress={() => setShowEndDatePicker(true)}>
                    <CustomText size={14} lineHeight={20} color={colors.onSurface}>
                        {finishDate ? convertToJalali(finishDate) : t("finish_date")}
                    </CustomText>
                    <KhiyabunIcons name={"calender-outline"} size={24} />
                </Pressable>
                {requestedHours && (
                    <CustomText size={12} lineHeight={16} color={colors.onSurfaceLow}
                        customStyle={{ marginBottom: 10, paddingHorizontal: 5 }}>
                        {t("total_time_requested") + " : " + requestedHours + t("hour")}
                    </CustomText>

                )}

                <Input label={t("note")} onChangeText={getAttachedNote} placeholder={t("please_explain_your_request")}
                    multiline={true}
                    linesNumber={10} customStyles={{ height: 130 }} />
            </View>
            {showStartDatePicker && (
                <PersianDatePicker
                    onDateChange={(jalaliDate) => convertFinishTimeToGregorian(jalaliDate, "start")}
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
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={40}
                    styleText={styles.cancelButtonText} onPress={onClose} />
                <Button label={t("send_for_approval")} sizeButton={"medium"} style={styles.selectButton}
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
            marginBottom: 10,
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


    });
};


export default AddBusinessTripRequestSheet;