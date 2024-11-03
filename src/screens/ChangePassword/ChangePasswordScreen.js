import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import Input from "../../components/Input";
import {View, StyleSheet, Text, I18nManager} from "react-native";
import React, {useRef, useState} from "react";
import CustomText from "../../components/CustomText";
import gStyles from "../../global-styles/GlobalStyles"
import KhiyabunIcons from "../../components/KhiyabunIcons";
import ChangePasswordConfirmBtn from "./ConfirmChangePassword";
import {DIGIT_REGEX, UPPERCASE_REGEX} from "../../utils/constant";
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import {useSelector} from "react-redux";

export default function ChangePasswordScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const userToken = useSelector(state => state.login.token);
    const [password, setPassword] = useState({
        entered_value: "",
        length: null,
        has_number: null,
        has_uppercase: null
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordHiddenText, setPasswordHiddenText] = useState(true);
    const [confirmPasswordHiddenText, setConfirmPasswordHiddenText] = useState(true);
    const [isCurrentPassWordHidden, setIsCurrentPassWordHidden] = useState(false)
    const [supportText, setSupportText] = useState("")
    const [currentPassWord, setCurrentPassWord] = useState("")
    const [disabled, setIsDisabled] = useState(true);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


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
        (value && password.entered_value == value)? setIsDisabled(false):setIsDisabled(true)

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




    const togglePasswordVisibility = () => setIsCurrentPassWordHidden(!isCurrentPassWordHidden)

    const getCurrentPassword = (pass) => {
        setCurrentPassWord(pass)
    }

    const changePassword = async () => {
        if (currentPassWord.length >= 6) {
            let body = {
                oldPassword: currentPassWord,
                newPassword:password.entered_value,
            }
            console.log(body)
            try {
                let res = await postRequest(`profile/reset_password`, body, userToken)
                console.log("CheckboxChange", res)
                if (res.statusCode === 200) {
                    errorHandling(res, "confirm")
                    navigation.goBack()
                } else {
                    errorHandling(res, "warning")
                }
            } catch (e) {
                errorHandling(res, "error")
            }
        } else {
            setSupportText(t("character_limit"))
        }
    }

    return (
        <>
            <View style={styles.mainView}>

                <View style={styles.currPassWrapper}>
                    <Input customStyles={styles.input}
                           type="text"
                           placeholder={t("inset_current_password")}
                           secureTextEntry={isCurrentPassWordHidden}
                           onChangeText={getCurrentPassword}
                           supportText={supportText}
                           rightIcon={isCurrentPassWordHidden ? "visibility-outline" : "visibility-off-outline"}
                           iconFunctionCallBack={togglePasswordVisibility}
                    />

                    <CustomText
                        size={14}
                        lineHeight={20}
                        color={colors.onSurfaceContainer}
                        customStyle={styles.forgetText}>
                        {t("forgot_password")}
                    </CustomText>
                </View>


                <Input customStyles={styles.input}
                       type="text"
                       rightIcon={(passwordHiddenText) ? "visibility-outline" : "visibility-off-outline"}
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
                        <Text style={[styles.errorText, {
                            color: password.length === null ? colors.onSurfaceContainer : (password.length ? colors.darkConfirm : colors.error)
                        }]}>{t("character_number")}</Text>
                    </View>
                    <View style={styles.conditionItem}>
                        <KhiyabunIcons
                            name={password.has_number === null ? "circle-outline" : (password.has_number ? "tick-circle-bold" : "close-circle-bold")}
                            size={13}
                            color={password.has_number === null ? colors.onSurfaceContainer : (password.has_number ? colors.darkConfirm : colors.error)}
                        />
                        <Text style={[styles.errorText, {
                            color: password.has_number === null ? colors.onSurfaceContainer : (password.has_number ? colors.darkConfirm : colors.error)
                        }]}>{t("use_a_number")}</Text>
                    </View>
                    <View style={styles.conditionItem}>
                        <KhiyabunIcons
                            name={password.has_uppercase === null ? "circle-outline" : (password.has_uppercase ? "tick-circle-bold" : "close-circle-bold")}
                            size={13}
                            color={password.has_uppercase === null ? colors.onSurfaceContainer : (password.has_uppercase ? colors.darkConfirm : colors.error)}
                        />
                        <Text style={[styles.errorText, {
                            color: password.has_uppercase === null ? colors.onSurfaceContainer : (password.has_uppercase ? colors.darkConfirm : colors.error)
                        }]}>{t("one_uppercase")}</Text>
                    </View>
                </View>
                <View style={styles.inputWrapper}>
                    <Input customStyles={[styles.input, {marginBottom: 0}]}
                           type="password"
                           rightIcon={confirmPasswordHiddenText ? "visibility-outline" : "visibility-off-outline"}
                           placeholder={t("confirm_password")}
                           onChangeText={onChangeConfirmPasswordHandler}
                           value={confirmPassword}
                           maxLength={15}
                           error={(confirmPassword && password.entered_value !== confirmPassword)}
                           secureTextEntry={confirmPasswordHiddenText}
                           supportText={(confirmPassword && password.entered_value !== confirmPassword) ? t("password_not_match") : ""}
                           iconFunctionCallBack={onChangeConfirmPasswordHiddenText}

                    />
                </View>
            </View>
            <ChangePasswordConfirmBtn disabled={disabled} onPress={changePassword}/>
        </>

    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 8,

        },
        currPassWrapper: {
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            marginVertical: 10,
            paddingBottom: 10
        },
        forgetText: {
            marginTop: 10
        },
        newPassWrapper: {
            marginBottom: 10,
            paddingBottom: 10
        },
        radio: {
            backgroundColor: "transparent",
        },
        phoneVisibilityText: {
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily
        },
        inputWrapper: {
            marginBottom: 15
        },
        input: {
            width: "100%",
            marginBottom: 15
        },
        verifyConditions: {
            width: "100%",
            marginBottom: 5
        },
        title: {
            ...gStyles.fontBold,
            color: colors.onSurfaceHigh,
            marginHorizontal: 0,
            fontWeight: "normal"
        },
        error: {
            color: colors.error
        },
        conditionItem: {
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingStart: 5,
            gap: 5
        },
        errorText: {
            fontFamily: (I18nManager.isRTL) ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontSize: 12
        },
    });
};