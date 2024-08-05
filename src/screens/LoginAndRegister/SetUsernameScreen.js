import React, {useRef, useState} from "react";
import {View, Text, StyleSheet, I18nManager} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import BaseLogin from "../../components/BaseLogin";
import Button from "../../components/Button";
import Input from "../../components/Input";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {DIGIT_REGEX, UPPERCASE_REGEX} from "../../utils/constant";
import {CheckBox} from "@rneui/themed";
import i18n from "i18next";
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import gStyles from "../../global-styles/GlobalStyles"

export const SetUsernameSection = ({uuid,navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [username, setUsername] = useState({
        entered_value: null,
        correct_value: false
    });
    const [password, setPassword] = useState({
        entered_value: "",
        length: null,
        has_number: null,
        has_uppercase: null
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [readRules, setReadRules] = useState(true);
    const [passwordHiddenText, setPasswordHiddenText] = useState(true);
    const [confirmPasswordHiddenText, setConfirmPasswordHiddenText] = useState(true);
    const [loader, setLoader] = useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const toggleCheckbox = () => setReadRules(!readRules);

    const onChangeUsernameHandler = (value) => {
        if(value.trim().length){
            setUsername(prevState => ({...prevState, entered_value: value, correct_value: true}));
        }
        else if(value.length){
            setUsername(prevState => ({...prevState, entered_value: value, correct_value: false}));
        }
        else {
            setUsername(prevState => ({...prevState, entered_value: null, correct_value: false}));
        }
    }

    const onChangePasswordHandler = (value) => {
        setPassword(prevState => ({...prevState, entered_value: value}));
        let length = null;
        let has_number = null;
        let has_uppercase = null;

        if (!value.length) {
            length = has_number = has_uppercase = null;
        } else {
            length = value.length >= 6;
            has_number = DIGIT_REGEX.test(value);
            has_uppercase = UPPERCASE_REGEX.test(value);
        }

        setPassword({
            entered_value: value,
            length,
            has_number,
            has_uppercase
        });
    }

    const onChangeConfirmPasswordHandler = (value) => {
        setConfirmPassword(value);
    }

    const onChangePasswordHiddenText = () => {
        setPasswordHiddenText(!passwordHiddenText);
        if (passwordRef.current) {
            passwordRef.current.setNativeProps({
                secureTextEntry: passwordHiddenText,
                rightIcon: passwordHiddenText ? "visibility-outline" : "visibility-off-outline"
            });
        }
    }
    const onChangeConfirmPasswordHiddenText = () => {
        setConfirmPasswordHiddenText(!confirmPasswordHiddenText);
        if (confirmPasswordRef.current) {
            confirmPasswordRef.current.setNativeProps({
                secureTextEntry: confirmPasswordHiddenText,
                rightIcon: confirmPasswordHiddenText ? "visibility-outline" : "visibility-off-outline"
            });
        }
    }

    const correctValues = (username.correct_value && password.entered_value.trim().length && confirmPassword.trim().length && password.length && password.entered_value === confirmPassword && readRules);

    const onSignupHandler = async () => {
        setLoader(true);
        try {
            let api = "users",
                body = {
                    username:username.entered_value,
                    password:password.entered_value,
                    verificationId: uuid
            };
            let response = await postRequest(api,body,false);
            console.log(response);
            if(response.statusCode === 201){
                errorHandling(response,"confirm");

                // navigation.navigate('SetProfile', {
                //     is_edit: false
                // })
            }
            else {
                let type = "error",
                    text = response;
                if(response.statusCode === 406){
                    type = "warning";
                }
                else if(response.statusCode === 404){
                    type = "warning";
                    text = t("user_exist");
                    navigation.navigate('LoginWithUsername')
                }
                errorHandling(text,type);
            }
        }
        catch (e){
            errorHandling(t("default_error"),"error");
        }
        setLoader(false);
    }


    return (
        <>
            <View style={styles.inputWrapper}>
                <Input customStyles={[styles.input,{marginBottom: 0}]}
                       type="text"
                       placeholder={t("username")}
                       onChangeText={onChangeUsernameHandler}
                       value={username.entered_value}
                       error={username.entered_value !== null && !username.entered_value.trim().length && !username.correct_value}
                       supportText={(username.entered_value !== null && !username.entered_value.trim().length && !username.correct_value)?t("username_empty"):""}
                />
            </View>
            <Input customStyles={styles.input}
                   type="text"
                   rightIcon={(passwordHiddenText)?"visibility-outline":"visibility-off-outline"}
                   placeholder={t("password")}
                   onChangeText={onChangePasswordHandler}
                   value={password.entered_value}
                   maxLength={15}
                   secureTextEntry={passwordHiddenText}
                   iconFunctionCallBack={onChangePasswordHiddenText}
            />
            <View style={styles.verifyConditions}>
                <View style={styles.conditionItem}>
                    <KhiyabunIcons
                        name={password.length === null ? "circle-outline" : (password.length ? "tick-circle-bold" : "close-circle-bold")}
                        size={13}
                        color={password.length === null ? colors.onSurfaceContainer : (password.length ? colors.darkConfirm : colors.error)}
                    />
                    <Text style={[styles.errorText,{
                        color: password.length === null ? colors.onSurfaceContainer : (password.length ? colors.darkConfirm : colors.error)
                    }]}>{t("character_number")}</Text>
                </View>
                <View style={styles.conditionItem}>
                    <KhiyabunIcons
                        name={password.has_number === null ? "circle-outline" : (password.has_number ? "tick-circle-bold" : "close-circle-bold")}
                        size={13}
                        color={password.has_number === null ? colors.onSurfaceContainer : (password.has_number ? colors.darkConfirm : colors.error)}
                    />
                    <Text style={[styles.errorText,{
                        color: password.has_number === null ? colors.onSurfaceContainer : (password.has_number ? colors.darkConfirm : colors.error)
                    }]}>{t("use_a_number")}</Text>
                </View>
                <View style={styles.conditionItem}>
                    <KhiyabunIcons
                        name={password.has_uppercase === null ? "circle-outline" : (password.has_uppercase ? "tick-circle-bold" : "close-circle-bold")}
                        size={13}
                        color={password.has_uppercase === null ? colors.onSurfaceContainer : (password.has_uppercase ? colors.darkConfirm : colors.error)}
                    />
                    <Text style={[styles.errorText,{
                        color: password.has_uppercase === null ? colors.onSurfaceContainer : (password.has_uppercase ? colors.darkConfirm : colors.error)
                    }]}>{t("one_uppercase")}</Text>
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Input customStyles={[styles.input,{marginBottom: 0}]}
                       type="password"
                       rightIcon={confirmPasswordHiddenText ? "visibility-outline" : "visibility-off-outline"}
                       placeholder={t("confirm_password")}
                       onChangeText={onChangeConfirmPasswordHandler}
                       value={confirmPassword}
                       maxLength={15}
                       error={(confirmPassword && password.entered_value !== confirmPassword)}
                       secureTextEntry={confirmPasswordHiddenText}
                       supportText={(confirmPassword && password.entered_value !== confirmPassword)?t("password_not_match"):""}
                       iconFunctionCallBack={onChangeConfirmPasswordHiddenText}

                />
            </View>
            <View style={styles.acceptRules}>
                <CheckBox
                    iconRight={false}
                    size={20}
                    checked={readRules}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={colors.primary}
                    containerStyle ={styles.checkBox}
                    textStyle={[styles.title,(!readRules)?styles.error:""]}
                    title={t("rule_conditions")}
                />
            </View>
            <Button
                onPress={onSignupHandler}
                label={t('sign_up')}
                sizeButton="medium"
                disabled={!correctValues}
                showLoader={loader}
            />
        </>
    )
}

const SetUsernameScreen = ({route,navigation}) => {
    const {t} = useTranslation();
    const {uuid} = route.params;

    return (
        <BaseLogin
            title={t("set_username_title")}
        >
            <SetUsernameSection navigation={navigation} uuid={uuid}/>
        </BaseLogin>
    );
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        inputWrapper:{
            marginBottom:15
        },
        input: {
            width: "100%",
            marginBottom: 15
        },
        verifyConditions: {
            width: "100%",
            marginBottom: 5
        },
        conditionItem: {
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingStart: 5,
            gap: 5
        },
        acceptRules:{
            width: "100%",
            flexDirection:"row",
            marginTop: 5,
            marginBottom:5
        },
        errorText:{
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            fontSize: 12
        },
        checkBox:{
            flex: 1,
            // alignItems:"flex-end",
            backgroundColor: "transparent",
            borderWidth:0,
            padding: 0,
            margin: 0,
            marginRight:0,
            marginLeft:0,
            marginBottom: 15
        },
        title:{
            ...gStyles.fontBold,
            color:colors.onSurfaceHigh,
            marginHorizontal: 0,
            fontWeight:"normal"
        },
        error:{
            color:colors.error
        }
    });
};

export default SetUsernameScreen;
