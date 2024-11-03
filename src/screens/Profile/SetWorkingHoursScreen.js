import React, {useState} from "react";
import {Dimensions, I18nManager, Platform, ScrollView, StyleSheet, View} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";
import globalStyle from "../../global-styles/GlobalStyles";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import TimePicker from "../../components/TimePicker";
import CustomText from "../../components/CustomText";
import {updateUserProfile} from "../../redux/actions/profileAction";
import {errorHandling} from "../../utils/errorHandling";
import gStyles from "../../global-styles/GlobalStyles";
import useWebBackButtonHandler from "../../navigation/hardwareBackHandler";

export const PikerTime = (
    {
        title,
        startAction,
        endAction,
        switchFunction,
        isHoliday,
        hasErrorStart,
        hasErrorEnd
    }
) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    return (
        <>
            <View style={styles.title}>
                <CustomText>
                    {title}
                </CustomText>
                {switchFunction &&
                    <View style={styles.switchWrapper}>
                        <CustomText>
                            {t("holiday")}
                        </CustomText>
                        <ToggleSwitch
                            isOn={isHoliday}
                            onToggle={switchFunction}
                            onColor={colors.primary}
                            offColor={colors.onSurfaceLowest}
                            size="medium"
                        />

                    </View>
                    // <View style={{flexDirection:"row",gap:5,alignItems:"center",height:"100%"}}>
                    //     <CheckBox
                    //         iconRight={true}
                    //         size={20}
                    //         checked={isHoliday}
                    //         onPress={()=>switchFunction(!isHoliday)}
                    //         iconType="material-community"
                    //         checkedIcon="checkbox-marked"
                    //         uncheckedIcon="checkbox-blank-outline"
                    //         checkedColor={colors.primary}
                    //         containerStyle ={styles.checkBox}
                    //         textStyle={styles.checkBoxTitle}
                    //         title={t("holiday")}
                    //     />
                    //
                    // </View>
                }
            </View>
            <View style={[globalStyle.row, styles.row]}>
                <View style={[globalStyle.col_6, {paddingHorizontal: 2.5}]}>
                    <TimePicker
                        ref={el => {
                            return el
                        }}
                        customStyle={styles.inputWrapper}
                        placeholder={t("start_time")}
                        leftIcon="clock-outline"
                        onTimeChange={startAction}
                        onRemoveTime={startAction}
                        isDisabled={isHoliday}
                        hasError={hasErrorStart}
                        errorText={hasErrorStart}
                    />
                </View>
                <View style={[globalStyle.col_6, {paddingHorizontal: 2.5}]}>
                    <TimePicker
                        ref={el => {
                            return el
                        }}
                        customStyle={styles.inputWrapper}
                        placeholder={t("end_time")}
                        leftIcon="clock-outline"
                        onTimeChange={endAction}
                        onRemoveTime={endAction}
                        isDisabled={isHoliday}
                        hasError={hasErrorEnd}
                        errorText={hasErrorEnd}
                    />
                </View>
            </View>
        </>
    )
}

const SetWorkingHoursScreen = ({navigation}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const is_loading = useSelector(state => state.profile.loading);
    const [loading, setLoading] = useState(false);
    const [workingHours, setWorkingHours] = useState({
        Saturday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Sunday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Monday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Tuesday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Wednesday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Thursday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
        Friday: {
            startHour: "",
            endHour: "",
            isHoliday: false
        },
    });
    const [errors, setErrors] = useState({});

    const handleTimeChange = (day, field, value) => {
        setWorkingHours(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            }
        }));

        if (value) {
            let newErrors = Object.fromEntries(
                Object.entries(errors).filter(([key]) => key !== day)
            );
            setErrors(newErrors);
        }
    };

    const handleHolidayChange = (day, value) => {
        setWorkingHours(prevState => ({
            ...prevState,
            [day]: {
                startHour: "",
                endHour: "",
                isHoliday: value,
            }
        }));
        if (value) {
            let newErrors = Object.fromEntries(
                Object.entries(errors).filter(([key]) => key !== day)
            );
            setErrors(newErrors);
        }
    };
    const validateWorkingHours = () => {
        const newErrors = {};
        Object.keys(workingHours).forEach(day => {
            const {startHour, endHour, isHoliday} = workingHours[day];
            if (!isHoliday) {
                if (!startHour || !endHour || (startHour && endHour && startHour === endHour)) {
                    newErrors[day] = {};
                    if (!startHour) {
                        newErrors[day].startHour = t("error_start_time");
                    }
                    if (!endHour) {
                        newErrors[day].endHour = t("error_end_time");
                    }
                    if (startHour && endHour && startHour === endHour) {
                        newErrors[day].timeMismatch = t("error_end_mismatch");
                    }
                }
            }
        });
        return newErrors;
    };

    const setTimeWorkHandler = async () => {
        const validationErrors = validateWorkingHours();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        const data = {
            userData: {
                workingHours: workingHours
            },
            token: userToken
        };
        dispatch(updateUserProfile(data)).then(action => {
            const response = action.payload;
            console.log("response", response);
            if (response?.statusCode >= 200 || response?.statusCode < 300) {
                navigation.navigate("SetSocialMedia");
                if (Platform.OS !== 'android') window.history.pushState({}, 'SetSocialMedia');

            } else {
                errorHandling(response, "error");
            }
            setLoading(is_loading);
        });
    };

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                {Object.keys(workingHours).map(day => (
                    <PikerTime
                        key={day}
                        title={t(day.toLowerCase())}
                        startAction={(value) => handleTimeChange(day, 'startHour', value)}
                        endAction={(value) => handleTimeChange(day, 'endHour', value)}
                        switchFunction={(value) => handleHolidayChange(day, value)}
                        isHoliday={workingHours[day].isHoliday}
                        hasErrorStart={errors[day]?.startHour}
                        hasErrorEnd={errors[day]?.endHour || errors[day]?.timeMismatch}
                    />
                ))}
            </ScrollView>
            <View style={[globalStyle.container, styles.buttonWrapper]}>
                <Button onPress={setTimeWorkHandler}
                        label={t("continue")}
                        sizeButton="medium"
                        typeButton="full"
                        showLoading={loading}
                />
            </View>
        </>
    );

}
// const {t} = useTranslation();
// const styles = useThemedStyles();
// const dispatch = useDispatch();
// const userToken = useSelector(state => state.login.token);
// const is_loading = useSelector(state => state.profile.loading);
//
// const [loading, setLoading] = useState(false);
//
// const [saturdayTimes, setSaturdayTimes] = useState({
//     start_time: "",
//     end_time: "",
//     is_holiday: false,
//     start_error: false,
//     end_error: false
// })
//
// const [saturdayStart, setSaturdayStart] = useState("");
// const [saturdayStartError, setSaturdayStartError] = useState("");
// const [saturdayEnd, setSaturdayEnd] = useState("");
// const [saturdayEndError, setSaturdayEndError] = useState("");
// const [saturdayHoliday, setSaturdayHoliday] = useState(false);
//
// const [sundayStart, setSundayStart] = useState("");
// const [sundayEnd, setSundayEnd] = useState("");
// const [sundayHoliday, setSundayHoliday] = useState(false);
//
// const [mondayStart, setMondayStart] = useState("");
// const [mondayEnd, setMondayEnd] = useState("");
// const [mondayHoliday, setMondayHoliday] = useState(false);
//
// const [tuesdayStart, setTuesdayStart] = useState("");
// const [tuesdayEnd, setTuesdayEnd] = useState("");
// const [tuesdayHoliday, setTuesdayHoliday] = useState(false);
//
// const [wednesdayStart, setWednesdayStart] = useState("");
// const [wednesdayEnd, setWednesdayEnd] = useState("");
// const [wednesdayHoliday, setWednesdayHoliday] = useState(false);
//
// const [thursdayStart, setThursdayStart] = useState("");
// const [thursdayEnd, setThursdayEnd] = useState("");
// const [thursdayHoliday, setThursdayHoliday] = useState(false);
//
// const [fridayStart, setFridayStart] = useState("");
// const [fridayEnd, setFridayEnd] = useState("");
// const [fridayHoliday, setFridayHoliday] = useState(false);
//
// const setTimeWorkHandler = async () => {
//     setLoading(true);
//     let data = {
//         userData: {
//             workingHours: {
//                 Saturday: {
//                     startHour: saturdayStart,
//                     endHour: saturdayEnd,
//                     isHoliday: saturdayHoliday,
//                 },
//                 Sunday: {
//                     startHour: sundayStart,
//                     endHour: sundayEnd,
//                     isHoliday: sundayHoliday,
//                 },
//                 Monday: {
//                     startHour: mondayStart,
//                     endHour: mondayEnd,
//                     isHoliday: mondayHoliday,
//                 },
//                 Tuesday: {
//                     startHour: tuesdayStart,
//                     endHour: tuesdayEnd,
//                     isHoliday: tuesdayHoliday,
//                 },
//                 Wednesday: {
//                     startHour: wednesdayStart,
//                     endHour: wednesdayEnd,
//                     isHoliday: wednesdayHoliday,
//                 },
//                 Thursday: {
//                     startHour: thursdayStart,
//                     endHour: thursdayEnd,
//                     isHoliday: thursdayHoliday,
//                 },
//                 Friday: {
//                     startHour: fridayStart,
//                     endHour: fridayEnd,
//                     isHoliday: fridayHoliday,
//                 }
//             }
//         },
//         token: userToken
//     };
//     dispatch(updateUserProfile(data)).then(action => {
//         console.log("is_loading", is_loading)
//         let response = action.payload;
//         if (response?.statusCode === 200) {
//  navigation.navigate("SetSocialMedia");
//                 if (Platform.OS !== 'android') window.history.pushState({}, 'SetSocialMedia');
//         } else {
//             errorHandling(response, "error");
//         }
//         setLoading(is_loading);
//     });
// }
//
// return (
//     <>
//         <ScrollView style={[globalStyle.container, styles.container]}>
//             <PikerTime
//                 title={t("saturday")}
//                 startAction={setSaturdayStart}
//                 endAction={setSaturdayEnd}
//                 switchFunction={setSaturdayHoliday}
//                 isHoliday={saturdayHoliday}
//                 hasErrorStart={true}
//                 hasErrorEnd={true}
//             />
//             <PikerTime
//                 title={t("sunday")}
//                 startAction={setSundayStart}
//                 endAction={setSundayEnd}
//                 switchFunction={setSundayHoliday}
//                 isHoliday={sundayHoliday}
//             />
//             <PikerTime
//                 title={t("monday")}
//                 startAction={setMondayStart}
//                 endAction={setMondayEnd}
//                 switchFunction={setMondayHoliday}
//                 isHoliday={mondayHoliday}
//             />
//             <PikerTime
//                 title={t("tuesday")}
//                 startAction={setTuesdayStart}
//                 endAction={setTuesdayEnd}
//                 switchFunction={setTuesdayHoliday}
//                 isHoliday={tuesdayHoliday}
//             />
//             <PikerTime
//                 title={t("wednesday")}
//                 startAction={setWednesdayStart}
//                 endAction={setWednesdayEnd}
//                 switchFunction={setWednesdayHoliday}
//                 isHoliday={wednesdayHoliday}
//             />
//             <PikerTime
//                 title={t("thursday")}
//                 startAction={setThursdayStart}
//                 endAction={setThursdayEnd}
//                 switchFunction={setThursdayHoliday}
//                 isHoliday={thursdayHoliday}
//             />
//             <PikerTime
//                 title={t("friday")}
//                 startAction={setFridayStart}
//                 endAction={setFridayEnd}
//                 switchFunction={setFridayHoliday}
//                 isHoliday={fridayHoliday}
//             />
//
//         </ScrollView>
//         <View style={[globalStyle.container, styles.buttonWrapper]}>
//             <Button
//                 onPress={setTimeWorkHandler}
//                 label={t("continue")}
//                 sizeButton="medium"
//                 typeButton="full"
//                 showLoading={loading}
//             />
//         </View>
//     </>
// )


const useThemedStyles = () => {
    const isRTL = I18nManager.isRTL;
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            paddingVertical: 16,
            height: Dimensions.get('window').height
        },
        row: {
            flexDirection: isRTL ? "row-reverse" : "row",
        },
        inputWrapper: {
            // marginBottom: 12,
        },
        buttonWrapper: {
            flex: undefined,
            marginVertical: 10,
            backgroundColor: "transparent",
            height: 45
        },
        title: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
            marginBottom: 4,
            marginTop: 5
        },
        switchWrapper: {
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
            gap: 5,
        },
        checkBox: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            alignItems: "center"
        },
        checkBoxTitle: {
            ...gStyles.fontBold,
            color: colors.onSurfaceLow,
            marginHorizontal: 0,
            fontWeight: "normal"
        }
    });
};

export default SetWorkingHoursScreen;

