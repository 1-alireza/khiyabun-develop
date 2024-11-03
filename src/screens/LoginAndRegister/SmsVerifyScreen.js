import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Platform} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import BaseLogin from "../../components/BaseLogin";
import Input from "../../components/Input";
import ReSendSmsTimer from "./ReSendSmsTimer";
import i18n from "i18next";

import gStyles from "../../global-styles/GlobalStyles";
import {postRequest} from "../../utils/sendRequest";
import CustomToast from "../../components/CustomToast";
import {errorHandling} from "../../utils/errorHandling";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../redux/actions/loginAction";
import {TOKEN_KEY} from "../../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useWebBackButtonHandler from "../../navigation/hardwareBackHandler";

export const GoToEnterMobile = ({navigation}) => {

    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Button
                onPress={() => navigation.goBack()}
                label={t('edit_phone')}
                typeButton="full"
                sizeButton="small"
                colorButton="secondary"
                styleText={styles.editPhoneText}
            />
        </View>
    )
};
const SmsVerifyScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const is_loading = useSelector(state => state.login.is_loading);


    const {t} = useTranslation();
    const inputRefs = useRef([]);
    const [num1, setNum1] = useState({entered_val: "", is_validate: true});
    const [num2, setNum2] = useState({entered_val: "", is_validate: true});
    const [num3, setNum3] = useState({entered_val: "", is_validate: true});
    const [num4, setNum4] = useState({entered_val: "", is_validate: true});
    const [smsIsValid, setSmsIsValid] = useState(true);
    const styles = useThemedStyles(!smsIsValid);
    const [loading, setLoading] = useState(false);
    const {phone_number, type_send, country_code} = route.params;
    const title = t("sms_description") + "+" + country_code + " - " + phone_number;
    useEffect(function () {
        inputRefs.current[0].focus();
    }, [])


    const onChangeNumberHandler = (setNum, value, index) => {
        if (!smsIsValid) {
            setSmsIsValid(true);
        }
        if (value.trim().length) {
            setNum({
                entered_val: value,
                is_validate: true
            });
            if (index < 3) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            setNum({
                entered_val: "",
                is_validate: false
            });
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    }
    const isButtonDisabled = !(num1.entered_val && num2.entered_val && num3.entered_val && num4.entered_val);


    const verifySms = async () => {
        let smsCode = num1.entered_val + num2.entered_val + num3.entered_val + num4.entered_val;
        setLoading(true);
        try {
            let api,
                body = {
                    "code": smsCode
                };
            switch (type_send) {
                case "login":
                    api = "users/login_with_code";
                    let data = {api, body}
                    dispatch(userLogin(data)).then(action => {
                        let response = action.payload;
                        if (response.statusCode === 200) {
                            let token = response.data.token;
                            AsyncStorage.setItem(TOKEN_KEY, token);
                            navigation.navigate("Main");
                            if (Platform.OS !== 'android') window.history.pushState({}, 'Main');
                        } else {
                            errorHandling(response, "error");
                            setSmsIsValid(false);
                        }
                        setLoading(is_loading);
                    });
                    break;
                default:
                    api = 'users/verify_code';
                    const response = await postRequest(api, body, "");
                    if (response.statusCode === 200) {
                        if (type_send === "register") {
                            navigation.navigate("SetUsername", {
                                uuid: response.data.id
                            });
                            if (Platform.OS !== 'android') window.history.pushState({}, 'SetUsername');
                        } else {
                            //reset password page
                            navigation.navigate("ResetPassword", {
                                uuid: response.data.id
                            });
                            if (Platform.OS !== 'android') window.history.pushState({}, 'ResetPassword');

                        }
                    } else {
                        errorHandling(response, "error");
                        setSmsIsValid(false);

                    }
                    setLoading(false);
            }

        } catch (e) {
            console.log(e);
            errorHandling(t("default_error"), "error");
            setLoading(false);
        }
    }
    return (
        <BaseLogin
            title={t("sms_title")}
            description={title}
            bottomContent={<GoToEnterMobile navigation={navigation}/>}
        >
            <View style={styles.smsWrapper}>
                <Input
                    ref={el => inputRefs.current[0] = el}
                    customStyles={styles.smsNumber}
                    inputCustomStyle={styles.input}
                    type="number"
                    placeholder="-"
                    maxLength={1}
                    value={num1.entered_val}
                    error={!num1.is_validate || !smsIsValid}
                    onChangeText={(value) => onChangeNumberHandler(setNum1, value, 0)}
                />
                <Input
                    ref={el => inputRefs.current[1] = el}
                    customStyles={styles.smsNumber}
                    inputCustomStyle={styles.input}
                    type="number"
                    leftIcon="add-outline"
                    placeholder="-"
                    maxLength={1}
                    value={num2.entered_val}
                    error={!num2.is_validate || !smsIsValid}
                    onChangeText={(value) => onChangeNumberHandler(setNum2, value, 1)}
                />
                <Input
                    ref={el => inputRefs.current[2] = el}
                    customStyles={styles.smsNumber}
                    inputCustomStyle={styles.input}
                    type="number"
                    placeholder="-"
                    maxLength={1}
                    value={num3.entered_val}
                    error={!num3.is_validate || !smsIsValid}
                    onChangeText={(value) => onChangeNumberHandler(setNum3, value, 2)}
                />
                <Input
                    ref={el => inputRefs.current[3] = el}
                    customStyles={styles.smsNumber}
                    inputCustomStyle={styles.input}
                    type="number"
                    placeholder="-"
                    maxLength={1}
                    value={num4.entered_val}
                    error={!num4.is_validate || !smsIsValid}
                    onChangeText={(value) => onChangeNumberHandler(setNum4, value, 3)}
                />
            </View>
            <ReSendSmsTimer initialTime="02:00" phoneNumber={phone_number} typeSend={type_send}/>
            <Button
                onPress={verifySms}
                sizeButton="medium"
                label={t('continue')}
                disabled={isButtonDisabled}
                showLoading={loading}
            />
        </BaseLogin>
    );
}

const useThemedStyles = (has_error) => {
    const {colors} = useTheme();
    const dir = i18n.dir();
    return StyleSheet.create({
        smsWrapper: {
            flexDirection: (dir === "rtl") ? "row-reverse" : "row",
            justifyContent: "space-between",
            width: "100%",
            // direction:"ltr"
        },
        smsNumber: {

            width: 62,
            height: 72,
            marginBottom: 15,
            padding: 0,
            direction: "ltr",
            textAlign: "center"

        },
        input: {
            width: "100%", //added for pwa UI problem
            fontSize: 24,
            textAlign: "center",
            color: (has_error) ? colors.error : colors.primary,
            height: "100%"
        },
        editPhoneText: {
            ...gStyles.fontBold,
            fontSize: 13
        }
    });
};

export default SmsVerifyScreen;
