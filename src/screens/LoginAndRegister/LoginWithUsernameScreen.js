import React, {useRef, useState} from "react";
import {I18nManager, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import BaseLogin from "../../components/BaseLogin";
import Button from "../../components/Button";
import gStyles from "../../global-styles/GlobalStyles";
import Input from "../../components/Input";
import {DIGIT_REGEX, TOKEN_KEY, UPPERCASE_REGEX} from "../../utils/constant";
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import {userLogin} from "../../redux/actions/loginAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";

export const SignInWithPhoneNumber = ({navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.textNotAccount}>{t("or")}</Text>
            <Button
                onPress={() => navigation.navigate('LoginWithMobile')}
                label={t('login_with_phone_number')}
                typeButton="full"
                sizeButton="small"
                colorButton="secondary"
                styleText={styles.loginWithMobileText}
            />
        </View>
    )
};

export const EnteredUsernameSection = ({navigation}) => {
    const dispatch = useDispatch();
    const is_loader = useSelector(state => state.login.is_loading);

    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [username, setUsername] = useState({
        entered_value: null,
        correct_value: false
    });
    const [passwordHiddenText, setPasswordHiddenText] = useState(true);
    const [password, setPassword] = useState({
        entered_value: "",
        length: null,
        has_number: null,
        has_uppercase: null
    });
    const passwordRef = useRef(null);
    const [loader, setLoader] = useState(false);

    const onChangeUsernameHandler = (value) => {
        if (value.trim().length) {
            setUsername(prevState => ({...prevState, entered_value: value, correct_value: true}));
        } else if (value.length) {
            setUsername(prevState => ({...prevState, entered_value: value, correct_value: false}));
        } else {
            setUsername(prevState => ({...prevState, entered_value: null, correct_value: false}));
        }
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

    const correctValues = (username.correct_value && password.entered_value.trim().length);
    const onSignInHandler = async () => {
        setLoader(true);
        try {
            let api = "users/login",
                body = {
                    username:username.entered_value,
                    password:password.entered_value
            };
            let data = {api, body}
            dispatch(userLogin(data)).then(action => {
                let response = action.payload;
                if(response.statusCode === 200){
                    let token = response.data.token;
                    AsyncStorage.setItem(TOKEN_KEY,token);
                    navigation.navigate("Main")
                }
                setLoader(is_loader);
            });
        }
        catch (e){
            errorHandling(t("default_error"),"error");
            setLoader(false);
        }
    }


    return (
        <>
            <Input customStyles={[styles.input, {marginBottom: 15}]}
                   type="text"
                   placeholder={t("username")}
                   onChangeText={onChangeUsernameHandler}
                   value={username.entered_value}
                   error={username.entered_value !== null && !username.entered_value.trim().length && !username.correct_value}
                   supportText={(username.entered_value !== null && !username.entered_value.trim().length && !username.correct_value) ? t("username_empty") : ""}
            />
            <Input customStyles={[styles.input,{marginBottom:10}]}
                   type="text"
                   rightIcon={(passwordHiddenText) ? "visibility-outline" : "visibility-off-outline"}
                   placeholder={t("password")}
                   onChangeText={onChangePasswordHandler}
                   value={password.entered_value}
                   maxLength={15}
                   secureTextEntry={passwordHiddenText}
                   iconFunctionCallBack={onChangePasswordHiddenText}
            />
            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start",width:"100%"}}>
                <Button
                    onPress={()=>navigation.navigate("ForgetPassword")}
                    label={t("forget_password_button")}
                    sizeButton="small"
                    width={50}
                    typeButton="full"
                    colorButton="transparent"
                    style={styles.forgetPassword}
                    styleText={styles.btnText}
                />
            </View>
            <Button
                onPress={onSignInHandler}
                label={t('sign_in')}
                sizeButton="medium"
                disabled={!correctValues}
                showLoader={loader}
            />
        </>
    )
}

const LoginWithUsernameScreen = ({navigation}) => {
    const {t} = useTranslation();

    return (
        <BaseLogin
            title={t("login_with_username")}
            bottomContent={<SignInWithPhoneNumber navigation={navigation}/>}
        >
            <EnteredUsernameSection navigation={navigation}/>
        </BaseLogin>
    )

}

const useThemedStyles = (colors) => {

    return StyleSheet.create({
        textNotAccount: {
            ...gStyles.fontMain,
            color: colors.onSurface
        },
        loginWithMobileText: {
            ...gStyles.fontBold
        },

        input: {
            width: "100%",
            marginBottom: 15
        },
        errorText: {
            fontFamily: (I18nManager.isRTL) ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontSize: 12
        },
        error: {
            color: colors.error
        },
        forgetPassword:{
            alignItems:"flex-start",
            paddingHorizontal:0,
            paddingVertical:0,
            marginBottom: 10
        },
        btnText:{
            color: colors.onSurfaceContainer
        }

    });
};
export default LoginWithUsernameScreen;
