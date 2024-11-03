import React, {useRef, useState} from "react";
import {View, Text, StyleSheet, I18nManager} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import BaseLogin from "../../components/BaseLogin";
import Button from "../../components/Button";
import Input from "../../components/Input";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {DIGIT_REGEX, TOKEN_KEY, UPPERCASE_REGEX} from "../../utils/constant";
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import gStyles from "../../global-styles/GlobalStyles"
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signIn} from "../../redux/slices/loginSlice";

export const SetNewPasswordSection = ({uuid,navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [password, setPassword] = useState({
        entered_value: "",
        length: null,
        has_number: null,
        has_uppercase: null
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordHiddenText, setPasswordHiddenText] = useState(true);
    const [confirmPasswordHiddenText, setConfirmPasswordHiddenText] = useState(true);
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const dispatch = useDispatch();



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

    const correctValues = ( password.entered_value.trim().length && confirmPassword.trim().length && password.length && password.entered_value === confirmPassword);

    const onResetPasswordHandler = async () => {
        setLoading(true);
        try {
            let api = "users/reset_password",
                body = {
                    newPassword:password.entered_value,
                    verificationId: uuid
                };
            let response = await postRequest(api,body,"");
            console.log("response",response);
            if(response.statusCode === 200){
                errorHandling(response,"confirm");
                let token = response.data.token;
                await AsyncStorage.setItem(TOKEN_KEY,token);
                dispatch(signIn(token));
                navigation.navigate("Main");
                if (Platform.OS !== 'android') window.history.pushState({}, 'Main');
            }
            else {
                errorHandling(response,"error");
            }
        }
        catch (e){
            errorHandling(t("default_error"),"error");
        }
        setLoading(false);
    }


    return (
        <>
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
            <Button
                onPress={onResetPasswordHandler}
                label={t('reset_password')}
                sizeButton="medium"
                disabled={!correctValues}
                showLoading={loading}
            />
        </>
    )
}

const ResetPasswordScreen = ({route,navigation}) => {
    const {t} = useTranslation();
    const {uuid} = route.params;

    return (
        <BaseLogin
            title={t("set_new_password")}
        >
            <SetNewPasswordSection navigation={navigation} uuid={uuid}/>
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
        errorText:{
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            fontSize: 12
        },
        error:{
            color:colors.error
        }
    });
};

export default ResetPasswordScreen;
