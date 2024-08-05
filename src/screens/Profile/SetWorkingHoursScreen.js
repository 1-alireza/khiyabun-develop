import React, {useRef, useState} from "react";
import {Dimensions, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import globalStyle from "../../global-styles/GlobalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import DateTimePicker from '@react-native-community/datetimepicker';
import KhiyabunIcons from "../../components/KhiyabunIcons";


const SetWorkingHoursScreen = ({navigation}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        console.log("line 31 SetWorkingHoursScreen im here");
        showMode('time');
    };


    const inputRefs = useRef([]);

    const [saturday, setSaturday] = useState("");
    const [sunday, setSunday] = useState("");
    const [monday, setMonday] = useState("");
    const [tuesday, setTuesday] = useState("");
    const [wednesday, setWednesday] = useState("");
    const [thursday, setThursday] = useState("");
    const [friday, setFriday] = useState("");

    const onChangeSaturdayHandler = (value) => {
        setSaturday(value);
    }
    const onChangeSundayHandler = (value) => {
        setSunday(value);
    }
    const onChangeMondayHandler = (value) => {
        setMonday(value);
    }
    const onChangeTuesdayHandler = (value) => {
        setTuesday(value);
    }
    const onChangeWednesdayHandler = (value) => {
        setWednesday(value);
    }
    const onChangeThursdayHandler = (value) => {
        setThursday(value);
    }
    const onChangeFridayHandler = (value) => {
        setFriday(value);
    }

    const setProfileHandler = () => {
        let senData = true;
        if (senData) {
            navigation.navigate("SetSocialMedia")
        }
    }

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[0] = el}
                        label={t("saturday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeSaturdayHandler}
                        value={saturday}
                        rightIcon="clock-outline"
                        // onFocus={showTimepicker}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[1] = el}
                        label={t("sunday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeSundayHandler}
                        value={sunday}
                        rightIcon="clock-outline"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[2] = el}
                        label={t("monday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeMondayHandler}
                        value={monday}
                        rightIcon="clock-outline"/>
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[3] = el}
                        label={t("tuesday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeTuesdayHandler}
                        value={tuesday}
                        rightIcon="clock-outline"/>
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[4] = el}
                        label={t("wednesday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeWednesdayHandler}
                        value={wednesday}
                        rightIcon="clock-outline"/>
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[5] = el}
                        label={t("thursday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeThursdayHandler}
                        value={thursday}
                        rightIcon="clock-outline"/>
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[6] = el}
                        label={t("friday")}
                        customStyles={styles.input}
                        type="text"
                        placeholder="08:00 am - 15:00 pm"
                        onChangeText={onChangeFridayHandler}
                        value={friday}
                        rightIcon="clock-outline"/>
                </View>
                {/*<Button*/}
                {/*    sizeButton="medium"*/}
                {/*    onPress={showTimepicker}*/}
                {/*    label={<View style={{flex:1,flexDirection:"row",justifyContent:"space-between",width:"100%"}}>*/}
                {/*        <Text>8:00 am - 15:00 pm</Text>*/}
                {/*        <KhiyabunIcons name="clock-outline" size={20}/>*/}
                {/*    </View>}*/}
                {/*    styleText={{flex:1,width: "100%"}}*/}
                {/*/>*/}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </ScrollView>
            <View style={[globalStyle.container, styles.buttonWrapper]}>
                <Button
                    onPress={setProfileHandler}
                    label={t("continue")}
                    sizeButton="medium"
                    typeButton="full"
                />
            </View>
        </>
    )
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            paddingVertical: 16,
            height: Dimensions.get('window').height
        },
        textPhoneVisibility: {
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        questionVisibility: {

            fontSize: 12,
            color: colors.onSurfaceLow
        },
        wrapperEnteredInfo: {
            padding: 16
        },
        inputWrapper: {
            marginBottom: 12
        },
        input: {
            width: "100%"
        },
        buttonWrapper: {
            flex: undefined,
            justifyContent: 'flex-end',
            marginVertical: 10,
            backgroundColor: "transparent"
        }
    });
};

export default SetWorkingHoursScreen;
